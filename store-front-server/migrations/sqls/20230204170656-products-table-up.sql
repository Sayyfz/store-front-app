CREATE TABLE products (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL UNIQUE,
    price integer NOT NULL, 
    category_id BIGINT,
    img TEXT
);