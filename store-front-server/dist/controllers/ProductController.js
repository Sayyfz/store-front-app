"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRepository_1 = __importDefault(require("../repositories/ProductRepository"));
const Helpers_1 = require("../utils/Helpers");
class ProductController {
    constructor(repository) {
        this.index = async (req, res, next) => {
            const products = await this.repository.index();
            return res.status(200).json(products);
        };
        this.show = async (req, res, next) => {
            const product = await this.repository.show(req.params.id);
            return res.status(200).json(product);
        };
        this.create = async (req, res, next) => {
            try {
                const product = {
                    name: req.body.name,
                    price: req.body.price,
                    category_id: req.body.category_id,
                };
                const newProduct = await this.repository.create(product);
                return res.status(201).json(newProduct);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'Product', next);
            }
        };
        this.delete = async (req, res, next) => {
            const product = await this.repository.delete(req.params.id);
            return res.status(200).json(product);
        };
        this.update = async (req, res, next) => {
            try {
                const product = {
                    name: req.body.name,
                    price: req.body.price,
                    category_id: req.body.category_id,
                };
                const newProduct = await this.repository.update(req.params.id, product);
                return res.status(200).json(newProduct);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'Product', next);
            }
        };
        this.repository = repository;
    }
}
exports.default = new ProductController(ProductRepository_1.default);
