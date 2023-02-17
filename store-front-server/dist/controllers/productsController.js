"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.create = exports.index = void 0;
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
const index = async (req, res) => {
    try {
        const products = await store.index();
        return res.status(200).json(products);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.index = index;
const create = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category.toLowerCase(),
    };
    try {
        const newProduct = await store.create(product);
        return res.status(200).json(newProduct);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.create = create;
const show = async (req, res) => {
    try {
        const product = await store.show(parseInt(req.params.id));
        return res.status(200).json(product);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.show = show;
