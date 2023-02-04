import fetcher from '../indexSpec';
import { User } from '../../models/user';
import supertest from 'supertest';

describe('USERS ROUTE SPEC', () => {
    it('GET /users should return json', (done: DoneFn) => {
        fetcher
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                done();
            });
    });

    it('Post request to /users should create a user successfully', done => {
        fetcher
            .post('/users')
            .send({ first_name: 'ali', last_name: 'wael', password: 'theghost22' })
            .expect('Content-Type', /json/)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                expect(res.body).toEqual({
                    id: 1,
                    first_name: 'ali',
                    last_name: 'wael',
                    password: 'theghost22',
                });

                done();
            });
    });

    it('GET request to /users/1 should show the user that has id of 1', done => {
        fetcher
            .get('/users/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);

                expect(res.body).toEqual({
                    id: 1,
                    first_name: 'ali',
                    last_name: 'wael',
                    password: 'theghost22',
                });
                done();
            });
    });
});

//TODO: MIGRATION DOWN DOESNT RUN AFTER TEST ___________________________________________________________
