import * as jwt from 'jsonwebtoken';

interface IToken {
    sessionId: string;
    subscribeId: string;
}

const generateToken = ({ sessionId, subscribeId }: IToken) => {
    return jwt.sign({ sessionId, subscribeId }, (process.env.JWT_SECRET + ''), { expiresIn: '22d' });
};

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, (process.env.JWT_SECRET + ''));
    } catch (error) {
        throw new Error('Token inválido ou expirado');
    }
};

export { generateToken, verifyToken };