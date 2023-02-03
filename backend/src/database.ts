import { Pool } from 'pg';

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, ENV } =
    process.env;

console.log(ENV);

const client: Pool =
    ENV === 'dev'
        ? new Pool({
              database: POSTGRES_DB,
              host: POSTGRES_HOST,
              user: POSTGRES_USER,
              password: POSTGRES_PASSWORD,
          })
        : new Pool({
              database: POSTGRES_DB_TEST,
              host: POSTGRES_HOST,
              user: POSTGRES_USER,
              password: POSTGRES_PASSWORD,
          });

export default client;
