CREATE TABLE orders
(
    id     SERIAL PRIMARY KEY,
    status VARCHAR(15),
    userId integer REFERENCES users (id) not null
);