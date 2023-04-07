"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryRepository_1 = __importDefault(require("../repositories/CategoryRepository"));
const Helpers_1 = require("../utils/Helpers");
class CategoryController {
    constructor(repository) {
        this.index = async (req, res, next) => {
            const categories = await this.repository.index();
            return res.status(200).json(categories);
        };
        this.show = async (req, res, next) => {
            const category = await this.repository.show(req.params.id);
            return res.status(200).json(category);
        };
        this.create = async (req, res, next) => {
            try {
                const newCategory = req.body;
                const category = await this.repository.create(newCategory);
                return res.status(201).json(category);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'category', next);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const newCategory = req.body;
                const category = await this.repository.update(req.params.id, newCategory);
                return res.status(200).json(category);
            }
            catch (error) {
                (0, Helpers_1.checkErrorAndNext)(error, 'category', next);
            }
        };
        this.delete = async (req, res, next) => {
            const deletedCat = await this.repository.delete(req.params.id);
            return res.status(200).json(deletedCat);
        };
        this.repository = repository;
    }
}
exports.default = new CategoryController(CategoryRepository_1.default);
