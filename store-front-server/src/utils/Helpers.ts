import { DatabaseError } from 'pg-protocol';
import ValidationError from './ValidationError';
import { NextFunction } from 'express';
import BadRequestError from './BadRequestError';

export const checkErrorAndNext = (err: Error, entity: string, next: NextFunction) => {
    if ((err as DatabaseError).code === '23505') {
        next(new ValidationError(`${entity} already exists`));
    } else {
        next(new BadRequestError((err as Error).message));
    }
};
