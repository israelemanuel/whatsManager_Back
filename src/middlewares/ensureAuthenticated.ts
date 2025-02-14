
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../libs/jwt';
import { decode } from 'jsonwebtoken'


export default async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<any> {
    try {
        const token = request.headers['x-access-token'];

        if (!token) {
            return response.status(401).json({ message: 'Token is required' });
        }

        const hasTokenValid: any = verifyToken(token.toString())
        if (!hasTokenValid) {
            return response.status(401).json({ message: 'Token invalid' });
        }

        const payload = {
            id: hasTokenValid?.sessionId,
            subscribeId : hasTokenValid?.subscribeId
        }

        request.user = {} as any;

        request.user.id = payload.id;
        request.user.subscribeId = hasTokenValid?.subscribeId;

        next();
    } catch (error) {
        return response.status(401).json({ message: 'Token invalid' });
    }

}