
import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    author: string;
    category_id: string;
    content: string;
    createById: string;
    createdAt: Date;
    pushlishedAt: Date;
    section_id: string;
    slug: string;
    status: string;
    tags: string[];
    thumbnail: string;
    title: string;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    content: { type: String, required: true },
    createById: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    createdAt: { type: Date, default: Date.now },
    pushlishedAt: { type: Date, required: false },
    section_id: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    slug: { type: String, required: true },
    status: { type: String, required: false, Enum: ['draft', 'published'], default: 'draft' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: false }],
    thumbnail: { type: String, required: false },
    title: { type: String, required: true },
    updatedAt: { type: Date, required: false },
}, {
    timestamps: true,
})

const Post = mongoose.model<IPost>('Post', PostSchema);
export default Post;
