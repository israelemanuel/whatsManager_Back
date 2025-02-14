import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;


// Interface do documento do Mongoose
export interface IWhatsappSession {
    _id?: string;
    createById?: string;
    credentials?: any;
    qrcode?: string;
    status?: "PENDING" | "DISCONNECT" | "CONNECT";
    retries?: number;
    subscribeId?: string;
}

const whatsappSessionSchema = new Schema({
    createById: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Session'
    },
    credentials: { type: Object, default: null }, // Credenciais do WhatsApp
    qrcode: { type: String, default: null }, // QRCode do WhatsApp
    status: { type: String, default: null, enum : ["PENDING", "DISCONNECT", "CONNECT"]}, // Status da sessão
    retries: { type: Number, default: 0 }, // Quantidade de tentativas de conexão
    subscribeId: {
        type: Schema.Types.ObjectId,
        ref: 'Subscribe',
        required: true
    }
}, {
    timestamps: true
})

//MODELO DO MONGOOSE
const WhatsappSession: Model<IWhatsappSession> = mongoose.model<IWhatsappSession>("WhatsappSession", whatsappSessionSchema);

export default WhatsappSession;