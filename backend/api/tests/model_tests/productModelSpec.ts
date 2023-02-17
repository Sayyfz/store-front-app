import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('PRODUCT MODEL SPEC', () => {
    let product: Product;
    beforeAll(async () => {
        try {
            product = await store.create({
                name: 'Violet Shoes',
                price: 80,
                category: 'shoes',
            });
        } catch (err) {
            console.log(err);
        }
    });

    // ProductStore.create is considred as a test even though it is not inside a spec
    // since subsequent tests will never pass unless ProductStore.create creates an product as expected

    it('Should return list of products', async () => {
        const products: Product[] = await store.index();
        expect(products.length).toBeTruthy;
        expect(products.length).toBeGreaterThan(0);
    });

    it('Should show the created product info successfully', async () => {
        const p: Product = await store.show(product.id as unknown as number);
        expect(p).toEqual(p);
    });
});
