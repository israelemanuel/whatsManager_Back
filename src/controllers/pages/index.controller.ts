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

            const highlightServices = [
                { name: 'Reparo de Lâmpadas' },
                { name: 'Reparo de Buracos' },
                { name: 'Remoção de Entulho' },
                { name: 'Coleta de Lixo' },
                { name: 'Fiscalização de Obras' },
                { name: 'Estacionamento Irregular' },
                { name: 'Consulta a processos' },
                { name: 'Poda de Árvores' }
            ]

            const lstPersonas = [
                { name: 'Cidadão', description: 'Encontre Serviços destinados a todos os cidadãos', icon: 'person' },
                { name: 'Empreendedor', description: 'Encontre Serviços destinados a todos as empresas', icon: 'domain' },
                { name: 'Servidor', description: 'Encontre Serviços destinados a todos os servidores', icon: 'work' },
            ]

            const lstSecretaries = [
                { name: 'SEMOB' },
                { name: 'SEURB' },
                { name: 'SESMA' },
                { name: 'SEMMA' }
            ];

            const lstNews = [
                { type: 1, title: 'Notícia 1', description: 'Descrição da notícia 1', image: '/path/to/image1.jpg', date: '2025-02-17' },
                { type: 2, title: 'Notícia 2', description: 'Descrição da notícia 2', image: '/path/to/image2.jpg', date: '2025-02-16' },
                { type: 3, title: 'Notícia 3', description: 'Descrição da notícia 3', image: '/path/to/image3.jpg', date: '2025-02-15' },
                { type: 4, title: 'Notícia 4', description: 'Descrição da notícia 4', image: '/path/to/image4.jpg', date: '2025-02-14' },
                { type: 4, title: 'Notícia 4', description: 'Descrição da notícia 4', image: '/path/to/image4.jpg', date: '2025-02-14' },
                { type: 4, title: 'Notícia 4', description: 'Descrição da notícia 4', image: '/path/to/image4.jpg', date: '2025-02-14' },
                { type: 4, title: 'Notícia 4', description: 'Descrição da notícia 4', image: '/path/to/image4.jpg', date: '2025-02-14' },
            ];

            const lstAdresses = [
                { name: 'SEMOB', address: 'Av. Almirante Barroso, 832', phone: '(91) 4006-3600' },
                { name: 'SEURB', address: 'Av. Almirante Barroso, 832', phone: '(91) 4006-3600' },
                { name: 'SESMA', address: 'Av. Almirante Barroso, 832', phone: '(91) 4006-3600' },
                { name: 'SEMMA', address: 'Av. Almirante Barroso, 832', phone: '(91) 4006-3600' },
            ]



            const header = ejs.render(headerhtml, { ...tags, banner, logo });

            const html = ejs.render(template, { header, news, footer, tags, banner, bannerAsset, bannerAsset2,  logo, highlightServices, lstPersonas, lstSecretaries, lstNews, lstAdresses });

            return res.send(html);
        } catch (error: any) {
            return res.status(500).send(error.message);
        }


    }
}