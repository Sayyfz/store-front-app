"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardRoute_1 = __importDefault(require("./dashboardRoute"));
const ordersRoute_1 = __importDefault(require("./ordersRoute"));
const productsRoute_1 = __importDefault(require("./productsRoute"));
const usersRoute_1 = __importDefault(require("./usersRoute"));
const indexRoute = express_1.default.Router();
indexRoute.get('/', function (req, res) {
    res.send('Welcome, you can check for the endpoints in the README.md file');
});
indexRoute.use('/users', usersRoute_1.default);
indexRoute.use('/products', productsRoute_1.default);
indexRoute.use('/orders', ordersRoute_1.default);
indexRoute.use('/services', dashboardRoute_1.default);
exports.default = indexRoute;
