import { Request, Response } from 'express';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import Tag from './../../models/Tag';
import Domain from '../../models/Domain';

export class PageController {

    public async index(req: Request, res: Response): Promise<any> {

        try {

            const host = req.get('host');

            // host sem a porta
            const hostWithoutPort = host?.split(':')[0];


            const findDomain = await Domain.findOne({ domain: hostWithoutPort }).exec();

            if (!findDomain) {
                return res.status(404).send('Domain not found');
            }


            const template = fs.readFileSync(path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'index.ejs'), 'utf-8');

            const headerhtml = fs.readFileSync(path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'header.ejs'), 'utf-8');
            const footer = fs.readFileSync(path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'footer.ejs'), 'utf-8');
            const news = fs.readFileSync(path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'news.ejs'), 'utf-8');

            const tags = await Tag.find();

            const banner = {
                imageUrl: '/images/stars2.svg',

            };

            const bannerAsset = {
                confidentMen: '/images/confident_men.png',
            };

            const bannerAsset2 = {
                iconLogo: '/images/logo.svg',
            }

            const logo = {
                imageUrl: '/images/connectfy-logo.svg',
                alt: 'Logo',
                title: 'Logo'
            }

            const paralaxAsset = {
                imageUrl: '/images/cheerfull.png',
            }



            const header = ejs.render(headerhtml, { ...tags, banner, logo });

            const html = ejs.render(template, { header, news, footer, tags, banner, bannerAsset, bannerAsset2, paralaxAsset, logo });

            return res.send(html);
        } catch (error: any) {
            return res.status(500).send(error.message);
        }


    }
}