"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const verifyToken_1 = require("../middlewares/verifyToken");
require("express-async-errors");
const ordersRoute = express_1.default.Router();
ordersRoute.get('/', verifyToken_1.verifyToken, OrderController_1.default.index);
ordersRoute.get('/:id', verifyToken_1.verifyToken, OrderController_1.default.show);
ordersRoute.post('/', verifyToken_1.verifyToken, OrderController_1.default.create);
ordersRoute.patch('/:id', verifyToken_1.verifyToken, OrderController_1.default.update);
ordersRoute.delete('/:id', verifyToken_1.verifyToken, OrderController_1.default.delete);
ordersRoute.post('/:id/products', verifyToken_1.verifyToken, OrderController_1.default.addProduct);
exports.default = ordersRoute;
