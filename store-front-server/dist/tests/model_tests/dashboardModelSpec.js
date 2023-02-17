"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const product_1 = require("../../models/product");
const dashboard_1 = require("../../models/services/dashboard");
const user_1 = require("../../models/user");
const dashboard = new dashboard_1.DatabaseQueries();
const productStore = new product_1.ProductStore();
const orderStore = new order_1.OrderStore();
const userStore = new user_1.UserStore();
describe('DASHBOARD MODEL SPEC', () => {
    let user;
    beforeAll(async () => {
        try {
            user = await userStore.create({
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
            await productStore.create({
                name: 'Yellow Shoes',
                price: 80,
                category: 'shoes',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            await productStore.create({
                name: 'Hp Laptop',
                price: 80,
                category: 'tech',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            await orderStore.create({
                user_id: user.id,
                status: 'active',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            await orderStore.create({
                user_id: user.id,
                status: 'complete',
            });
        }
        catch (err) {
            console.log(err);
        }
    });
    it('Should show a list of completed orders by user', async () => {
        const orders = await dashboard.completed_orders_by_user(user.id);
        for (const o of orders) {
            expect(o.status).toEqual('complete');
        }
        expect(orders.length).toBeGreaterThan(0);
    });
    it('Should show a list of active orders by user', async () => {
        const orders = await dashboard.current_orders_by_user(user.id);
        for (const o of orders) {
            expect(o.status).toEqual('active');
        }
        expect(orders.length).toBeGreaterThan(0);
    });
    it('Should show the created product info successfully', async () => {
        const products = await dashboard.products_by_category('shoes');
        for (const p of products) {
            expect(p.category).toEqual('shoes');
        }
        expect(products.length).toBeGreaterThan(0);
    });
});
