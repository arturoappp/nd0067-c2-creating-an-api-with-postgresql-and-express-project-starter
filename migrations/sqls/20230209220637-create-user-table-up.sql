CREATE TABLE users
(
    id              SERIAL PRIMARY KEY,
    username        VARCHAR(100) UNIQUE NOT NULL,
    lastname        VARCHAR(100)        NOT NULL,
    password_digest VARCHAR(250)        NOT NULL
);
