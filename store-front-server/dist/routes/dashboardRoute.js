"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardController_1 = __importDefault(require("../controllers/dashboardController"));
const verifyToken_1 = require("../middlewares/verifyToken");
const dashboardRoutes = express_1.default.Router();
dashboardRoutes.get('/current_orders_by_user/:id', verifyToken_1.verifyToken, dashboardController_1.default.current_orders_by_user);
dashboardRoutes.get('/completed_orders_by_user/:id', verifyToken_1.verifyToken, dashboardController_1.default.completed_orders_by_user);
dashboardRoutes.get('/products_by_category/:category', dashboardController_1.default.products_by_category);
exports.default = dashboardRoutes;
