
import mongoose, { Schema, Document } from 'mongoose';

export interface IPages extends Document {
    title: string;
    name: string;
    description: string;
}

const PagesSchema: Schema = new Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true,
})

const Pages = mongoose.model<IPages>('Pages', PagesSchema);
export default Pages;