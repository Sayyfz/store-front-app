ALTER TABLE products ADD CONSTRAINT products_categories_id FOREIGN KEY (category_id) REFERENCES categories(id);
ALTER TABLE carts ADD CONSTRAINT carts_user_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE product_images ADD CONSTRAINT image_products_product_id FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE cart_items ADD CONSTRAINT cart_items_cart_id FOREIGN KEY (cart_id) REFERENCES carts(id);
ALTER TABLE cart_items ADD CONSTRAINT cart_items_product_id FOREIGN KEY (product_id) REFERENCES products(id);