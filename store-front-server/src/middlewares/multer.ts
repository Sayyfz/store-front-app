import multer from 'multer';
import path from 'path';
import { productsPath } from '../constants/constants';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, productsPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

export default upload;