import { Contact, getContentType, jidNormalizedUser, MessageUpsertType, proto, WAMessage, WAMessageStubType, WAMessageUpdate, WASocket } from "@whiskeysockets/baileys";
import { Store } from "../../libs/store";
import { log } from "console";

import axios from "axios";
import Message, { IMessage } from './../../models/Message'
import { logger } from "../../utils/logger";
import ContactModel, { IContact } from "../../models/Contact";
import UpdateOrSaveContactWhatsapp from "./UpdateOrSaveContactWhatsapp";

type Session = WASocket & {
    id?: string;
    store?: Store;
};

interface ImessageUpsert {
    messages: proto.IWebMessageInfo[];
    type: MessageUpsertType;
}

interface IMe {
    name: string;
    id: string;
}

export default class WhatsappListener {

    public async listen(wbot: Session, subscribeId: string): Promise<void> {
        //TODO
        try {
            wbot.ev.on('messages.upsert', async (messageUpsert: ImessageUpsert) => {
                console.log('messages.upsert', messageUpsert);
                const messages = messageUpsert.messages
                    .filter(this.filterMessages)
                    .map(msg => msg);

                if (!messages) return;

                messages.forEach(async (msg: WAMessage) => {
                    const messageExists = await Message.findOne({ remoteJid: msg.key.id });

                    if (!messageExists) {
                        await this.handlerMessage(msg, wbot, subscribeId);
                    }
                })

                log('Listening to messages', messages);

            })

            wbot.ev.on("messages.update", (messageUpdate: WAMessageUpdate[]) => {
                if (messageUpdate.length === 0) return;
                messageUpdate.forEach(async (message: WAMessageUpdate) => {
                    (wbot as WASocket)!.readMessages([message.key])
                    console.log('messages.update', message);

                    // handleMsgAck(message, message.update.status);
                });
            });


        } catch (error) {

        }
    }

    private filterMessages(msg: WAMessage): boolean {
        if (msg.message?.protocolMessage) return false;

        if (
            [
                WAMessageStubType.REVOKE,
                WAMessageStubType.E2E_DEVICE_CHANGED,
                WAMessageStubType.E2E_IDENTITY_CHANGED,
                WAMessageStubType.CIPHERTEXT
            ].includes(msg.messageStubType as WAMessageStubType)
        )
            return false;

        return true;
    }

    private async handlerMessageIntegration(msg: WAMessage): Promise<void> {
        try {
            const x = await axios.post('http://192.168.0.3:5678/webhook-test/82ffcf99-9295-4bc7-9d10-25d7142a402c',
                { ...msg },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            console.log('handlerMessageIntegration', x);

        } catch (error) {
            // console.log('Error on handlerMessageIntegration', error);

        }

    }

    private async handlerMessage(msg: proto.IWebMessageInfo, wbot: Session, subscribeId: string): Promise<void> {

        let mediaSent: IMessage | undefined;

        if (!this.isValidMsg(msg)) return;

        try {
            let msgContact: IMe;
            let groupContact: Contact | undefined;

            const isGroup = msg.key.remoteJid?.endsWith("@g.us");

            const bodyMessage = this.getBodyMessage(msg);
            const msgType = this.getTypeMessage(msg);

            const hasMedia =
                msg.message?.audioMessage ||
                msg.message?.imageMessage ||
                msg.message?.videoMessage ||
                msg.message?.documentMessage ||
                msg.message?.documentWithCaptionMessage ||
                msg.message?.stickerMessage;

            if (msg.key.fromMe) {
                if (/\u200e/.test(bodyMessage)) return;

                if (
                    !hasMedia &&
                    msgType !== "conversation" &&
                    msgType !== "extendedTextMessage" &&
                    msgType !== "vcard"
                ) return;

                msgContact = await this.getContactMessage(msg, wbot);
                console.log('msgContact', msgContact);
            } else {
                msgContact = await this.getContactMessage(msg, wbot);

                console.log('msgContact', msgContact);

            }

            if (isGroup && msg.key.remoteJid) {
                const grupoMeta = await wbot.groupMetadata(msg.key.remoteJid);
                const msgGroupContact = {
                    id: grupoMeta.id,
                    name: grupoMeta.subject
                };

                console.log('msgGroupContact', msgGroupContact);

                this.verifyContact(msgGroupContact, wbot, subscribeId);

                groupContact = msgGroupContact;

            }

            const contact = await this.verifyContact(msgContact, wbot, subscribeId);


            if (!msg.key.fromMe && !isGroup) {
                await this.handlerMessageIntegration(msg)
                return
            }


        } catch (error) {

        }

    }

    private getTypeMessage(msg: proto.IWebMessageInfo): string {
        return getContentType(msg.message!) || '';
    };

    private isValidMsg(msg: proto.IWebMessageInfo): boolean {
        if (msg.key.remoteJid === "status@broadcast") return false;
        try {
            const msgType = this.getTypeMessage(msg);
            if (!msgType) {
                return false;
            }

            const ifType =
                msgType === "conversation" ||
                msgType === "extendedTextMessage" ||
                msgType === "editedMessage" ||
                msgType === "audioMessage" ||
                msgType === "videoMessage" ||
                msgType === "imageMessage" ||
                msgType === "documentMessage" ||
                msgType === "documentWithCaptionMessage" ||
                msgType === "stickerMessage" ||
                msgType === "buttonsResponseMessage" ||
                msgType === "buttonsMessage" ||
                msgType === "messageContextInfo" ||
                msgType === "locationMessage" ||
                msgType === "liveLocationMessage" ||
                msgType === "contactMessage" ||
                msgType === "voiceMessage" ||
                msgType === "mediaMessage" ||
                msgType === "contactsArrayMessage" ||
                msgType === "reactionMessage" ||
                msgType === "ephemeralMessage" ||
                msgType === "protocolMessage" ||
                msgType === "listResponseMessage" ||
                msgType === "listMessage" ||
                msgType === "viewOnceMessage";

            if (!ifType) {
                logger.warn(`#### Nao achou o type em isValidMsg: ${msgType} ${JSON.stringify(msg?.message)}`);
            }

            return !!ifType;
        } catch (error) {
            logger.error(`#### Erro em isValidMsg: ${error}`);
            return false;
        }
    };


    private getBodyMessage(msg: proto.IWebMessageInfo): any {

        try {
            let type = this.getTypeMessage(msg);

            const types: any = {
                conversation: msg?.message?.conversation,
                editedMessage: msg?.message?.editedMessage?.message?.protocolMessage?.editedMessage?.conversation,
                imageMessage: msg.message?.imageMessage?.caption,
                videoMessage: msg.message?.videoMessage?.caption,
                extendedTextMessage: msg.message?.extendedTextMessage?.text,
                buttonsResponseMessage: msg.message?.buttonsResponseMessage?.selectedButtonId,
                templateButtonReplyMessage: msg.message?.templateButtonReplyMessage?.selectedId,
                messageContextInfo: msg.message?.buttonsResponseMessage?.selectedButtonId || msg.message?.listResponseMessage?.title,
                buttonsMessage: this.getBodyButton(msg) || msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId,
                viewOnceMessage: this.getBodyButton(msg) || msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId,
                stickerMessage: "sticker",
                contactMessage: msg.message?.contactMessage?.vcard,
                contactsArrayMessage: "varios contatos",
                //locationMessage: `Latitude: ${msg.message.locationMessage?.degreesLatitude} - Longitude: ${msg.message.locationMessage?.degreesLongitude}`,
                locationMessage: this.msgLocation(
                    msg.message?.locationMessage?.jpegThumbnail,
                    msg.message?.locationMessage?.degreesLatitude,
                    msg.message?.locationMessage?.degreesLongitude
                ),
                liveLocationMessage: `Latitude: ${msg.message?.liveLocationMessage?.degreesLatitude} - Longitude: ${msg.message?.liveLocationMessage?.degreesLongitude}`,
                documentMessage: msg.message?.documentMessage?.title,
                documentWithCaptionMessage: msg.message?.documentWithCaptionMessage?.message?.documentMessage?.caption,
                audioMessage: "Áudio",
                listMessage: this.getBodyButton(msg) || msg.message?.listResponseMessage?.title,
                listResponseMessage: msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId,
                reactionMessage: msg.message?.reactionMessage?.text || "reaction",
            };

            const objKey = Object.keys(types).find(key => key === type);

            if (!objKey) {
                logger.warn(`#### Nao achou o type 152: ${type} ${JSON.stringify(msg)}`);
            }

            return types[type];

        } catch (error) {
            console.log(error);
        }
    };

    private getBodyButton(msg: proto.IWebMessageInfo): string | null {
        if (msg.key.fromMe && msg?.message?.viewOnceMessage?.message?.buttonsMessage?.contentText) {
            let bodyMessage = `*${msg?.message?.viewOnceMessage?.message?.buttonsMessage?.contentText}*`;

            for (const buton of msg.message?.viewOnceMessage?.message?.buttonsMessage?.buttons!) {
                bodyMessage += `\n\n${buton.buttonText?.displayText}`;
            }
            return bodyMessage;
        } else if (msg.key.fromMe && msg?.message?.viewOnceMessage?.message?.listMessage) {
            let bodyMessage = `*${msg?.message?.viewOnceMessage?.message?.listMessage?.description}*`;
            for (const buton of msg.message?.viewOnceMessage?.message?.listMessage?.sections!) {
                for (const rows of buton.rows!) {
                    bodyMessage += `\n\n${rows.title}`;
                }
            }

            return bodyMessage;
        } else {
            return null;
        }
    };

    // private msgLocation(image: Uint8Array<ArrayBufferLike> | null | undefined, latitude: number | null | undefined, longitude: number | null | undefined) {
    private msgLocation(image: any | null | undefined, latitude: number | null | undefined, longitude: number | null | undefined) {
        if (image) {
            var b64 = Buffer.from(image).toString("base64");

            let data = `data:image/png;base64, ${b64} | https://maps.google.com/maps?q=${latitude}%2C${longitude}&z=17&hl=pt-BR|${latitude}, ${longitude} `;
            return data;
        }
    };

    private async getContactMessage(msg: proto.IWebMessageInfo, wbot: Session) {
        const isGroup = msg.key.remoteJid?.includes("g.us");
        const rawNumber = msg.key.remoteJid?.replace(/\D/g, "");
        return isGroup
            ? {
                id: this.getSenderMessage(msg, wbot) as string,
                name: msg.pushName as string
            }
            : {
                id: msg.key.remoteJid as string,
                name: (msg.key.fromMe ? rawNumber : msg.pushName) as string
            };
    };

    private getSenderMessage(
        msg: proto.IWebMessageInfo,
        wbot: Session
    ): string | any {
        const me = this.getMeSocket(wbot);
        if (msg.key.fromMe) return me.id;

        const senderId = msg.participant || msg.key.participant || msg.key.remoteJid || undefined;

        return senderId && jidNormalizedUser(senderId);
    };

    private getMeSocket(wbot: Session): IMe {
        return {
            id: jidNormalizedUser((wbot as WASocket)?.user?.id || ''),
            name: (wbot as WASocket).user?.name || ''
        }
    }

    private async verifyContact(
        msgContact: IMe,
        wbot: Session,
        subscribeId: string
    ): Promise<IContact | undefined> {
        let profilePicUrl: string | any;

        try {
            profilePicUrl = await wbot.profilePictureUrl(msgContact.id);
        } catch (error) {
            profilePicUrl = `${process.env.FRONTEND_URL}/nopicture.png`;
        }

        const contactData = {
            name: msgContact?.name || msgContact.id.replace(/\D/g, ""),
            phone: msgContact.id.replace(/\D/g, ""),
            profilePicUrl,
            isGroup: msgContact.id.includes("g.us"),
            subscribeId,
        };

        let dataRetorno: IContact | undefined;

        try {
            const updateOrSaveContactWhatsapp = new UpdateOrSaveContactWhatsapp();
            dataRetorno = await updateOrSaveContactWhatsapp.executar(contactData);
        } catch (error) {
            console.log('Error on verifyContact', error);
        }

        return dataRetorno;
    };

}