"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexSpec_1 = __importDefault(require("../indexSpec"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
describe('USERS ROUTE SPEC', () => {
    let token;
    let user;
    beforeAll(done => {
        indexSpec_1.default
            .post('/users')
            .send({
            first_name: 'ali',
            last_name: 'wael',
            username: 'joesmith',
            password: 'theghost22',
        })
            .end((err, res) => {
            if (err)
                console.log(err);
            token = `Bearer ${res.body}`;
            const decoded = jsonwebtoken_1.default.decode(res.body);
            user = decoded?.user;
            done();
        });
    });
    it('GET /users without providing a token should return unauthorized status code', (done) => {
        indexSpec_1.default
            .get('/users')
            .expect(401)
            .end((err, res) => {
            if (err)
                console.log(err);
            done();
        });
    });
    it('GET /users with providing a token should return the users list', (done) => {
        indexSpec_1.default
            .get('/users')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            if (err)
                console.log(err);
            done();
        });
    });
    //@ts-ignore
    it(`GET request to /users/:id should have the same password of the user created earlier in this test`, done => {
        indexSpec_1.default
            .get(`/users/${user.id}`)
            .expect('Content-Type', /json/)
            .set('Authorization', token)
            .expect(200)
            .end((err, res) => {
            if (err)
                console.log(err);
            const isPasswordMatch = bcrypt_1.default.compareSync('theghost22' + process.env.PEPPER, res.body.password);
            expect(isPasswordMatch).toBeTrue();
            done();
        });
    });
});
