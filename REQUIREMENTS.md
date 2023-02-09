# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

  - app.get('/orders', index)
  - app.get('/orders/:id', show)
  - app.post('/orders', verifyToken, create)
  - app.delete('/orders/:id', verifyToken, destroy)
  - app.post('/orders/:id', addProduct)

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category


 - app.get('/products', index)
 - app.get('/products/:id', show)
 - app.post('/products', create)
 - app.delete('/products/:id', destroy)

#### User
- id
- firstName
- lastName
- password


-  app.get("/users", verifyToken, index);
-  app.get("/users/:id", verifyToken, show);
-  app.get("/users/orders/:id", verifyToken, getOrders);
-  app.post("/users", create);
-  app.delete("/users/:id", verifyToken, destroy);
-  app.put("/users/:id", verifyToken, update);
-  app.post('/users/authenticate', authenticate);

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


- app.get('/order-products', index)
- app.get('/order-products/:id', show)
- app.post('/order-products', verifyToken, create)
- app.delete('/order-products/:id', destroy)

CREATE TABLE users
(
id              SERIAL PRIMARY KEY,
username        VARCHAR(100) NOT NULL,
lastname        VARCHAR(100) NOT NULL,
password_digest VARCHAR(250) NOT NULL
);

CREATE TABLE products
(
id    SERIAL PRIMARY KEY,
name  VARCHAR(64) NOT NULL,
price integer     NOT NULL
);

CREATE TABLE orders
(
id      SERIAL PRIMARY KEY,
status  VARCHAR(15),
userId bigint REFERENCES users (id) not null
);

CREATE TABLE order_products
(
id         SERIAL PRIMARY KEY,
quantity   integer,
orderId   bigint REFERENCES orders (id),
productId bigint REFERENCES products (id)
);

