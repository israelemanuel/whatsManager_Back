import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    remoteJid: string;
    participant: string;
    dataJson: string;
    ack: number;
    read: boolean;
    fromMe: boolean;
    body: string;
    mediaUrl: string | null;
    mediaType: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    quotedMsgId: string;
    contactId: number;
    isEdited: boolean;
}

const MessageSchema: Schema = new Schema(
    {
        remoteJid: { type: String, required: true },
        participant: { type: String, required: true },
        dataJson: { type: String, required: true },
        ack: { type: Number, default: 0 },
        read: { type: Boolean, default: false },
        fromMe: { type: Boolean, default: false },
        body: { type: String, required: true },
        mediaUrl: {
            type: String,
            get: function (this: IMessage) {
                if (this.mediaUrl) {
                    return `${process.env.BACKEND_URL}/public/${this.mediaUrl}`;
                }
                return null;
            },
        },
        mediaType: { type: String },
        isDeleted: { type: Boolean, default: false },
        quotedMsgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
        contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
        isEdited: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
