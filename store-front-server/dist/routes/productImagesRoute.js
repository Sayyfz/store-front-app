"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductImagesController_1 = __importDefault(require("../controllers/ProductImagesController"));
require("express-async-errors");
const multer_1 = __importDefault(require("../middlewares/multer"));
const productImagesRoute = express_1.default.Router();
productImagesRoute.get('/', ProductImagesController_1.default.index);
productImagesRoute.get('/:id', ProductImagesController_1.default.show);
productImagesRoute.post('/', multer_1.default.single('image'), ProductImagesController_1.default.create);
productImagesRoute.delete('/:id', ProductImagesController_1.default.delete);
productImagesRoute.patch('/:id', multer_1.default.single('image'), ProductImagesController_1.default.update);
exports.default = productImagesRoute;
