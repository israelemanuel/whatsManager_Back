

import Message from "../../models/Message";

export default class SaveMessageWhatsapp {
    executar(msg: any) {
        try {
            const message = new Message({
                sessionId: msg.sessionId,
                from: msg.from,
                to: msg.to,
                body: msg.body,
                type: msg.type,
                timestamp: msg.timestamp,
                status: msg.status,
                isGroupMsg: msg.isGroupMsg,
                chatId: msg.chatId,
                contactId: msg.contactId,
                isDeleted: msg.isDeleted,
                isMuted: msg.isMuted,
                isStarred: msg.isStarred,
                isForwarded: msg.isForwarded,
                isQuotedMsgAvailable: msg.isQuotedMsgAvailable,
                isStatus: msg.isStatus,
                isMedia: msg.isMedia,
                isNotification: msg.isNotification,
            })
        } catch (error: any) {

        }
    }
}