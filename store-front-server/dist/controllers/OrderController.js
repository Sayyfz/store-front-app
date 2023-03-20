"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderRepository_1 = __importDefault(require("../repositories/OrderRepository"));
const Helpers_1 = require("../utils/Helpers");
class OrdersController {
    constructor(repository) {
        this.index = async (req, res, next) => {
            const order = await this.repository.index();
            return res.status(200).json(order);
        };
        this.show = async (req, res, next) => {
            const order = await this.repository.show(req.params.id);
            return res.status(200).json(order);
        };
        this.create = async (req, res, next) => {
            const order = {
                user_id: req.body.user_id,
                status: req.body.status,
            };
            try {
                const newOrder = await this.repository.create(order);
                return res.status(201).json(newOrder);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'order', next);
            }
        };
        this.delete = async (req, res, next) => {
            const deletedOrder = await this.repository.delete(req.params.id);
            return res.status(200).json(deletedOrder);
        };
        this.update = async (req, res, next) => {
            try {
                const order = {
                    user_id: req.body.user_id,
                    status: req.body.status,
                };
                const updatedOrder = await this.repository.update(req.params.id, order);
                return res.status(200).json(updatedOrder);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'order', next);
            }
        };
        this.addProduct = async (req, res, next) => {
            try {
                const order_id = req.params.id;
                const product_id = req.body.product_id;
                const quantity = req.body.quantity;
                const newProduct = await this.repository.addProduct(quantity, order_id, product_id);
                return res.status(200).json(newProduct);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'product', next);
            }
        };
        this.repository = repository;
    }
}
exports.default = new OrdersController(OrderRepository_1.default);
