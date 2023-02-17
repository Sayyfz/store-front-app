import fetcher from '../indexSpec';
import supertest from 'supertest';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../models/user';

describe('SERVICES ROUTE SPEC', () => {
    let token: string;
    let user: User;

    beforeAll(async () => {
        const postUsersRes = await fetcher.post('/users').send({
            first_name: 'Joe',
            last_name: 'Mosh',
            username: 'KhalidEmam',
            password: 'password',
        });

        token = `Bearer ${postUsersRes.body}`;
        const decoded = jwt.decode(postUsersRes.body) as JwtPayload;
        user = decoded?.user;

        await Promise.all([
            fetcher.post('/orders').set('Authorization', token).send({
                user_id: user.id,
                status: 'active',
            }),

            fetcher.post('/orders').set('Authorization', token).send({
                user_id: user.id,
                status: 'complete',
            }),

            fetcher.post('/orders').set('Authorization', token).send({
                user_id: user.id,
                status: 'complete',
            }),

            fetcher
                .post('/products')
                .send({
                    name: 'Hp Pavilion',
                    price: 2800,
                    category: 'tech',
                })
                .set('Authorization', token),

            fetcher
                .post('/products')
                .send({
                    name: 'Hp Victus',
                    price: 1200,
                    category: 'tech',
                })
                .set('Authorization', token),

            fetcher
                .post('/products')
                .send({
                    name: '120x80cm Desk',
                    price: 2800,
                    category: 'office desk',
                })
                .set('Authorization', token),

            fetcher
                .post('/products')
                .send({
                    name: '170cmx100cm Desk',
                    price: 2800,
                    category: 'office desk',
                })
                .set('Authorization', token),
        ]);
    });

    it('GET /current_orders_by_user/:id should return current orders by the specified user', (done: DoneFn) => {
        fetcher
            .get(`/services/current_orders_by_user/${user.id}`)
            .set('Authorization', token)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                console.log('active orders by user');
                expect(res.body.length).toBeGreaterThan(0);
                done();
            });
    });

    it('Get request to /completed_orders_by_user/:id should return completed orders by the specified user', done => {
        fetcher
            .get(`/services/completed_orders_by_user/${user.id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                expect(res.body.length).toBeGreaterThan(0);

                done();
            });
    });

    it('Get request to /products_by_category/tech should return products that belong to the tech category', done => {
        fetcher
            .get(`/services/products_by_category/tech`)
            .expect('Content-Type', /json/)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                expect(res.body.length).toBeGreaterThan(0);

                done();
            });
    });
});
