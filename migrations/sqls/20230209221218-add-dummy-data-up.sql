-- Users
INSERT INTO users (username, lastname, password_digest)
VALUES ('user1', 'user1', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa'),
       ('user2', 'user2', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTb'),
       ('user3', 'user3', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTc');

-- Products
INSERT INTO products (name, price)
VALUES ('Product 1', 10),
       ('Product 2', 20),
       ('Product 3', 30);

-- Orders
INSERT INTO orders (status, userId)
VALUES ('active', 1),
       ('active', 2),
       ('complete', 3);

-- Order Products
INSERT INTO order_products (quantity, orderId, productId)
VALUES (10, 1, 1),
       (5, 2, 2),
       (8, 3, 3);