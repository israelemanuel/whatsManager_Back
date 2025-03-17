
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description: string;
    createById: string;
    thumbnail: string;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createById: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    thumbnail: { type: String, required: false },
}, {
    timestamps: true,
})

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;