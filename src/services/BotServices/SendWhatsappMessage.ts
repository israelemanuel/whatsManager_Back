import { proto, WAMessage } from "@whiskeysockets/baileys";
import { getWbot } from "../../libs/wbot";


export default class SendWhatsappMessage {
    public async execute(body: any, whatsappSessionId: string): Promise<proto.WebMessageInfo | undefined> {
        
        const wbot = getWbot(whatsappSessionId);

        let option = {};
        const number = `${body.phone}@${body.isGroup ? 'g.us' : 's.whatsapp.net'}`;

        try {
            const sendMessage = await wbot.sendMessage(number, {
                text: body.message
            });

            return sendMessage

        } catch (error : any) {
            throw new Error(error.message);
        }
    }
}