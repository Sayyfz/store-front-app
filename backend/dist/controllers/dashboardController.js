"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products_by_category = exports.completed_orders_by_user = exports.current_orders_by_user = void 0;
const dashboard_1 = require("../models/services/dashboard");
const dashboard = new dashboard_1.DatabaseQueries();
const current_orders_by_user = async (req, res) => {
    try {
        const orders = await dashboard.current_orders_by_user(parseInt(req.params.id));
        return res.status(200).json(orders);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.current_orders_by_user = current_orders_by_user;
const completed_orders_by_user = async (req, res) => {
    try {
        const orders = await dashboard.completed_orders_by_user(parseInt(req.params.id));
        return res.status(200).json(orders);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.completed_orders_by_user = completed_orders_by_user;
const products_by_category = async (req, res) => {
    try {
        if (!req.params.category)
            throw 'Please add a valid category';
        const products = await dashboard.products_by_category(req.params.category.toLowerCase());
        return res.status(200).json(products);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.products_by_category = products_by_category;
