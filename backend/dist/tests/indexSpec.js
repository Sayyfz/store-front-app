"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const fetcher = (0, supertest_1.default)(index_1.default);
describe('MAIN SPEC', () => {
    it('Should return an html string', done => {
        fetcher
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200)
            .end((err, res) => {
            if (err)
                console.log(err);
            done();
        });
    });
});
exports.default = fetcher;
