"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartRepository_1 = __importDefault(require("../repositories/CartRepository"));
const Helpers_1 = require("../utils/Helpers");
class CartController {
    constructor(repository) {
        this.index = async (req, res, next) => {
            const categories = await this.repository.index();
            return res.status(200).json(categories);
        };
        this.show = async (req, res, next) => {
            const cart = await this.repository.show(req.params.id);
            return res.status(200).json(cart);
        };
        this.create = async (req, res, next) => {
            try {
                const newCart = req.body;
                const cart = await this.repository.create(newCart);
                return res.status(201).json(cart);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'Cart', next);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const newCart = req.body;
                const cart = await this.repository.update(req.params.id, newCart);
                return res.status(200).json(cart);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'Cart', next);
            }
        };
        this.delete = async (req, res, next) => {
            const deletedCart = await this.repository.delete(req.params.id);
            return res.status(200).json(deletedCart);
        };
        this.addProductToCart = async (req, res, next) => {
            try {
                const relation = await this.repository.addProduct(req.body.quantity, req.params.id, req.body.product_id);
                return res.status(200).json(relation);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'Product in cart', next);
            }
        };
        this.deleteProductFromCart = async (req, res, next) => {
            const deletedRelation = await this.repository.delete_item_from_cart(+req.params.id, +req.params.product_id);
            return res.status(200).json(deletedRelation);
        };
        this.repository = repository;
    }
}
exports.default = new CartController(CartRepository_1.default);
