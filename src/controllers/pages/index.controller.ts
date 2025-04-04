import { Request, Response } from 'express';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import Tag from './../../models/Tag';
import Domain from '../../models/Domain';
import * as yup from 'yup';
import Pages from '../../models/Pages';

export class PageController {

    public async index(req: Request, res: Response): Promise<any> {

        try {

            const host = req.get('host');

            // host sem a porta
            const hostWithoutPort = host?.split(':')[0];


            const findDomain = await Domain.findOne({ domain: hostWithoutPort }).exec();

            if (!findDomain) {
                const notFoundTemplate = fs.readFileSync(path.resolve(__dirname, '../../', 'views', '404.ejs'), 'utf-8');
                return res.status(404).send(ejs.render(notFoundTemplate));
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

            const partners = [
                {
                    file: '/images/govsolutions_logo.svg',
                    fileName: 'Govsolutions',
                },
                {
                    file: '/images/crontabil_logo.png',
                    fileName: 'Crontabil',
                },
                {
                    file: '/images/lotagovrh_logo.png',
                    fileName: 'LotaGovRH',
                }
            ]

            const header = ejs.render(headerhtml, { ...tags, banner, logo, title : "" , page: 'index'});

            const html = ejs.render(template, { header, news, footer, tags, banner, partners, bannerAsset, bannerAsset2, paralaxAsset, logo });

            return res.send(html);
        } catch (error: any) {
            return res.status(500).send(error.message);
        }


    }

    public async page(req: Request, res: Response): Promise<any> {

        let params = {
            page: req.params.page,
        }

        try {
            const schema = yup.object().shape({
                page: yup.string().required(),
            })

            params = await schema.validate(params, { stripUnknown: true });

        } catch (error) {
            return res.status(400).send('Page not found');
        }

        try {
            const host = req.get('host');
            const hostWithoutPort = host?.split(':')[0];

            const findDomain = await Domain.findOne({ domain: hostWithoutPort }).exec();


            if (!findDomain) {
                const notFoundTemplate = fs.readFileSync(path.resolve(__dirname, '../../', 'views', '404.ejs'), 'utf-8');
                return res.status(404).send(ejs.render(notFoundTemplate));
            }

            const headerHtml = fs.readFileSync(
                path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'header.ejs'),
                'utf-8'
            );

            const footerHtml = fs.readFileSync(
                path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'footer.ejs'),
                'utf-8'
            );


            const banner = {
                imageUrl: '/images/about-banner.svg',
            };

            const logo = {
                imageUrl: '/images/connectfy-logo.svg',
                alt: 'Logo',
                title: 'Logo',
            };

            const findPage = await Pages.findOne({ name: params.page }).exec();
            if (!findPage) {
                const notFoundTemplate = fs.readFileSync(
                    path.resolve(__dirname, '../../', 'views', findDomain?.folder, '404.ejs'),
                    'utf-8'
                );

                const header = ejs.render(headerHtml, { banner, logo });
                const footer = ejs.render(footerHtml, { banner, logo });

                const notFoundHtml = ejs.render(notFoundTemplate, { header, footer, banner, logo });
                return res.status(404).send(notFoundHtml);
            }

            const header = ejs.render(headerHtml, { banner, logo, title : findPage.title, description: findPage.description, page: params.page });
            const footer = ejs.render(footerHtml, { banner, logo, title : findPage.title, description: findPage.description });


            //VOU VERIFICAR SE O ARQUIVO EXISTE
            const isFileExiste = fs.existsSync(path.resolve(__dirname, '../../', 'views', findDomain?.folder, `page-${params.page}.ejs`));

            //como fazer insert no banco
            // const pages = new Pages({
            //     name: 'about',
            //     title: 'Sobre Nós',
            //     description: 'Sobre Nós',
            // });

            // await pages.save();


            //FAZ AS COISAS ANTES DISSO
            if (!isFileExiste) {
                //LER ARQUIVO NOTFOUND
                const notFoundTemplate = fs.readFileSync(
                    path.resolve(__dirname, '../../', 'views', findDomain?.folder, '404.ejs'),
                    'utf-8'
                );

                const notFoundHtml = ejs.render(notFoundTemplate, { header, footer, banner, logo });
                return res.status(404).send(notFoundHtml);
            }

            //ler arquivo
            const template = fs.readFileSync(
                path.resolve(__dirname, '../../', 'views', findDomain?.folder, `page-${params.page}.ejs`),
                'utf-8'
            );

            const html = ejs.render(template, { header, footer, banner, logo });

            return res.send(html);
        } catch (error: any) {
            return res.status(500).send(error.message);
        }
    }

    public async notFound(req: Request, res: Response): Promise<any> {
        try {
            const host = req.get('host');
            const hostWithoutPort = host?.split(':')[0];

            const findDomain = await Domain.findOne({ domain: hostWithoutPort }).exec();

            if (!findDomain) {
                const defaultNotFoundTemplate = fs.readFileSync(path.resolve(__dirname, '../../', 'views', '404.ejs'), 'utf-8');
                return res.status(404).send(ejs.render(defaultNotFoundTemplate));
            }

            const notFoundTemplate = fs.readFileSync(
                path.resolve(__dirname, '../../', 'views', findDomain?.folder, '404.ejs'),
                'utf-8'
            );

            const logo = {
                imageUrl: '/images/connectfy-logo.svg',
                alt: 'Logo',
                title: 'Logo',
            };

            const html = ejs.render(notFoundTemplate, { logo });

            return res.status(404).send(html);
        } catch (error: any) {
            return res.status(500).send(error.message);
        }
    }
}