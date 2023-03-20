"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DashboardRepository_1 = __importDefault(require("../../repositories/DashboardRepository"));
const OrderRepository_1 = __importDefault(require("../../repositories/OrderRepository"));
const ProductRepository_1 = __importDefault(require("../../repositories/ProductRepository"));
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
describe('DASHBOARD MODEL SPEC', () => {
    let user;
    beforeAll(async () => {
        try {
            user = await UserRepository_1.default.create({
                firstName: 'user',
                lastName: 'model',
                username: 'dashboard model tester',
                password: 'pass1234',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            await ProductRepository_1.default.create({
                name: 'Yellow Shoes',
                price: 80,
                category: 'shoes',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            await ProductRepository_1.default.create({
                name: 'Hp Laptop',
                price: 80,
                category: 'tech',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            await OrderRepository_1.default.create({
                user_id: user.id?.toString() || '',
                status: 'active',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            await OrderRepository_1.default.create({
                user_id: user.id?.toString() || '',
                status: 'complete',
            });
        }
        catch (err) {
            console.log(err);
        }
    });
    it('Should show a list of completed orders by user', async () => {
        const orders = await DashboardRepository_1.default.completed_orders_by_user(user.id);
        for (const o of orders) {
            expect(o.status).toEqual('complete');
        }
        expect(orders.length).toBeGreaterThan(0);
    });
    it('Should show a list of active orders by user', async () => {
        const orders = await DashboardRepository_1.default.current_orders_by_user(user.id);
        for (const o of orders) {
            expect(o.status).toEqual('active');
        }
        expect(orders.length).toBeGreaterThan(0);
    });
    it('Should show the created product info successfully', async () => {
        const products = await DashboardRepository_1.default.products_by_category('shoes');
        for (const p of products) {
            expect(p.category).toEqual('shoes');
        }
        expect(products.length).toBeGreaterThan(0);
    });
});
