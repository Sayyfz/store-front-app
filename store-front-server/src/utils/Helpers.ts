import { DatabaseError } from 'pg-protocol';
import ValidationError from './ValidationError';
import { NextFunction } from 'express';
import BadRequestError from './BadRequestError';
import { QueryResult } from 'pg';

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

export const reformatProducts = (rows: any[]) => {
    const products: { [key: string]: unknown } = {};

    rows.forEach(row => {
        const { id, name, price, category_id, image_id, image_url } = row;
        if (!products[id]) {
            products[id] = {
                id,
                name,
                price,
                category_id,
                images: [],
            };
        }
        if (image_id) {
            //@ts-ignore
            products[id].images.push({ id: image_id, imageUrl: image_url });
        }
    });
    return Object.values(products);
};
