import { DatabaseError } from 'pg-protocol';
import ValidationError from './ValidationError';
import { NextFunction } from 'express';

export const checkErrorAndNext = (err: Error, entity: string, next: NextFunction) => {
    if ((err as DatabaseError).code === '23505') {
        next(new ValidationError(`${entity} already exists`));
    }
};
