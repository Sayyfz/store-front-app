"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const verifyToken_1 = require("../middlewares/verifyToken");
require("express-async-errors");
const categoryRoute = express_1.default.Router();
categoryRoute.get('/', CategoryController_1.default.index);
categoryRoute.get('/:id', CategoryController_1.default.show);
categoryRoute.post('/', CategoryController_1.default.create);
categoryRoute.patch('/:id', verifyToken_1.verifyToken, CategoryController_1.default.update);
categoryRoute.delete('/:id', verifyToken_1.verifyToken, CategoryController_1.default.delete);
exports.default = categoryRoute;
