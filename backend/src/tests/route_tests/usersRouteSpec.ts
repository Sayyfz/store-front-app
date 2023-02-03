import fetcher from '../indexSpec';

describe('Users Route Spec', () => {
    it('Should return json', done => {
        fetcher.get('/users').expect('Content-Type', /json/).expect(200, done);
    });
});
