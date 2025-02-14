
import { Request, Response } from 'express';
import Subscribe from './../models/Subscribe';
//encrptar senha

import * as yup from 'yup';

export class SubscribeController {

    public async create(req: Request, res: Response): Promise<any> {

        let body = {
            email: req.body.email,
            name: req.body.name,
            subdomain: req.host
        }

        try {
            const schema = yup.object().shape({
                email: yup.string().required('Email is required'),
                name: yup.string().required('Name is required'),
                subdomain: yup.string().required('Subdomain is required')
            })

            body = await schema.validate(body);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

        try {


            //VERIFICAR SE EMAIL JA EXISTE
            const emailExists = await Subscribe.findOne({ email: body.email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }


            const subscribe = await Subscribe.create(body);
            return res.status(200).json(subscribe);

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}