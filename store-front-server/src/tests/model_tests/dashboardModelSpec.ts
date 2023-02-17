import { Order, OrderStore } from '../../models/OrderModel';
import { Product, ProductStore } from '../../models/product';
import { DatabaseQueries } from '../../models/services/dashboard';
import { User, UserStore } from '../../models/UserModel';

const dashboard = new DatabaseQueries();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const userStore = new UserStore();

describe('DASHBOARD MODEL SPEC', () => {
    let user: User;
    beforeAll(async () => {
        try {
            user = await userStore.create({
                firstName: 'user',
                lastName: 'model',
                username: 'dashboard model tester',
                password: 'pass1234',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            await productStore.create({
                name: 'Yellow Shoes',
                price: 80,
                category: 'shoes',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            await productStore.create({
                name: 'Hp Laptop',
                price: 80,
                category: 'tech',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            await orderStore.create({
                user_id: user.id as unknown as number,
                status: 'active',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            await orderStore.create({
                user_id: user.id as unknown as number,
                status: 'complete',
            });
        } catch (err) {
            console.log(err);
        }
    });

    it('Should show a list of completed orders by user', async () => {
        const orders: Order[] = await dashboard.completed_orders_by_user(
            user.id as unknown as number,
        );

        for (const o of orders) {
            expect(o.status).toEqual('complete');
        }
        expect(orders.length).toBeGreaterThan(0);
    });

    it('Should show a list of active orders by user', async () => {
        const orders: Order[] = await dashboard.current_orders_by_user(
            user.id as unknown as number,
        );

        for (const o of orders) {
            expect(o.status).toEqual('active');
        }
        expect(orders.length).toBeGreaterThan(0);
    });

    it('Should show the created product info successfully', async () => {
        const products: Product[] = await dashboard.products_by_category('shoes');
        for (const p of products) {
            expect(p.category).toEqual('shoes');
        }
        expect(products.length).toBeGreaterThan(0);
    });
});
