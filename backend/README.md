<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.png" alt="Markdownify" width="200"></a>
  <br>
  Store Front App
  <br>
</h1>

<h4 align="center">Backend App for E-Commerce Website

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#how-to-use">How To Use</a> •  
  <a href="#endpoints">Endpoints</a> •
  <a href="#data-shapes">Data Shapes</a> •
  <a href="#credits">Credits</a> •
</p>

<br /><br />

## Overview

<br />
This app exposes endpoints to store and retrieve data from a PostgreSQL database that can be used for an E-Commerce application.
For information on how to use it on your pc please check the information provided below.
<br />
<br />

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Sayyfz/store-front-app

# Opening the backend app folder
$ cd backend

# Run the database migrations
$ db-migrate up

# Install dependencies
$ npm install

# Run the server
$ npm run start
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

<br />
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
- first_name: string
- last_name: string
- username: string
- password: string

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

## Credits

This software uses the following libraries and frameworks:

-   [Node.js](https://nodejs.org/)
-   [Express.js](https://expressjs.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Jasmine](https://jasmine.github.io/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [Json Web Token](https://www.npmjs.com/package/jsonwebtoken)
-   [bcrypt](https://www.npmjs.com/package/bcrypt)
-   [db-migrate](https://www.npmjs.com/package/db-migrate)
