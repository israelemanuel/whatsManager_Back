import { Request, Response } from 'express';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import Tag from './../../models/Tag';
import Domain from '../../models/Domain';
import * as yup from 'yup';
import Pages from '../../models/Pages';

export class PageController {

    public async page(req: Request, res: Response): Promise<any> {

        let params: any = {
            page: req.params.page || 'index',
            query: req.query,
            body: req.body,
            headers: req.headers,
            params: req.params,
        }

        try {
            const schema = yup.object().shape({
                page: yup.string().required(),
            })

            params = await schema.validate(params);

        } catch (error) {
            return res.status(400).send('Page not found');
        }

        try {
            const host = req.get('host');
            const hostWithoutPort = host?.split(':')[0];

            const findDomain = await Domain.findOne({ domain: hostWithoutPort }).exec();

            let resposta: any = {};

            if (!findDomain) {
                const notFoundTemplate = fs.readFileSync(path.resolve(__dirname, '../../', 'views', '404.ejs'), 'utf-8');
                return res.status(404).send(ejs.render(notFoundTemplate));
            }

            const PageService = path.resolve(__dirname, '../../', 'pageService', `${findDomain?.folder}`, `${params.page}Service.ts`);
            //verificar se o arquivo existe
            const isFileExisteService = fs.existsSync(PageService);
            if (isFileExisteService) {
                const pageServiceModule = await import(PageService);
                const pageService = pageServiceModule.default;
                if (typeof pageService.execute === 'function') {
                    resposta = await pageService.execute(params);
                } else {
                    throw new Error(`O método 'execute' não foi encontrado no serviço ${params.page}Service.`);
                }
            }

            const headerHtml = fs.readFileSync(
                path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'header.ejs'),
                'utf-8'
            );

            const footerHtml = fs.readFileSync(
                path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'footer.ejs'),
                'utf-8'
            );




            const findPage = await Pages.findOne({ name: params.page }).exec();
            if (!findPage) {
                const notFoundTemplate = fs.readFileSync(
                    path.resolve(__dirname, '../../', 'views', findDomain?.folder, '404.ejs'),
                    'utf-8'
                );

                const header = ejs.render(headerHtml, { resposta });
                const footer = ejs.render(footerHtml, { resposta });

                const notFoundHtml = ejs.render(notFoundTemplate, { header, footer, resposta });
                return res.status(404).send(notFoundHtml);
            }

            const header = ejs.render(headerHtml, { resposta, title: findPage.title, description: findPage.description });
            const footer = ejs.render(footerHtml, { resposta, title: findPage.title, description: findPage.description });


            //VOU VERIFICAR SE O ARQUIVO EXISTE

            if (fs.existsSync(path.resolve(__dirname, '../../', 'views', findDomain?.folder, `page-${params.page}.ejs`))) {
                params.page = `page-${params.page}`;
            } else if (fs.existsSync(path.resolve(__dirname, '../../', 'views', findDomain?.folder, `${params.page}.ejs`))) {
                params.page = `${params.page}`;
            } else {
                //LER ARQUIVO NOTFOUND
                const notFoundTemplate = fs.readFileSync(
                    path.resolve(__dirname, '../../', 'views', findDomain?.folder, '404.ejs'),
                    'utf-8'
                );

                const notFoundHtml = ejs.render(notFoundTemplate, { header, footer, resposta });
                return res.status(404).send(notFoundHtml);
            }



            //ler arquivo
            const template = fs.readFileSync(
                path.resolve(__dirname, '../../', 'views', findDomain?.folder, `${params.page}.ejs`),
                'utf-8'
            );

            const html = ejs.render(template, { header, footer, resposta });

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