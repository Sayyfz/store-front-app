import { QueryResult } from 'pg';

export const throwErrorOnNotFound = (result: QueryResult<any>, entity: string): void => {
    if (!result.rows.length) {
        throw `Cannot find ${entity}`;
    }
};
