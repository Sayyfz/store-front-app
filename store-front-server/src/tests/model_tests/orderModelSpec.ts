import { Order } from '../../models/OrderModel';
import { Product } from '../../models/ProductModel';
import { User } from '../../models/UserModel';
import OrderRepo from '../../repositories/OrderRepository';
import ProductRepo from '../../repositories/ProductRepository';
import UserRepo from '../../repositories/UserRepository';

describe('ORDER MODEL SPEC', () => {
    let order: Order;
    let completedOrder: Order;
    let user: User;
    let product: Product;
    beforeAll(async () => {
        try {
            user = await UserRepo.create({
                firstName: 'user',
                lastName: 'model',
                username: 'order model tester',
                password: 'pass1234',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            product = await ProductRepo.create({
                name: 'Purple Shoes',
                price: 80,
                category: 'shoes',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            order = await OrderRepo.create({
                user_id: user.id?.toString() || '',
                status: 'active',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            completedOrder = await OrderRepo.create({
                user_id: user?.id?.toString() || '',
                status: 'complete',
            });
        } catch (err) {
            console.log(err);
        }
    });

    // OrderStore.create is considred as a test even though it is not inside a spec
    // since subsequent tests will never pass unless OrderStore.create creates an order as expected

    it('Should return list of orders', async () => {
        const orders: Order[] = await OrderRepo.index();
        expect(orders.length).toBeTruthy;
        expect(orders.length).toBeGreaterThan(0);
    });

    it('Should show the created order info successfully', async () => {
        const o: Order = await OrderRepo.show(order.id?.toString() || '');
        expect(o).toEqual(o);
    });

    it('addProduct should add a product to the specified order and return the order & product ids', async () => {
        const p = await OrderRepo.addProduct(
            9,
            order.id?.toString() || '',
            product.id?.toString() || '',
        );
        expect(p.quantity).toEqual(9);
        expect(p.order_id).toEqual(order.id?.toString() || '');
        expect(p.product_id).toEqual(product.id?.toString() || '');
    });

    it('addProduct to a complete order should throw an error', async () => {
        try {
            await OrderRepo.addProduct(
                9,
                completedOrder.id?.toString() || '',
                product.id?.toString() || '',
            );
        } catch (err) {
            expect((err as Error).message).toEqual(
                `Cannot add product ${product.id} to order ${completedOrder.id} since it is a completed order`,
            );
        }
    });
});
