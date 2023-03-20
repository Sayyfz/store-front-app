"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderRepository_1 = __importDefault(require("../../repositories/OrderRepository"));
const ProductRepository_1 = __importDefault(require("../../repositories/ProductRepository"));
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
describe('ORDER MODEL SPEC', () => {
    let order;
    let completedOrder;
    let user;
    let product;
    beforeAll(async () => {
        try {
            user = await UserRepository_1.default.create({
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
            product = await ProductRepository_1.default.create({
                name: 'Purple Shoes',
                price: 80,
                category: 'shoes',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            order = await OrderRepository_1.default.create({
                user_id: user.id?.toString() || '',
                status: 'active',
            });
        }
        catch (err) {
            console.log(err);
        }
        try {
            completedOrder = await OrderRepository_1.default.create({
                user_id: user?.id?.toString() || '',
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
        const orders = await OrderRepository_1.default.index();
        expect(orders.length).toBeTruthy;
        expect(orders.length).toBeGreaterThan(0);
    });
    it('Should show the created order info successfully', async () => {
        const o = await OrderRepository_1.default.show(order.id?.toString() || '');
        expect(o).toEqual(o);
    });
    it('addProduct should add a product to the specified order and return the order & product ids', async () => {
        const p = await OrderRepository_1.default.addProduct(9, order.id?.toString() || '', product.id?.toString() || '');
        expect(p.quantity).toEqual(9);
        expect(p.order_id).toEqual(order.id?.toString() || '');
        expect(p.product_id).toEqual(product.id?.toString() || '');
    });
    it('addProduct to a complete order should throw an error', async () => {
        try {
            await OrderRepository_1.default.addProduct(9, completedOrder.id?.toString() || '', product.id?.toString() || '');
        }
        catch (err) {
            expect(err.message).toEqual(`Cannot add product ${product.id} to order ${completedOrder.id} since it is a completed order`);
        }
    });
});
