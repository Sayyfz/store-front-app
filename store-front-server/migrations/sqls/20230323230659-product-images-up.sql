CREATE TABLE product_images(
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(64) NOT NULL UNIQUE,
    product_id BIGINT 
);