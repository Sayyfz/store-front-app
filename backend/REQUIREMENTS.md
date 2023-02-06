## Endpoints

<br />

#### **Users Routes**

-   **GET** /users to get all users (token required)
-   **GET** /users/:id to get a specific user using the id (token required)
-   **POST** /users to create a new user (Please check the data shapes to see what you should enter in the body)
-   **POST** /authenticate to authenticate a user by entering username and password
    <br />
    <br />

#### **Products Routes**

-   **GET** /products to get all products
-   **GET** /products/:id to get a specific product using the id
-   **POST** /products to create a new product (token required) (Please check the data shapes to see what you should enter in the body)
    <br />
    <br />

#### **Orders Routes**

-   **GET** /orders to get all orders
-   **GET** /orders/:id to get a specific order using the id
-   **POST** /orders to create a new order (token required) (Please check the data shapes for more info)
-   **POST** /orders/:id/products to add a specific product to an order (Please check the data shapes to see what you should enter in the body)
    <br />
    <br />

#### **Services Routes**

-   **GET** /current_orders_by_user/:id to get active orders by user (token required)
-   **GET** /completed_orders_by_user/:id to get completed orders by user (token required)
-   **GET** /products_by_category/:category to get products that belong to a specific category
    <br />
    <br />

## Data Shapes

##### **All data shapes have an auto-generated id which we don't need to provide unless it's required in the url parameters. However, in all cases we don't need it in a request body.**

<br />

#### **User**

-   first_name: string
-   last_name: string
-   username: string
-   password: string

#### **Product**

-   name: string
-   price: number
-   category: string

#### **Order**

-   user_id: number
-   status: string

#### **Products Inside Orders**

> To add a specific product to an order, you specifiy an existing product id to add it to an existing order id and since you add the order id in the url parameters, we only need to add this info:

-   product_id: number
-   quantity: number
