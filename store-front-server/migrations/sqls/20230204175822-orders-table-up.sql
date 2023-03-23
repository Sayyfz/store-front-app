CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    status VARCHAR(64) NOT NULL
);