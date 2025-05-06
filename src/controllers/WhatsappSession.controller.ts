
import { Request, Response } from 'express';
import * as yup from 'yup';
import { initWASocket } from './../libs/wbot'
import Session from './../models/Session'
import WhatsappSession, { IWhatsappSession } from './../models/WhatsappSession'
import StartWhatsappSession from '../services/BotServices/StartWhatsappSession';
import SendWhatsappMessage from '../services/BotServices/SendWhatsappMessage';

export class WhatsappController {


    public async create(request: Request, response: Response): Promise<any> {
        let body: IWhatsappSession = {
            subscribeId: request.user.subscribeId,
            createById: request.user.id,
            status: 'DISCONNECT',
        }

        try {
            const schema = yup.object().shape({
                subscribeId: yup.string().required('SubscribeId is required'),
                createById: yup.string().required('CreateById is required'),
                status: yup.string().required('Status is required')
            })

            body = await schema.validate(body) as IWhatsappSession;

        } catch (error: any) {
            return response.status(400).json({ message: error.message });
        }

        try {
            const whatsappSession = await WhatsappSession.create(body);
            return response.status(201).json(whatsappSession);

        } catch (error: any) {
            return response.status(400).json({ message: error.message });
        }
    }

    public async start(request: Request, response: Response): Promise<any> {

        const whatsappSessionId = request.params.id;

        let body = {
            sessionId: request.user.id,
            subscribeId: request.user.subscribeId,
            whatsappSessionId: whatsappSessionId,
        }

        try {
            const schema = yup.object().shape({
                sessionId: yup.string().required('SessionId is required'),
                subscribeId: yup.string().required('SubscribeId is required'),
                whatsappSessionId: yup.string().required('WhatsappSessionId is required')
            })

            body = await schema.validate(body);
        } catch (error: any) {
            return response.status(400).json({ message: error.message });

        }

        try {
            //VERIFICAR SE EXISTE WHATSAPP SESSION ATIVA

            const whatsappSession = await WhatsappSession.findOne({
                subscribeId: body.subscribeId,
                _id: body.whatsappSessionId 
            });

            if (!whatsappSession) {
                return response.status(400).json({ message: 'Whatsapp session not found' });
            }

            // if (whatsappSession.status === 'CONNECT') {
            //     return response.status(400).json({ message: 'Whatsapp session already connected' });
            // }

            // if (whatsappSession.status === 'PENDING') {
            //     return response.status(400).json({ message: 'Whatsapp session already pending' });
            // }

            const startWhatsappSession = new StartWhatsappSession();
            startWhatsappSession.execute(whatsappSession._id);
            //DEVE TER UMA FILA DE PROCESSAMENTO PRA ENVIAR EE EXECUTAR ESSA FUNCAO
            return response.status(200).json(whatsappSession);

        } catch (error: any) {
            return response.status(400).json({ message: error.message });
        }
    }


    public async autehnticate(request: Request, response: Response): Promise<any> {

        try {
            const auth: any = {
                sessionId: request.user.id
            }

            //BUSCAR SE TEM SESSAO ATIVA NO WHATSAPP
            const whatsapp = await WhatsappSession.findOne({ sessionId: auth.sessionId });

            if (!whatsapp) {
                const sessionWhatsapp = await WhatsappSession.create({
                    sessionId: auth.sessionId,
                    status: 'disconnected',
                    qrcode: '',
                })

                sessionWhatsapp.save();
            }

            const startWhatsappSession = new StartWhatsappSession();
            startWhatsappSession.execute(auth.sessionId);

        } catch (error: any) {
            return response.status(400).json({ message: error.message });
        }
    }


    public async respond(request: Request, response: Response): Promise<any> {
        // try {
        //     const body = {
        //         message: request.body.message,
        //         phone: request.body.phone,
        //     }

        //     const schema = yup.object().shape({
        //         message: yup.string().required('Message is required'),
        //         phone: yup.string().required('Phone is required')
        //     })

        //     await schema.validate(body);

        // } catch (error: any) {
        //     return response.status(400).json({ message: error.message });
        // }

        try {
            const sendWhatsappMessage = new SendWhatsappMessage();
            const body = {
                phone: "559180993795@s.whatsapp.net",
                sessionId: request.user.id,
                message: request.body.message || 'Hello World',
                whatsappSessionId: '6770522abce0a640ff5269bf'
            }
            // const sendMessage = await sendWhatsappMessage.execute(body);

            // return response.status(200).json(sendMessage);
        } catch (error: any) {
            return response.status(400).json({ message: error.message });
        }
    }
}
