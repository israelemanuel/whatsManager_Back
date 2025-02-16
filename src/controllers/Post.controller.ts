
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from './../models/Post';
import * as yup from 'yup';

export class PostController {

    public async create(req: Request, res: Response): Promise<any> {

        let body: any = {
            author: req.body.author,
            category_id: req.body.category_id,
            content: req.body.content,
            createById: req.body.createById,
            pushlishedAt: req.body.pushlishedAt,
            section_id: req.body.section_id,
            slug: req.body.slug,
            status: req.body.status,
            tags: req.body.tags,
            thumbnail: req.body.thumbnail,
            title: req.body.title,
        }

        try {
            const schema = yup.object().shape({
                author: yup.string().required('Author is required')
                    .test('is-valid', 'Invalid ID format', value => mongoose.Types.ObjectId.isValid(value)),
                category_id: yup.string().required('Category_id is required')
                    .test('is-valid', 'Invalid ID format', value => mongoose.Types.ObjectId.isValid(value)),
                content: yup.string().required('Content is required'),
                createById: yup.string().required('CreateById is required')
                    .test('is-valid', 'Invalid ID format', value => mongoose.Types.ObjectId.isValid(value)),
                pushlishedAt: yup.date().required('PushlishedAt is required'),
                section_id: yup.string()
                    .test('is-valid', 'Invalid ID format', value => {
                        if (!value) return true;
                        return mongoose.Types.ObjectId.isValid(value);
                    }),
                slug: yup.string().required('Slug is required').max(255).min(3),
                status: yup.string().required('Status is required').oneOf(['draft', 'published']),
                tags: yup.array().of(yup.string()
                    .test('is-valid', 'Invalid ID format', value => {
                        if (!value) return true;
                        return mongoose.Types.ObjectId.isValid(value);
                    })),
                thumbnail: yup.string().nullable(),
            });

            body = await schema.validate(body);

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

        try {
            const post = await Category.create(body);
            return res.status(201).json(post);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }

    }

    public async findAll(req: Request, res: Response): Promise<any> {
        try {
            const posts = await Category.find();
            return res.status(200).json(posts);
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
            const post = await Category.findById(id);
            return res.status(200).json(post);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<any> {

        const id = req.params.id;

        let body: any = {
            author: req.body.author,
            category_id: req.body.category_id,
            content: req.body.content,
            pushlishedAt: req.body.pushlishedAt,
            section_id: req.body.section_id,
            slug: req.body.slug,
            status: req.body.status,
            tags: req.body.tags,
            thumbnail: req.body.thumbnail,
            title: req.body.title,
        }

        try {
            const schemaId = yup.string().required('Id is required')
                .test('is-valid', 'Invalid ID format', value => mongoose.Types.ObjectId.isValid(value));

            await schemaId.validate(id);

            const schema = yup.object().shape({
                author: yup.string(),
                category_id: yup.string(),
                content: yup.string().required('Content is required'),
                pushlishedAt: yup.date(),
                section_id: yup.string(),
                slug: yup.string(),
                status: yup.string().oneOf(['draft', 'published']),
                tags: yup.array().of(yup.string()
                    .test('is-valid', 'Invalid ID format', value => {
                        if (!value) return true;
                        return mongoose.Types.ObjectId.isValid(value);
                    })),
                thumbnail: yup.string().nullable(),
                title: yup.string(),
            })

            await schema.validate(body);

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

        try {

            const update = await Category.updateOne({ _id: id }, body);
            if (!update) {
                return res.status(404).json({ message: 'Post not found' });
            }

            return res.status(200).json(update);

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
            const post = await Category.findByIdAndDelete(id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            return res.status(200).json(post);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}