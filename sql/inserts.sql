INSERT INTO "training"."users" ("login", "password", "age") 
VALUES 
    ('vlad@test.ru', 'qwerty123', 22),
    ('dima@test.ru', 'we11come', 16),
    ('masha@test.ru', '123445qw', 20),
    ('nata@test.ru', 'zxcvb24', 43),
    ('leanid@test.ru', 'potej24ssd', 46);

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
