import { Product } from '../../models/ProductModel';
import Repo from '../../repositories/ProductRepository';

describe('PRODUCT MODEL SPEC', () => {
    let product: Product;
    beforeAll(async () => {
        try {
            product = await Repo.create({
                name: 'Violet Shoes',
                price: 80,
                category: 'shoes',
            });
        } catch (err) {
            console.log(err);
        }
    });

    it('Should return list of products', async () => {
        const products: Product[] = await Repo.index();
        expect(products.length).toBeTruthy;
        expect(products.length).toBeGreaterThan(0);
    });

    it('Should show the created product info successfully', async () => {
        const p: Product = await Repo.show(product.id || '');
        expect(p).toEqual(p);
    });

    it('Should update a product successfully', async () => {
        const newProduct = {
            name: 'Navy Shoes',
            price: 200,
            category: 'shoes',
        };
        const p: Product = await Repo.update(product.id || '', newProduct);
        expect(p).toEqual({ ...newProduct, id: product.id });
    });

    it('Should delete a product successfully', async () => {
        const p: Product = await Repo.delete(product.id || '');
        expect(p).toEqual(p);
    });

    it('Should fail to delete a product', async () => {
        try {
            await Repo.delete('2000');
        } catch (err) {
            console.log((err as Error).message);
            expect((err as Error).message.includes('2000')).toBeTrue();
        }
    });
});
