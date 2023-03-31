CREATE TABLE carts(
    id SERIAL PRIMARY KEY,
    total_price INT NOT NULL,
    user_id BIGINT,
    order_status VARCHAR(9) 
);