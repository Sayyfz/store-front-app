"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRepository_1 = __importDefault(require("../../repositories/ProductRepository"));
describe('PRODUCT MODEL SPEC', () => {
    let product;
    beforeAll(async () => {
        try {
            product = await ProductRepository_1.default.create({
                name: 'Violet Shoes',
                price: 80,
                category: 'shoes',
            });
        }
        catch (err) {
            console.log(err);
        }
    });
    it('Should return list of products', async () => {
        const products = await ProductRepository_1.default.index();
        expect(products.length).toBeTruthy;
        expect(products.length).toBeGreaterThan(0);
    });
    it('Should show the created product info successfully', async () => {
        const p = await ProductRepository_1.default.show(product.id || '');
        expect(p).toEqual(p);
    });
    it('Should update a product successfully', async () => {
        const newProduct = {
            name: 'Navy Shoes',
            price: 200,
            category: 'shoes',
        };
        const p = await ProductRepository_1.default.update(product.id || '', newProduct);
        expect(p).toEqual({ ...newProduct, id: product.id });
    });
    it('Should delete a product successfully', async () => {
        const p = await ProductRepository_1.default.delete(product.id || '');
        expect(p).toEqual(p);
    });
    it('Should fail to delete a product', async () => {
        try {
            await ProductRepository_1.default.delete('2000');
        }
        catch (err) {
            console.log(err.message);
            expect(err.message.includes('2000')).toBeTrue();
        }
    });
});
