ALTER TABLE products DROP CONSTRAINT products_categories_id; 
ALTER TABLE orders DROP CONSTRAINT orders_users_id;
ALTER TABLE order_products DROP CONSTRAINT order_products_order_id;
ALTER TABLE order_products DROP CONSTRAINT order_products_product_id;