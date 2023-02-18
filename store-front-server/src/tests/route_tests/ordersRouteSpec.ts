import fetcher from '../indexSpec';
import supertest from 'supertest';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../models/UserModel';
import { Product } from '../../models/ProductModel';
import { Order } from '../../models/OrderModel';

describe('ORDERS ROUTE SPEC', () => {
    let token: string;
    let user: User;
    let product: Product;

    beforeAll(async () => {
        const postUsersRes = await fetcher.post('/users').send({
            first_name: 'joe',
            last_name: 'khalid',
            username: 'WillSmith',
            password: 'password',
        });

        token = `Bearer ${postUsersRes.body}`;
        const decoded = jwt.decode(postUsersRes.body) as JwtPayload;
        user = decoded?.user;

        const postProductsRes = await fetcher.post('/products').set('Authorization', token).send({
            name: 'test product',
            price: 200,
            category: 'misc',
        });
        product = postProductsRes.body;
    });

    it('GET /orders should return json', (done: DoneFn) => {
        fetcher
            .get('/orders')
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                done();
            });
    });

    let testShowOrder: Order;

    it('Post request to /orders should create an order successfully', done => {
        fetcher
            .post('/orders')
            .send({ user_id: user.id, status: 'active' })
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                expect(res.body.user_id).toEqual(user.id);
                expect(res.body.status).toEqual('active');
                testShowOrder = res.body;
                done();
            });
    });

    it('GET request to /orders/:id should show the order that has the specified id', done => {
        fetcher
            .get(`/orders/${testShowOrder.id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                expect(res.body).toEqual({
                    id: testShowOrder.id,
                    user_id: testShowOrder.user_id,
                    status: testShowOrder.status,
                });
                done();
            });
    });

    it('POST request to /orders/:id/products add a product to the specified order successfully', done => {
        fetcher
            .post(`/orders/${testShowOrder.id}/products`)
            .set('Authorization', token)
            .send({ product_id: product.id, quantity: 14 })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                expect(res.body.order_id).toEqual(testShowOrder.id);
                expect(res.body.product_id).toEqual(product.id);
                expect(res.body.quantity).toEqual(14);
                done();
            });
    });
});
