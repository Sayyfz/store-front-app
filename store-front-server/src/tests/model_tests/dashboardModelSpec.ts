import { Order } from '../../models/OrderModel';
import { Product } from '../../models/ProductModel';
import DashboardRepository, { DatabaseQueries } from '../../repositories/DashboardRepository';
import { User } from '../../models/UserModel';
import OrderRepository from '../../repositories/OrderRepository';
import ProductRepository from '../../repositories/ProductRepository';
import UserRepository from '../../repositories/UserRepository';

describe('DASHBOARD MODEL SPEC', () => {
    let user: User;
    beforeAll(async () => {
        try {
            user = await UserRepository.create({
                firstName: 'user',
                lastName: 'model',
                username: 'dashboard model tester',
                password: 'pass1234',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            await ProductRepository.create({
                name: 'Yellow Shoes',
                price: 80,
                category: 'shoes',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            await ProductRepository.create({
                name: 'Hp Laptop',
                price: 80,
                category: 'tech',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            await OrderRepository.create({
                user_id: user.id?.toString() || '',
                status: 'active',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            await OrderRepository.create({
                user_id: user.id?.toString() || '',
                status: 'complete',
            });
        } catch (err) {
            console.log(err);
        }
    });

    it('Should show a list of completed orders by user', async () => {
        const orders: Order[] = await DashboardRepository.completed_orders_by_user(
            user.id as unknown as number,
        );

        for (const o of orders) {
            expect(o.status).toEqual('complete');
        }
        expect(orders.length).toBeGreaterThan(0);
    });

    it('Should show a list of active orders by user', async () => {
        const orders: Order[] = await DashboardRepository.current_orders_by_user(
            user.id as unknown as number,
        );

        for (const o of orders) {
            expect(o.status).toEqual('active');
        }
        expect(orders.length).toBeGreaterThan(0);
    });

    it('Should show the created product info successfully', async () => {
        const products: Product[] = await DashboardRepository.products_by_category('shoes');
        for (const p of products) {
            expect(p.category).toEqual('shoes');
        }
        expect(products.length).toBeGreaterThan(0);
    });
});
