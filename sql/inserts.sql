INSERT INTO "training"."users" ("login", "password", "age") 
VALUES 
    ('vlad@test.ru', '$2b$10$xVMumKa9LbjJ7hcY80g30.NP03A8QN5I2zUUiIlS.3qX830fkfs.u', 22),
    ('dima@test.ru', '$2y$10$q315ibDhONGJMniH.xdSoeeQIgWGQdZ4xmvKwm7mfBnB2Zsb/yIv.', 16),
    ('masha@test.ru', '$2y$10$6z7LLf5VSbVWuZYr4FXxj.JsVolegITC3Ua2Vpd..kvN/9f2oHZy6', 20),
    ('nata@test.ru', '$2y$10$.cAUsvcXXnMJ6OGMAM0JuOyF1E1ZhamXtpyp3TOxJ1rbjc.5yFbqa', 43),
    ('leanid@test.ru', '$2y$10$hdbhJS2mVcw8z6S2dR.wzOx1jsv4FxsZEhGYsZnBE/6hkd8XOOMTq', 46);

-----------------------------------------------------------------

INSERT INTO "training"."groups" ("name") 
VALUES 
    ('Admin'), ('Editor'), ('User'), ('Guest'),
    ('ReadOnly'), ('WriteOnly'), ('DeleteOnly');

-----------------------------------------------------------------

INSERT INTO "training"."permissions" ("name") 
VALUES ('READ'), ('WRITE'), ('DELETE'), ('SHARE'), ('UPLOAD_FILES');

-----------------------------------------------------------------

INSERT INTO "training"."user_group" ("user_id", "group_id") 
VALUES 
    (1, 1), (2, 2), (3, 3), (4, 4),
    (5, 5), (5, 6);

-----------------------------------------------------------------

INSERT INTO "training"."group_permission" ("group_id", "permission_id") 
VALUES 
    (5, 1), (6, 2), (7, 3),
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
    (2, 1), (2, 2), (2, 4), (2, 5),
    (3, 1), (3, 4),
    (4, 1);
