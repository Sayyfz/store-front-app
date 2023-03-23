import { DatabaseError } from 'pg-protocol';
import ValidationError from './ValidationError';
import { NextFunction } from 'express';
import BadRequestError from './BadRequestError';

export const checkErrorAndNext = (err: Error, entity: string, next: NextFunction) => {
    if (err instanceof DatabaseError) {
        console.log(err.detail);
        switch (err.code) {
            case '23505':
                next(new ValidationError(`${entity} already exists`));
                break;
            case '23503':
                next(new ValidationError(`Database reference error`));
                break;
            default:
                next(new BadRequestError('An unexpected database error occurred'));
        }
    } else {
        next(new BadRequestError((err as Error).message));
    }
};
