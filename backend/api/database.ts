import { Pool } from 'pg';

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_CONN_STRING,
    ENV,
} = process.env;

console.log(ENV);
let client: Pool;

if (ENV === 'dev') {
    client = new Pool({
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
} else if (ENV === 'test') {
    client = new Pool({
        database: POSTGRES_DB_TEST,
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
} else if (ENV === 'production') {
    client = new Pool({
        connectionString: POSTGRES_CONN_STRING,
    });
}

export default client!;
