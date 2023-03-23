CREATE TABLE order_products(
    id SERIAL PRIMARY KEY, 
    order_id BIGINT,
    product_id BIGINT,
    quantity integer NOT NULL,
    UNIQUE(order_id, product_id)
);