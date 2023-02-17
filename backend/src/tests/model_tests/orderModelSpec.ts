import { Order, OrderStore } from '../../models/order';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';

const userStore = new UserStore();
const productStore = new ProductStore();
const store = new OrderStore();

describe('ORDER MODEL SPEC', () => {
    let order: Order;
    let completedOrder: Order;
    let user: User;
    let product: Product;
    beforeAll(async () => {
        try {
            user = await userStore.create({
                firstName: 'user',
                lastName: 'model',
                username: 'order model tester',
                password: 'pass1234',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            product = await productStore.create({
                name: 'Purple Shoes',
                price: 80,
                category: 'shoes',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            order = await store.create({
                user_id: user.id as unknown as number,
                status: 'active',
            });
        } catch (err) {
            console.log(err);
        }

        try {
            completedOrder = await store.create({
                user_id: user.id as unknown as number,
                status: 'complete',
            });
        } catch (err) {
            console.log(err);
        }
    });

    // OrderStore.create is considred as a test even though it is not inside a spec
    // since subsequent tests will never pass unless OrderStore.create creates an order as expected

    it('Should return list of orders', async () => {
        const orders: Order[] = await store.index();
        expect(orders.length).toBeTruthy;
        expect(orders.length).toBeGreaterThan(0);
    });

    it('Should show the created order info successfully', async () => {
        const o: Order = await store.show(order.id as unknown as number);
        expect(o).toEqual(o);
    });

    it('addProduct should add a product to the specified order and return the order & product ids', async () => {
        const p = await store.addProduct(
            9,
            order.id as unknown as number,
            product.id as unknown as number,
        );
        expect(p.quantity).toEqual(9);
        expect(p.order_id).toEqual(order.id as unknown as number);
        expect(p.product_id).toEqual(product.id as unknown as number);
    });

    it('addProduct to a complete order should throw an error', async () => {
        try {
            await store.addProduct(
                9,
                completedOrder.id as unknown as number,
                product.id as unknown as number,
            );
        } catch (err) {
            expect((err as Error).message).toEqual(
                `Cannot add product ${product.id} to order ${completedOrder.id} Error: Cannot add product to a completed order`,
            );
        }
    });
});
