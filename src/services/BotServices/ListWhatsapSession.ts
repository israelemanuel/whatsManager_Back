import WhatsappSession from "../../models/WhatsappSession"
import StartWhatsappSession from "./StartWhatsappSession"


export const ListWhatsappSession = async (subscribeId: string) => {
    try {
        const whatsappSession = await WhatsappSession.find({
            subscribeId: subscribeId
        })
        
        return whatsappSession;

    } catch (error) {
        console.log('Error on ListWhatsappSession', error)
    }
}