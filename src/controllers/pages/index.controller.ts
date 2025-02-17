
import { Request, Response } from 'express';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import Tag from './../../models/Tag';

export class PageController {

    public async index(req: Request, res: Response): Promise<any> {
        const template = fs.readFileSync(path.resolve(__dirname, '../../views/index.ejs'), 'utf-8');

        const header = fs.readFileSync(path.resolve(__dirname, '../../views/inc/header.ejs'), 'utf-8');
        const footer = fs.readFileSync(path.resolve(__dirname, '../../views/inc/footer.ejs'), 'utf-8');

        const tags = await Tag.find();

        const html = ejs.render(template, { header, footer, tags });

        return res.send(html);


    }
}