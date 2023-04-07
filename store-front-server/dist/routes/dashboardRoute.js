"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardController_1 = __importDefault(require("../controllers/dashboardController"));
require("express-async-errors");
const dashboardRoutes = express_1.default.Router();
dashboardRoutes.get('/products_by_category/:categoryId', dashboardController_1.default.products_by_category);
dashboardRoutes.get('/products_search', dashboardController_1.default.products_search);
exports.default = dashboardRoutes;
