import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';

const errorHandler = async (err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.errorCode).json({ errors: err.serializeErrors() });
    }

    return res.status(400).json({ errors: err.message });
};

export default errorHandler;
