import { ListWhatsappSession } from "./ListWhatsapSession"
import StartWhatsappSession from "./StartWhatsappSession";


export const StartAllWhatsappSession = async (subscribeId: string) => {
    try {

        const listWhatsappSession = await ListWhatsappSession(subscribeId);

        const startWhatsappSession = new StartWhatsappSession()

        if (listWhatsappSession?.length) {
            listWhatsappSession.forEach(async (whatsappSession) => {
                await startWhatsappSession.execute(whatsappSession._id);
            });

        }

    } catch (error) {
        console.log('Error on StartAllWhatsappSession', error)
    }
}