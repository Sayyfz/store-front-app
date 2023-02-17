"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexSpec_1 = __importDefault(require("../indexSpec"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('SERVICES ROUTE SPEC', () => {
    let token;
    let user;
    beforeAll(async () => {
        const postUsersRes = await indexSpec_1.default.post('/users').send({
            first_name: 'Joe',
            last_name: 'Mosh',
            username: 'KhalidEmam',
            password: 'password',
        });
        token = `Bearer ${postUsersRes.body}`;
        const decoded = jsonwebtoken_1.default.decode(postUsersRes.body);
        user = decoded?.user;
        await Promise.all([
            indexSpec_1.default.post('/orders').set('Authorization', token).send({
                user_id: user.id,
                status: 'active',
            }),
            indexSpec_1.default.post('/orders').set('Authorization', token).send({
                user_id: user.id,
                status: 'complete',
            }),
            indexSpec_1.default.post('/orders').set('Authorization', token).send({
                user_id: user.id,
                status: 'complete',
            }),
            indexSpec_1.default
                .post('/products')
                .send({
                name: 'Hp Pavilion',
                price: 2800,
                category: 'tech',
            })
                .set('Authorization', token),
            indexSpec_1.default
                .post('/products')
                .send({
                name: 'Hp Victus',
                price: 1200,
                category: 'tech',
            })
                .set('Authorization', token),
            indexSpec_1.default
                .post('/products')
                .send({
                name: '120x80cm Desk',
                price: 2800,
                category: 'office desk',
            })
                .set('Authorization', token),
            indexSpec_1.default
                .post('/products')
                .send({
                name: '170cmx100cm Desk',
                price: 2800,
                category: 'office desk',
            })
                .set('Authorization', token),
        ]);
    });
    it('GET /current_orders_by_user/:id should return current orders by the specified user', (done) => {
        indexSpec_1.default
            .get(`/services/current_orders_by_user/${user.id}`)
            .set('Authorization', token)
            .expect(200)
            .end((err, res) => {
            if (err)
                console.log(err);
            console.log('active orders by user');
            expect(res.body.length).toBeGreaterThan(0);
            done();
        });
    });
    it('Get request to /completed_orders_by_user/:id should return completed orders by the specified user', done => {
        indexSpec_1.default
            .get(`/services/completed_orders_by_user/${user.id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err)
                console.log(err);
            expect(res.body.length).toBeGreaterThan(0);
            done();
        });
    });
    it('Get request to /products_by_category/tech should return products that belong to the tech category', done => {
        indexSpec_1.default
            .get(`/services/products_by_category/tech`)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err)
                console.log(err);
            expect(res.body.length).toBeGreaterThan(0);
            done();
        });
    });
});
