import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    try {
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
        next();
    } catch (err) {
        return res.status(401).json((err as Error).message);
    }
};
