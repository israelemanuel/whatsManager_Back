import { initWASocket } from "../../libs/wbot";
import WhatsappSession from "../../models/WhatsappSession";
import WhatsappListener from "./WhatsappListener";


export default class StartWhatsappSession {
    public async execute(whatsappSessionId: string): Promise<void> {
        try {

            //BUSCAR SE TEM SESSAO ATIVA NO WHATSAPP
            const whatsappSession = await WhatsappSession.findOneAndUpdate({ _id: whatsappSessionId }, {
                $set: {
                    status: 'PENDING',
                }
            });

            const whatsappListener = new WhatsappListener();

            if(!whatsappSession){
                throw new Error('Whatsapp session not found');
            }

            const subscribeId = whatsappSession.subscribeId?.toString() || '';

            const wbot = await initWASocket(whatsappSessionId);
            whatsappListener.listen(wbot, subscribeId);

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}