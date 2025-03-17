
import mongoose, { Schema, Document } from 'mongoose';

export interface IDomain extends Document {
    domain: string;
    description: string;
    active: boolean;
    subscribe_id: string;
    createdAt: Date;
    updatedAt: Date;
}

const Domainchema: Schema = new Schema({
    domain: { type: String, required: true },
    description: { type: String, required: false },
    active : { type: Boolean, required: false, default: true },
    subscribe_id: { type: Schema.Types.ObjectId, ref: 'Subscribe', required: true },
}, {
    timestamps: true,
})

const Domain = mongoose.model<IDomain>('Domain', Domainchema);
export default Domain;