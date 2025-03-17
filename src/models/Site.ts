
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    domain: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true },
    domain: { type: Schema.Types.ObjectId,  ref: 'Domain', required: true },
}, {
    timestamps: true,
})

const Category = mongoose.model<ICategory>('Site', CategorySchema);
export default Category;