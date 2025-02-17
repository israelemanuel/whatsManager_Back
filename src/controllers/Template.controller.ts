import { Request, Response } from "express";
import fs from "node:fs";
import { join, basename, extname } from "node:path";
import * as yup from "yup";

const VIEW_PATH = join(__dirname, "..", "views");

export default class TemplateController {

    public async readDir(req: Request, res: Response): Promise<any> {

        const views = fs.readdirSync(VIEW_PATH, { recursive: true, encoding: 'utf8' });

        const filesList = views.map((file) => {

            const filePath = join(VIEW_PATH, file);
            const stats = fs.statSync(filePath);

            return {
                name: basename(file),
                extension: extname(file),
                size: stats.size,
                modified: stats.mtime,
                created: stats.birthtime,
                accessed: stats.atime,
            }
        })


        return res.json(filesList);


    }

    public async read(req: Request, res: Response): Promise<any> {

        let body = {
            filename: req.params.filename,
        }

        try {
            const schema = yup.object().shape({
                filename: yup.string().required(),
            });

            body = await schema.validate(body);
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        }

        const sanitizedFilename = basename(body.filename);

        const file = fs.readFileSync(join(VIEW_PATH, sanitizedFilename));

        if (!file) {
            return res.status(404).json({
                message: "File not found",
            });
        }

        return res.send(file);

    }

    public async update(req: Request, res: Response): Promise<any> {

        let body = {
            filename: req.params.filename,
            content: req.body.content,
        }

        try {
            const schema = yup.object().shape({
                filename: yup.string().required(),
                content: yup.string().required(),
            });

            body = await schema.validate(body);
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        }

        const sanitizedFilename = basename(body.filename);

        try {
            fs.writeFileSync(join(VIEW_PATH, sanitizedFilename), body.content);

            return res.json({
                message: "File updated",
            });
        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
            });
        }


    }

}