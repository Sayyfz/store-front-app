"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const verifyToken_1 = require("../middlewares/verifyToken");
require("express-async-errors");
const productsRoute = express_1.default.Router();
productsRoute.get('/', ProductController_1.default.index);
productsRoute.get('/:id', ProductController_1.default.show);
productsRoute.post('/', verifyToken_1.verifyToken, ProductController_1.default.create);
productsRoute.delete('/:id', verifyToken_1.verifyToken, ProductController_1.default.delete);
productsRoute.patch('/:id', verifyToken_1.verifyToken, ProductController_1.default.update);
exports.default = productsRoute;
