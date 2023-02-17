"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexSpec_1 = __importDefault(require("../indexSpec"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('ORDERS ROUTE SPEC', () => {
    let token;
    let user;
    let product;
    beforeAll(async () => {
        const postUsersRes = await indexSpec_1.default.post('/users').send({
            first_name: 'joe',
            last_name: 'khalid',
            username: 'WillSmith',
            password: 'password',
        });
        token = `Bearer ${postUsersRes.body}`;
        const decoded = jsonwebtoken_1.default.decode(postUsersRes.body);
        user = decoded?.user;
        const postProductsRes = await indexSpec_1.default.post('/products').set('Authorization', token).send({
            name: 'test product',
            price: 200,
            category: 'misc',
        });
        product = postProductsRes.body;
    });
    it('GET /orders should return json', (done) => {
        indexSpec_1.default
            .get('/orders')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                console.log(err);
            done();
        });
    });
    let testShowOrder;
    it('Post request to /orders should create an order successfully', done => {
        indexSpec_1.default
            .post('/orders')
            .send({ user_id: user.id, status: 'active' })
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err)
                console.log(err);
            expect(res.body.user_id).toEqual(user.id);
            expect(res.body.status).toEqual('active');
            testShowOrder = res.body;
            done();
        });
    });
    it('GET request to /orders/:id should show the order that has the specified id', done => {
        indexSpec_1.default
            .get(`/orders/${testShowOrder.id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                console.log(err);
            expect(res.body).toEqual({
                id: testShowOrder.id,
                user_id: testShowOrder.user_id,
                status: testShowOrder.status,
            });
            done();
        });
    });
    it('POST request to /orders/:id/products add a product to the specified order successfully', done => {
        indexSpec_1.default
            .post(`/orders/${testShowOrder.id}/products`)
            .set('Authorization', token)
            .send({ product_id: product.id, quantity: 14 })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
            if (err)
                console.log(err);
            expect(res.body.order_id).toEqual(testShowOrder.id);
            expect(res.body.product_id).toEqual(product.id);
            expect(res.body.quantity).toEqual(14);
            done();
        });
    });
});
