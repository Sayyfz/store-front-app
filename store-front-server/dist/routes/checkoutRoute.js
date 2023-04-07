"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CheckoutController_1 = __importDefault(require("../controllers/CheckoutController"));
const verifyToken_1 = require("../middlewares/verifyToken");
require("express-async-errors");
const checkoutRoute = express_1.default.Router();
checkoutRoute.post('/', verifyToken_1.verifyToken, CheckoutController_1.default.create);
exports.default = checkoutRoute;
