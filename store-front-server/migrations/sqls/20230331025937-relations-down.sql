ALTER TABLE products DROP CONSTRAINT products_categories_id; 
ALTER TABLE carts DROP CONSTRAINT carts_user_id;
ALTER TABLE cart_items DROP CONSTRAINT cart_items_cart_id;
ALTER TABLE cart_items DROP CONSTRAINT cart_items_product_id;
ALTER TABLE product_images DROP CONSTRAINT image_products_product_id;