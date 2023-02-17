"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersController_1 = require("../controllers/ordersController");
const verifyToken_1 = require("../middlewares/verifyToken");
const ordersRoute = express_1.default.Router();
ordersRoute.get('/', verifyToken_1.verifyToken, ordersController_1.index);
ordersRoute.get('/:id', verifyToken_1.verifyToken, ordersController_1.show);
ordersRoute.post('/', verifyToken_1.verifyToken, ordersController_1.create);
ordersRoute.post('/:id/products', verifyToken_1.verifyToken, ordersController_1.addProduct);
exports.default = ordersRoute;
