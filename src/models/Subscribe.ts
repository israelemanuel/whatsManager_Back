import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscribe extends Document {
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const SubscribeSchema: Schema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: false },
    subdomain: { type: String, required: false },
}, {
    timestamps: true,
})

const Subscribe = mongoose.model<ISubscribe>('Subscrible', SubscribeSchema);
export default Subscribe;