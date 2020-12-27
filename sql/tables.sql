DROP TABLE IF EXISTS training.Users;

CREATE TABLE training.Users (
    id          SERIAL PRIMARY KEY,
    login       VARCHAR NOT NULL UNIQUE,
    password    VARCHAR NOT NULL,
    age         INTEGER,
    isDeleted   BOOLEAN NOT NULL DEFAULT false
);