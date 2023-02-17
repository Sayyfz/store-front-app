import supertest from 'supertest';
import request from 'supertest';
<<<<<<< HEAD:backend/api/tests/indexSpec.ts
import app from '../../api/index';
=======
import app from '../index';
>>>>>>> new:backend/src/tests/indexSpec.ts
const fetcher = request(app);

describe('MAIN SPEC', () => {
    it('Should return an html string', done => {
        fetcher
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200)
            .end((err, res: supertest.Response) => {
                if (err) console.log(err);
                done();
            });
    });
});

export default fetcher;
