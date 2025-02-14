
import makeWASocket, {
    WASocket,
    Browsers,
    DisconnectReason,
    isJidBroadcast,
    makeCacheableSignalKeyStore,
    makeInMemoryStore
} from "@whiskeysockets/baileys";

import NodeCache from 'node-cache';


import authState from './../helpers/authStates'
import { Store } from "./../libs/store";
import qrcode from 'qrcode-terminal';
import MAIN_LOGGER from "@whiskeysockets/baileys/lib/Utils/logger";
import { Boom } from "@hapi/boom";

import WhatsappSession, { IWhatsappSession } from "../models/WhatsappSession";
import { logger } from "../utils/logger";
import StartWhatsappSession from "../services/BotServices/StartWhatsappSession";


const loggerBaileys = MAIN_LOGGER.child({});
loggerBaileys.level = "error";

const retriesQrCodeMap = new Map<string, number>();

type Session = WASocket & {
    id?: string;
    store?: Store;
};

const sessions: Session[] = [];

export const getWbot = (whatsappSessionId: string): Session => {
    const sessionIndex = sessions.findIndex((s: any) => s.id === whatsappSessionId);

    if (sessionIndex === -1) {
        throw new Error("ERR_WAPP_NOT_INITIALIZED");
    }
    return sessions[sessionIndex];
};


export const removeWbot = async (
    whatsappSessionId: string,
    isLogout = true
): Promise<void> => {
    try {
        const sessionIndex = sessions.findIndex((s: any) => s.id === whatsappSessionId);
        if (sessionIndex !== -1) {
            if (isLogout) {
                sessions[sessionIndex].logout();
                sessions[sessionIndex].ws.close();
            }

            sessions.splice(sessionIndex, 1);
        }
    } catch (err) {
        logger.error(err);
    }
};


export const initWASocket = async (whatsappSessionId: string): Promise<Session> => {
    return new Promise(async (resolve, reject) => {
        try {

            const sessionWhatsapp = await WhatsappSession.findOne({ _id: whatsappSessionId });
            if (!sessionWhatsapp) return reject('Session not found');
            let retriesQrCode = 0;

            const { state, saveState } = await authState(sessionWhatsapp)

            const msgRetryCounterCache = new NodeCache();

            const store = makeInMemoryStore({
                logger: loggerBaileys
            });

            let sock: Session | null;
            sock = makeWASocket({
                logger: loggerBaileys,
                // printQRInTerminal: false,
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, logger as any),
                },
                browser: Browsers.appropriate("Desktop"),
                msgRetryCounterCache,
                shouldIgnoreJid: jid => isJidBroadcast(jid),
            })

            sock.ev.on('creds.update', saveState);

            sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {

                if (connection === 'close') {

                    if ((lastDisconnect?.error as Boom)?.output?.statusCode === 403) {
                        await WhatsappSession.updateOne({ _id: whatsappSessionId }, {
                            $set: {
                                qrcode: '',
                                // credentials: null,
                                status: 'PENDING',
                                retries: 0
                            }
                        })
                        removeWbot(whatsappSessionId, false);
                    }

                    if ((lastDisconnect?.error as Boom)?.output?.statusCode === 401) {
                        await WhatsappSession.updateOne({ _id: whatsappSessionId }, {
                            $set: {
                                qrcode: null,
                                credentials: null,
                                status: 'DISCONNECT',
                                retries: 0,
                            }
                        })
                        removeWbot(whatsappSessionId, false);
                        setTimeout(() => {
                            const startWhatsappSession = new StartWhatsappSession();
                            startWhatsappSession.execute(whatsappSessionId);
                        }, 2000)
                    } else if (
                        (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
                    ) {
                        removeWbot(whatsappSessionId, false);
                        setTimeout(() => {
                            const startWhatsappSession = new StartWhatsappSession();
                            startWhatsappSession.execute(whatsappSessionId);
                        }, 2000)
                    } else {
                        await WhatsappSession.updateOne({ _id: whatsappSessionId }, {
                            $set: {
                                qrcode: '',
                                // credentials: null,
                                status: 'PENDING',
                                retries: 0
                            }
                        })
                        removeWbot(whatsappSessionId, false);
                        setTimeout(() => {
                            const startWhatsappSession = new StartWhatsappSession();
                            startWhatsappSession.execute(whatsappSessionId);
                        }, 2000)
                    }
                }

                if (connection === 'open') {
                    logger.info('Connected to WA');

                    const sessionIndex = sessions.findIndex((s: any) => s.id === whatsappSessionId);

                    if (sessionIndex === -1) {
                        sock.id = whatsappSessionId.toString();
                        sessions.push(sock);
                    }

                    await WhatsappSession.updateOne({ _id: whatsappSessionId }, {
                        $set: {
                            qrcode: '',
                            status: 'CONNECT',
                            retries: 0
                        }
                    })

                    resolve(sock);
                }

                if (qr !== undefined) {
                    const retries = retriesQrCodeMap.get(whatsappSessionId) || 0;
                    if (retries >= 3) {
                        await WhatsappSession.updateOne({ whatsappSessionId }, {
                            $set: {
                                qrcode: '',
                                status: 'DISCONNECT',
                                retries: 0
                            }
                        })
                        sock.ev.removeAllListeners('connection.update');
                        sock.ws.close();
                        retriesQrCodeMap.delete(whatsappSessionId);
                        reject('Max retries reached');
                    } else {
                        retriesQrCodeMap.set(whatsappSessionId, retriesQrCode += 1);
                        const result = await WhatsappSession.updateOne({ whatsappSessionId }, {
                            $set: {
                                qrcode: qr,
                                status: 'qrcode',
                                retries: 0
                            }
                        })
                        qrcode.generate(qr, { small: true });
                    }
                }
            });

            store.bind(sock.ev)

        } catch (error) {
            logger.error(error);
            reject(error)
        }
    })




    // sock.ev.on('connection.update', async (update) => {
    //     const { connection, lastDisconnect, qr } = update;

    //     if (connection === 'close') {
    //         const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

    //         if (shouldReconnect) {
    //             initWASocket(sessionId)
    //         }
    //     } else if (connection === 'open') {
    //         console.log('Connected to WA');
    //     }

    //     if (qr) {
    //         const result = await WhatsappSession.updateOne({ sessionId }, {
    //             $set: {
    //                 qrcode: qr,
    //                 status: 'qrcode',
    //                 retries: 0
    //             }
    //         })

    //         console.log(result);

    //         qrcode.generate(qr, { small: true });
    //     }
    // });

    // sock.ev.on('messages.upsert', async m => {
    //     console.log(JSON.stringify(m, undefined, 2))

    //     console.log('replying to', m.messages[0].key.remoteJid)
    //     // await sock.sendMessage(m.messages[0].key.remoteJid!, { text: 'Hello there!' })
    // })


};


