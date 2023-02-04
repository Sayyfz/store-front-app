import fetcher from '../indexSpec';
import { Order } from '../../models/order';
import supertest from 'supertest';

describe('ORDERS ROUTE SPEC', () => {
    beforeAll(done => {
        fetcher
            .post('/users')
            .send({ first_name: 'joe', last_name: 'khalid', password: 'password' })
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                done();
            });
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
            .send({ user_id: '1', status: 'active' })
            .expect('Content-Type', /json/)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                expect(res.body).toEqual({ id: 1, user_id: 1, status: 'active' });

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

                expect(res.body).toEqual({ id: 1, user_id: 1, status: 'active' });
                done();
            });
    });
});

//TODO: MIGRATION DOWN DOESNT RUN AFTER TEST ___________________________________________________________
