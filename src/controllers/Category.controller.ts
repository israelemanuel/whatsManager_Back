import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from './../models/Category';
import * as yup from 'yup';

export class CategoryController {

    public async create(req: Request, res: Response): Promise<any> {

        let body = {
            name: req.body.name,
            description: req.body.description,
            createById: req.user.id,
            type: req.body.type,
            category_parent_id: req.body.category_parent_id
        }

        try {
            const schema = yup.object().shape({
                name: yup.string().required('Name is required'),
                description: yup.string().required('Description is required'),
                createById: yup.string().required('CreateById is required'),
                type: yup.string().required('Type is required').oneOf(['default', 'galery', 'note']),
                category_parent_id: yup.string().nullable()
                    .test('is-valid', 'Invalid ID format', value => {
                        if (!value) return true;
                        return mongoose.Types.ObjectId.isValid(value);
                    })
            });

            await schema.validate(body);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

        try {
            const category = await Category.create(body);
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findAll(req: Request, res: Response): Promise<any> {
        try {
            const categories = await Category.find();
            return res.status(200).json(categories);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findOne(req: Request, res: Response): Promise<any> {

        const id = req.params.id;

        try {
            const schemaId = yup.string().required('Id is required')
                .test('is-valid', 'Invalid ID format', value => mongoose.Types.ObjectId.isValid(value));

            await schemaId.validate(id);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

        try {
            const category = await Category.findById(id);
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<any> {

        const id = req.params.id;

        let body: any = {
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            category_parent_id: req.body.category_parent_id
        }

        try {
            const schemaId = yup.string().required('Id is required')
                .test('is-valid', 'Invalid ID format', value => mongoose.Types.ObjectId.isValid(value));

            await schemaId.validate(id);

            const schema = yup.object().shape({
                name: yup.string(),
                description: yup.string(),
                type: yup.string().oneOf(['default', 'galery', 'note']),
                category_parent_id: yup.string().nullable()
                    .test('is-valid', 'Invalid ID format', value => {
                        if (!value) return true;
                        return mongoose.Types.ObjectId.isValid(value);
                    })
            });

            body = await schema.validate(body);

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }


        try {
            const category = await Category.findByIdAndUpdate(req.params.id, body, { new: true });
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response): Promise<any> {

        const id = req.params.id;

        try {
            const schemaId = yup.string().required('Id is required')
                .test('is-valid', 'Invalid ID format', value => mongoose.Types.ObjectId.isValid(value));

            await schemaId.validate(id);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

        try {
            const category = await Category.findByIdAndDelete(id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            return res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

    }

}

