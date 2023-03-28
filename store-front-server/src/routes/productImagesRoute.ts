import express from 'express';
import Controller from '../controllers/ProductImagesController';
import 'express-async-errors';
import upload from '../middlewares/multer';

const productImagesRoute = express.Router();

productImagesRoute.get('/', Controller.index);
productImagesRoute.get('/:id', Controller.show);
productImagesRoute.post('/', upload.single('image'), Controller.create);
productImagesRoute.delete('/:id', Controller.delete);
productImagesRoute.patch('/:id', upload.single('image'), Controller.update);

export default productImagesRoute;
