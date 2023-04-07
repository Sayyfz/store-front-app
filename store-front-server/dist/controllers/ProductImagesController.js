"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductImageRepository_1 = __importDefault(require("../repositories/ProductImageRepository"));
const Helpers_1 = require("../utils/Helpers");
const ThrowError_1 = require("../utils/ThrowError");
class ProductImageController {
    constructor(repository) {
        this.index = async (req, res, next) => {
            const productImg = await this.repository.index();
            return res.status(200).json(productImg);
        };
        this.show = async (req, res, next) => {
            const productImg = await this.repository.show(req.params.id);
            return res.status(200).json(productImg);
        };
        this.create = async (req, res, next) => {
            if (!req.file) {
                (0, ThrowError_1.throwValidationError)('Please upload a product image to proceed');
            }
            const productImg = {
                image_url: req.file?.filename,
                product_id: req.body.product_id,
            };
            try {
                const newImg = await this.repository.create(productImg);
                return res.status(201).json(newImg);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'Product Image', next);
            }
        };
        this.delete = async (req, res, next) => {
            const deletedImg = await this.repository.delete(req.params.id);
            return res.status(200).json(deletedImg);
        };
        this.update = async (req, res, next) => {
            if (!req.file) {
                (0, ThrowError_1.throwValidationError)('Please upload a product image to proceed');
            }
            try {
                const productImg = {
                    image_url: req.file?.filename,
                    product_id: req.body.product_id,
                };
                const updatedImg = await this.repository.update(req.params.id, productImg);
                return res.status(200).json(updatedImg);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'Product Image', next);
            }
        };
        this.repository = repository;
    }
}
exports.default = new ProductImageController(ProductImageRepository_1.default);
