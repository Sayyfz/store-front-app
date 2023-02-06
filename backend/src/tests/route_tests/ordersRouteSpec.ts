import fetcher from '../indexSpec';
import supertest from 'supertest';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../models/user';
import { Product } from '../../models/product';

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
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                done();
            });
    });

    it('Post request to /orders should create an order successfully', done => {
        fetcher
            .post('/orders')
            .send({ user_id: user.id, status: 'active' })
            .expect('Content-Type', /json/)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                expect(res.body).toEqual({ id: 1, user_id: user.id, status: 'active' });

                done();
            });
    });

    it('GET request to /orders/1 should show the order that has id of 1', done => {
        fetcher
            .get('/orders/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                expect(res.body).toEqual({ id: 1, user_id: user.id, status: 'active' });
                done();
            });
    });

    it('POST request to /orders/:id/products add a product to the specified order successfully', done => {
        fetcher
            .post('/orders/1/products')
            .send({ product_id: product.id, quantity: 14 })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                expect(res.body).toEqual({
                    id: 1,
                    order_id: 1,
                    product_id: product.id,
                    quantity: 14,
                });
                done();
            });
    });
});

//TODO: MIGRATION DOWN DOESNT RUN AFTER TEST ___________________________________________________________
