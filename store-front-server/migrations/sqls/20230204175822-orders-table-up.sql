CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    status VARCHAR(64) NOT NULL,
    CONSTRAINT orders_users_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);