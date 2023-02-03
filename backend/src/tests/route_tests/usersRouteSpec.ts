import fetcher from '../indexSpec';
import { User } from '../../models/user';

describe('USERS ROUTE SPEC', () => {
    it('GET /users should return json', (done: DoneFn) => {
        fetcher.get('/users').expect('Content-Type', /json/).expect(200, done);
    });
    it('Post request to /users should create a user successfully', done => {
        fetcher
            .post('/users')
            .send({ first_name: 'ali', last_name: 'wael', password: 'theghost22' })
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) console.log(err);
                console.log(`res body IS HEREEEEEE ${res.body}`);
                done();
            });
    });
});
