import { Request, Response } from 'express';
import Domain from '../../models/Domain';
import fs from 'fs';
import path from 'path';

export default class AssetsController {



    async css(req: Request, res: Response): Promise<any> {



        const host = req.get('host');

        // host sem a porta
        const hostWithoutPort = host?.split(':')[0];


        const findDomain = await Domain.findOne({ domain: hostWithoutPort }).exec();

        if (!findDomain) {
            return res.status(404).send('Domain not found');
        }

        const style = fs.readFileSync(path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'style.css'), 'utf-8');

        res.setHeader('Content-Type', 'text/css');

        res.send(style);



    }

    async js(req: Request, res: Response): Promise<any> {
        const host = req.get('host');

        // host sem a porta
        const hostWithoutPort = host?.split(':')[0];


        const findDomain = await Domain.findOne({ domain: hostWithoutPort }).exec();

        if (!findDomain) {
            return res.status(404).send('Domain not found');
        }

        const script = fs.readFileSync(path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'script.js'), 'utf-8');

        res.setHeader('Content-Type', 'text/javascript');

        res.send(script);
    }

    async folderCss(req: Request, res: Response): Promise<any> {

        try {
            const filecss = req.params.filecss;

            const host = req.get('host');

            // host sem a porta
            const hostWithoutPort = host?.split(':')[0];
            const findDomain = await Domain.findOne({ domain: hostWithoutPort }).exec();

            if (!findDomain) {
                return res.status(404).send('Domain not found');
            }

            const patchFolder = path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'styles');

            const css = fs.readFileSync(path.resolve(patchFolder, filecss), 'utf-8');

            res.setHeader('Content-Type', 'text/css');

            res.send(css);
        } catch (error) {
            console.log(error);
            return res.status(404).send('File not found');
        }

    }

    async folderJs(req: Request, res: Response): Promise<any> {
        try {
            const filejs = req.params.filejs;

            const host = req.get('host');

            // host sem a porta
            const hostWithoutPort = host?.split(':')[0];
            const findDomain = await Domain.findOne({ domain: hostWithoutPort }).exec();

            if (!findDomain) {
                return res.status(404).send('Domain not found');
            }

            const patchFolder = path.resolve(__dirname, '../../', 'views', findDomain?.folder, 'scripts');

            const js = fs.readFileSync(path.resolve(patchFolder, filejs), 'utf-8');

            res.setHeader('Content-Type', 'text/javascript');

            res.send(js);
        } catch (error) {
            console.log(error);
            return res.status(404).send('File not found ');
        }

    }

    async folderImages(req: Request, res: Response): Promise<any> {
        try {
            
            const fileimg = req.params.fileImage;
    
            if (!fileimg) {
                return res.status(400).send('File parameter is missing');
            }
    
            const host = req.get('host');
    
            if (!host) {
                return res.status(400).send('Host header is missing');
            }
    
            const hostWithoutPort = host.split(':')[0];
            const findDomain = await Domain.findOne({ domain: hostWithoutPort }).exec();
    
            if (!findDomain) {
                return res.status(404).send('Domain not found');
            }
    
            const patchFolder = path.resolve(__dirname, '../../', 'views', findDomain.folder, 'images');
            const filePath = path.resolve(patchFolder, fileimg);
    
            if (!fs.existsSync(filePath)) {
                return res.status(404).send('File not found');
            }
    
            const fileExtension = path.extname(filePath).toLowerCase();
            const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
    
            if (!allowedExtensions.includes(fileExtension)) {
                return res.status(400).send('Invalid file type');
            }
    
            const image = fs.readFileSync(filePath);

            const mimeType = fileExtension === '.svg' ? 'image/svg+xml' : `image/${fileExtension.slice(1)}`;
            res.setHeader('Content-Type', `${mimeType}`);

            res.send(image);
        } catch (error) {
            console.error('Error fetching file:', error);
            return res.status(500).send('Internal server error');
        }
    }

    
}