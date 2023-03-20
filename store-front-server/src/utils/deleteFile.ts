import fs from 'fs';
import NotFoundError from './NotFoundError';

export const deleteFile = (filePath: string): void => {
    if (!fs.existsSync(filePath)) {
        console.log(filePath);
        throw new NotFoundError('Product not found');
    }

    fs.unlink(filePath, err => {
        if (err) {
            throw err;
        }
    });
};
