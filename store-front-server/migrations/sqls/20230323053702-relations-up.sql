ALTER TABLE products ADD CONSTRAINT products_categories_id FOREIGN KEY (category_id) REFERENCES categories(id);
ALTER TABLE orders ADD CONSTRAINT orders_users_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE order_products ADD CONSTRAINT order_products_order_id FOREIGN KEY (order_id) REFERENCES orders(id);
ALTER TABLE order_products ADD CONSTRAINT order_products_product_id FOREIGN KEY (product_id) REFERENCES products(id);