CREATE TABLE cart_items(
    id SERIAL PRIMARY KEY, 
    cart_id BIGINT,
    product_id BIGINT,
    quantity integer NOT NULL,
    UNIQUE(cart_id, product_id)
);