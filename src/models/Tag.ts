import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
    name: string;
    color: string;
    createById: string;
}

const TagSchema: Schema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: false },
    createById: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
})

const Tag = mongoose.model<ITag>('Tag', TagSchema);
export default Tag;