"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DashboardRepository_1 = __importDefault(require("../repositories/DashboardRepository"));
class DashboardController {
    constructor(repository) {
        this.current_orders_by_user = async (req, res) => {
            try {
                const orders = await this.repository.current_orders_by_user(parseInt(req.params.id));
                return res.status(200).json(orders);
            }
            catch (err) {
                return res.status(400).json(err.message);
            }
        };
        this.completed_orders_by_user = async (req, res) => {
            try {
                const orders = await this.repository.completed_orders_by_user(parseInt(req.params.id));
                return res.status(200).json(orders);
            }
            catch (err) {
                return res.status(400).json(err.message);
            }
        };
        this.products_by_category = async (req, res) => {
            try {
                if (!req.params.category)
                    throw 'Please add a valid category';
                const products = await this.repository.products_by_category(req.params.category.toLowerCase());
                return res.status(200).json(products);
            }
            catch (err) {
                return res.status(400).json(err.message);
            }
        };
        this.repository = repository;
    }
}
exports.default = new DashboardController(DashboardRepository_1.default);
