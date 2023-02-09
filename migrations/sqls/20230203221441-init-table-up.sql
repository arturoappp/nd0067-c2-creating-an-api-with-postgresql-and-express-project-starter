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