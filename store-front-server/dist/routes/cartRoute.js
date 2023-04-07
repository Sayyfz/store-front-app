"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CartController_1 = __importDefault(require("../controllers/CartController"));
const verifyToken_1 = require("../middlewares/verifyToken");
require("express-async-errors");
const cartRoute = express_1.default.Router();
cartRoute.get('/', CartController_1.default.index);
cartRoute.get('/:id', CartController_1.default.show);
cartRoute.post('/', CartController_1.default.create);
cartRoute.patch('/:id', verifyToken_1.verifyToken, CartController_1.default.update);
cartRoute.delete('/:id', verifyToken_1.verifyToken, CartController_1.default.delete);
cartRoute.post('/:id/products', verifyToken_1.verifyToken, CartController_1.default.addProductToCart);
cartRoute.delete('/:id/products/:product_id', verifyToken_1.verifyToken, CartController_1.default.deleteProductFromCart);
exports.default = cartRoute;
