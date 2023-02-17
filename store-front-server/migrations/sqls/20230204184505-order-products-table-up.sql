CREATE TABLE order_products(
    id SERIAL PRIMARY KEY, 
    order_id BIGINT,
    product_id BIGINT,
    quantity integer NOT NULL,
    CONSTRAINT order_products_order_id FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT order_products_product_id FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE(order_id, product_id)
);