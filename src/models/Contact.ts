import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
    name: string;
    phone: string;
    email: string;
    profilePicUrl: string;
    isGroup: boolean;
}

const ContactSchema: Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: '' },
    profilePicUrl: { type: String, required: false, default: '' },
    isGroup: { type: Boolean, required: false, default: false },
    subscribeId: { type: Schema.Types.ObjectId, ref: 'Subscribe', required: false },
}, {
    timestamps: true,
})

const Contact = mongoose.model<IContact>('Contact', ContactSchema);
export default Contact;