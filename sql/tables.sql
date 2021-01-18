DROP SCHEMA IF EXISTS "training" CASCADE;
CREATE SCHEMA "training";
GRANT ALL ON SCHEMA public TO postgres;

-------------------------------------------------------

CREATE TABLE "training"."users" (
    "id"            SERIAL PRIMARY KEY,
    "login"         VARCHAR NOT NULL UNIQUE,
    "password"      VARCHAR NOT NULL,
    "age"           INTEGER,
    "is_deleted"    BOOLEAN NOT NULL DEFAULT false
);

-------------------------------------------------------

CREATE TABLE "training"."groups" (
    "id"            SERIAL PRIMARY KEY,
    "name"          VARCHAR NOT NULL UNIQUE
);

-------------------------------------------------------

CREATE TYPE "training"."permission_type" 
AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

CREATE TABLE "training"."permissions" (
    "id"            SERIAL PRIMARY KEY,
    "name"          "training"."permission_type" NOT NULL UNIQUE
);

-------------------------------------------------------

CREATE TABLE "training"."user_group" (
    "user_id"       INTEGER REFERENCES "training"."users" ("id") ON DELETE CASCADE,
    "group_id"      INTEGER REFERENCES "training"."groups" ("id") ON DELETE CASCADE
);

-------------------------------------------------------

CREATE TABLE "training"."group_permission" (
    "group_id"      INTEGER REFERENCES "training"."groups" ("id") ON DELETE CASCADE,
    "permission_id" INTEGER REFERENCES "training"."permissions" ("id") ON DELETE CASCADE    
);
