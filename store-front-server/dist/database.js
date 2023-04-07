"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_CONN_STRING, ENV, } = process.env;
console.log(ENV);
let client;
if (ENV === 'dev') {
    client = new pg_1.Pool({
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
else if (ENV === 'test') {
    client = new pg_1.Pool({
        database: POSTGRES_DB_TEST,
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
else if (ENV === 'production') {
    client = new pg_1.Pool({
        connectionString: POSTGRES_CONN_STRING,
    });
}
else {
    client = new pg_1.Pool({
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = client;
