
import { Request, Response } from 'express';
import Session, { ISession } from './../models/Session';
//encrptar senha
import bcrypt from 'bcrypt';

import * as yup from 'yup';
import { generateToken } from '../libs/jwt';
import Subscribe from '../models/Subscribe';
import Domain, { IDomain } from '../models/Domain';

export class LoginController {
    public async login(req: Request, res: Response): Promise<any> {

        let body = {
            login: req.body.login,
            password: req.body.password
        }

        try {
            const schema = yup.object().shape({
                login: yup.string().required('Login is required'),
                password: yup.string().required('Password is required')
            })

            body = await schema.validate(body);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

        try {

            const session = await Session.findOne({
                login: body.login,
            });

            if (!session) {
                return res.status(400).json({ message: 'User not found' });
            }

            const isPasswordValid = bcrypt.compareSync(body.password, session.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            //GERAR TOKEN
            const token = generateToken({
                sessionId: session._id.toString(),
            });

            const next = {
                token: token,
                user: session,
            }

            return res.status(200).json({
                token: token,
                user: {
                    _id: session._id,
                    login: session.login
                }
            });

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    public async register(req: Request, res: Response): Promise<any> {

        let body: ISession = {
            login: req.body.login,
            password: req.body.password,
        }

        try {
            const schema = yup.object().shape({
                login: yup.string().required('Login is required'),
                password: yup.string().required('Password is required')
            })

            body = await schema.validate(body);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

        try {

            //VERIFICAR SE LOGIN JA EXISTE
            const loginExists = await Session.findOne({ login: body.login });
            if (loginExists) {
                return res.status(400).json({ message: 'Login already exists' });
            }

            body.password = bcrypt.hashSync(body.password, 10);
            const session = new Session(body);
            await session.save();

            return res.status(201).json(session);
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });

        }
    }
}