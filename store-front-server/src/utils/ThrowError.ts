import { QueryResult } from 'pg';
import BadRequestError from './BadRequestError';
import NotFoundError from './NotFoundError';
import ValidationError from './ValidationError';

export const throwErrorOnNotFound = (
    result?: QueryResult<any>,
    entity?: string,
    message?: string,
): void => {
    if (!result?.rows?.length) {
        const msg = message ?? `Cannot find ${entity}`;
        throw new NotFoundError(msg);
    }
};

export const throwBadRequestError = (message: string): void => {
    throw new BadRequestError(message);
};

export const throwValidationError = (message: string, property?: string): void => {
    throw new ValidationError(message, property);
};
