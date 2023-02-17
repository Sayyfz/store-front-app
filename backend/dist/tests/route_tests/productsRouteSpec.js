"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexSpec_1 = __importDefault(require("../indexSpec"));
describe('PRODUCTS ROUTE SPEC', () => {
    let token;
    let testProduct;
    beforeAll(done => {
        indexSpec_1.default
            .post('/users')
            .send({
            first_name: 'Joe',
            last_name: 'Morgan',
            username: 'user',
            password: 'password123',
        })
            .end((err, res) => {
            if (err)
                console.log(err);
            token = `Bearer ${res.body}`;
        });
        done();
    });
    it('GET /products should return json', (done) => {
        indexSpec_1.default
            .get('/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                console.log(err);
            done();
        });
    });
    it('Post request to /products without providing a token should return unauthorized error', done => {
        indexSpec_1.default
            .post('/products')
            .send({ name: 'pink shoes', price: 80, category: 'shoes' })
            .end((err, res) => {
            if (err)
                console.log(err);
            expect(res.status).toEqual(401);
            done();
        });
    });
    it('Post request to /products should create a product successfully', done => {
        indexSpec_1.default
            .post('/products')
            .send({ name: 'black shoes', price: 80, category: 'shoes' })
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                console.log(err);
            testProduct = res.body;
            done();
        });
    });
    it('GET request to /products/:id should show the product that has the specified id', done => {
        indexSpec_1.default
            .get(`/products/${testProduct.id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                console.log(err);
            expect(res.body).toEqual(testProduct);
            done();
        });
    });
});
