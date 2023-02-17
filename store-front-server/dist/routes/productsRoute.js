"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
const verifyToken_1 = require("../middlewares/verifyToken");
const productsRoute = express_1.default.Router();
productsRoute.get('/', productsController_1.index);
productsRoute.get('/:id', productsController_1.show);
productsRoute.post('/', verifyToken_1.verifyToken, productsController_1.create);
exports.default = productsRoute;
