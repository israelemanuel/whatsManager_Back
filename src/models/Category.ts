
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description: string;
    createById: string;
    category_parent_id: string;
    type: string;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createById: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: false, Enum: ['default', 'galery', 'note'], default: 'default' },
    category_parent_id: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
}, {
    timestamps: true,
})

const Category = mongoose.model<ICategory>('Category', CategorySchema);
export default Category;