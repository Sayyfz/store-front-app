"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartRoute_1 = __importDefault(require("./cartRoute"));
const categoriesRoute_1 = __importDefault(require("./categoriesRoute"));
const checkoutRoute_1 = __importDefault(require("./checkoutRoute"));
const dashboardRoute_1 = __importDefault(require("./dashboardRoute"));
const productImagesRoute_1 = __importDefault(require("./productImagesRoute"));
const productsRoute_1 = __importDefault(require("./productsRoute"));
const usersRoute_1 = __importDefault(require("./usersRoute"));
const indexRoute = express_1.default.Router();
indexRoute.get('/', function (req, res) {
    res.send('Welcome, you can check for the endpoints in the README.md file');
});
indexRoute.use('/users', usersRoute_1.default);
indexRoute.use('/products', productsRoute_1.default);
indexRoute.use('/categories', categoriesRoute_1.default);
indexRoute.use('/carts', cartRoute_1.default);
indexRoute.use('/product-images', productImagesRoute_1.default);
indexRoute.use('/checkout', checkoutRoute_1.default);
indexRoute.use('/services', dashboardRoute_1.default);
exports.default = indexRoute;
