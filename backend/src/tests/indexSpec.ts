import request from 'supertest';
import app from '../server';
const fetcher = request(app);

describe('Main Spec', () => {
    it('Should return an html string', done => {
        const res = fetcher
            .get('/')
            .expect(200)
            .expect('Content-Type', /text\/html/, done);
    });
});

export default fetcher;
