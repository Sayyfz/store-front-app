import fetcher from '../indexSpec';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import { User } from '../../models/user';
import jwt, { JwtPayload } from 'jsonwebtoken';

describe('USERS ROUTE SPEC', () => {
    let token: string;
    let user: User;

    beforeAll(done => {
        fetcher
            .post('/users')
            .send({
                first_name: 'ali',
                last_name: 'wael',
                username: 'joesmith',
                password: 'theghost22',
            })
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                token = `Bearer ${res.body}`;
                const decoded = jwt.decode(res.body) as JwtPayload;
                user = decoded?.user;
                done();
            });
    });

    it('GET /users without providing a token should return unauthorized status code', (done: DoneFn) => {
        fetcher
            .get('/users')
            .expect(401)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                done();
            });
    });

    it('GET /users with providing a token should return the users list', (done: DoneFn) => {
        fetcher
            .get('/users')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                done();
            });
    });

    //@ts-ignore
    it(`GET request to /users/:id should have the same password of the user created earlier in this test`, done => {
        fetcher
            .get(`/users/${user.id}`)
            .expect('Content-Type', /json/)
            .set('Authorization', token)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                const isPasswordMatch = bcrypt.compareSync(
                    'theghost22' + process.env.PEPPER,
                    res.body.password,
                );

                expect(isPasswordMatch).toBeTrue();
                done();
            });
    });
});
