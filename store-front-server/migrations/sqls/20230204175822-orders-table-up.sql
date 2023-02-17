CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id) NOT NULL,
    status VARCHAR(64) NOT NULL
);