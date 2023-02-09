CREATE TABLE order_products
(
    id         SERIAL PRIMARY KEY,
    quantity   integer,
    orderId   bigint REFERENCES orders (id),
    productId bigint REFERENCES products (id)
);