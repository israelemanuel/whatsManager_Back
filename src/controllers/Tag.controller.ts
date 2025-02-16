import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Tag from './../models/Tag';
import * as yup from 'yup';

export class TagController {

    public async create(req: Request, res: Response): Promise<any> {

        let body : any = {
            name: req.body.name,
            color: req.body.color,
            createById: req.user.id
        }

        try {
            const schema = yup.object().shape({
                name: yup.string().required('Name is required'),
                color: yup.string()
                    .test('is-hex', 'Color must be a hexadecimal', value => {
                        if (!value) return false;
                        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
                    }),
                createById: yup.string().required('CreateById is required')
            })

            body = await schema.validate(body);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

        try {
            const tag = await Tag.create(body);
            return res.status(200).json(tag);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findAll(req: Request, res: Response): Promise<any> {
        try {
            const tags = await Tag.find();
            return res.status(200).json(tags);
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
            const tag = await Tag.findById(id);
            return res.status(200).json(tag);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<any> {
        try {
            const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json(tag);
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
            const tag = await Tag.findByIdAndDelete(id);
            if (!tag) {
                return res.status(404).json({ message: 'Tag not found' });
            }
            return res.status(200).json({ message: 'Tag deleted successfully' });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

    }

}