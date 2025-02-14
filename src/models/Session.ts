
import mongoose, { Document } from "mongoose";
const Schema = mongoose.Schema;

export interface ISession {
    login: string;
    password: string;
    subscribs?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

const sessionSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subscribs: { type: [Schema.Types.ObjectId], ref: 'Subscribe', default: [] }
}, {
    timestamps: true
})

const Session = mongoose.model<ISession>('Session', sessionSchema);
export default Session;
