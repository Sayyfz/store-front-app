CREATE TABLE order_products(
    id SERIAL PRIMARY KEY, 
    order_id bigint REFERENCES orders(id) NOT NULL, 
    product_id bigint REFERENCES products(id) NOT NULL,
    quantity integer NOT NULL,
    UNIQUE(order_id, product_id)
);