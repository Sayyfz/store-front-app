import fetcher from '../indexSpec';
import jwt, { JwtPayload } from 'jsonwebtoken';
import supertest from 'supertest';
import { User } from '../../models/user';
import { Product } from '../../models/product';

describe('PRODUCTS ROUTE SPEC', () => {
    let token: string;
    let testProduct: Product;

    beforeAll(done => {
        fetcher
            .post('/users')
            .send({
                first_name: 'Joe',
                last_name: 'Morgan',
                username: 'user',
                password: 'password123',
            })
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                token = `Bearer ${res.body}`;
            });

        done();
    });

    it('GET /products should return json', (done: DoneFn) => {
        fetcher
            .get('/products')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                done();
            });
    });

    it('Post request to /products without providing a token should return unauthorized error', done => {
        fetcher
            .post('/products')
            .send({ name: 'pink shoes', price: 80, category: 'shoes' })
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                expect(res.status).toEqual(401);
                done();
            });
    });

    it('Post request to /products should create a product successfully', done => {
        fetcher
            .post('/products')
            .send({ name: 'black shoes', price: 80, category: 'shoes' })
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                testProduct = res.body;
                done();
            });
    });

    it('GET request to /products/:id should show the product that has the specified id', done => {
        fetcher
            .get(`/products/${testProduct.id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                expect(res.body).toEqual(testProduct);
                done();
            });
    });
});
