"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.show = exports.create = exports.index = void 0;
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = async (req, res) => {
    try {
        const order = await store.index();
        return res.status(200).json(order);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.index = index;
const create = async (req, res) => {
    const order = {
        user_id: req.body.user_id,
        status: req.body.status,
    };
    try {
        const newOrder = await store.create(order);
        return res.status(200).json(newOrder);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.create = create;
const show = async (req, res) => {
    try {
        const order = await store.show(parseInt(req.params.id));
        return res.status(200).json(order);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.show = show;
const addProduct = async (req, res) => {
    const order_id = parseInt(req.params.id);
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    try {
        const newProduct = await store.addProduct(quantity, order_id, product_id);
        return res.status(200).json(newProduct);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.addProduct = addProduct;
