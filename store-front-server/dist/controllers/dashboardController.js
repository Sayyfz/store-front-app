"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DashboardRepository_1 = __importDefault(require("../repositories/DashboardRepository"));
class DashboardController {
    constructor(repository) {
        this.products_by_category = async (req, res) => {
            if (!req.params.categoryId)
                throw 'Please add a valid categoryId';
            const products = await this.repository.products_by_category(+req.params.categoryId);
            return res.status(200).json(products);
        };
        this.products_search = async (req, res) => {
            const { name } = req.query;
            const products = await this.repository.products_search(name);
            return res.status(200).json(products);
        };
        this.repository = repository;
    }
}
exports.default = new DashboardController(DashboardRepository_1.default);
