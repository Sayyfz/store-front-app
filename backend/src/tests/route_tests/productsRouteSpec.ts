import fetcher from '../indexSpec';
import { Product } from '../../models/product';
import supertest from 'supertest';

describe('Products ROUTE SPEC', () => {
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

    it('Post request to /products should create a product successfully', done => {
        fetcher
            .post('/products')
            .send({ name: 'black shoes', price: 80 })
            .expect('Content-Type', /json/)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                expect(res.body).toEqual({
                    id: 1,
                    name: 'black shoes',
                    price: 80,
                });

                done();
            });
    });

    it('GET request to /products/1 should show the product that has id of 1', done => {
        fetcher
            .get('/products/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                expect(res.body).toEqual({
                    id: 1,
                    name: 'black shoes',
                    price: 80,
                });
                done();
            });
    });
});

//TODO: MIGRATION DOWN DOESNT RUN AFTER TEST ___________________________________________________________
