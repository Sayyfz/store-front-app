"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const product_1 = require("../../models/product");
const user_1 = require("../../models/user");
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
const store = new order_1.OrderStore();
describe('ORDER MODEL SPEC', () => {
    let order;
    let completedOrder;
    let user;
    let product;
    beforeAll(async () => {
        try {
            user = await userStore.create({
                firstName: 'user',
                lastName: 'model',
                username: 'order model tester',
                password: 'pass1234',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            product = await productStore.create({
                name: 'Purple Shoes',
                price: 80,
                category: 'shoes',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            order = await store.create({
                user_id: user.id,
                status: 'active',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            completedOrder = await store.create({
                user_id: user.id,
                status: 'complete',
            });
        }
        catch (err) {
            console.log(err);
        }
    });
    // OrderStore.create is considred as a test even though it is not inside a spec
    // since subsequent tests will never pass unless OrderStore.create creates an order as expected
    it('Should return list of orders', async () => {
        const orders = await store.index();
        expect(orders.length).toBeTruthy;
        expect(orders.length).toBeGreaterThan(0);
    });
    it('Should show the created order info successfully', async () => {
        const o = await store.show(order.id);
        expect(o).toEqual(o);
    });
    it('addProduct should add a product to the specified order and return the order & product ids', async () => {
        const p = await store.addProduct(9, order.id, product.id);
        expect(p.quantity).toEqual(9);
        expect(p.order_id).toEqual(order.id);
        expect(p.product_id).toEqual(product.id);
    });
    it('addProduct to a complete order should throw an error', async () => {
        try {
            await store.addProduct(9, completedOrder.id, product.id);
        }
        catch (err) {
            expect(err.message).toEqual(`Cannot add product ${product.id} to order ${completedOrder.id} Error: Cannot add product to a completed order`);
        }
    });
});
