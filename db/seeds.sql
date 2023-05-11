INSERT INTO department (department_name)
VALUES ('infield'),
       ('outfield'),
       ('pitch'),
       ('catch'),
       ('lifeguard');

INSERT INTO role (title, salary, department_id)
VALUES ('engineer', 100.00, 1),
       ('pickler', 500.00, 2),
       ('baller', 200.00, 3),
       ('heckler', 300.00, 4),
       ('saver', 1000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('scotty', 'smalls', 3, 2),
       ('benny', 'rodriguez', 2, NULL),
       ('ham', 'porter', 4, 2),
       ('squintz', 'paladores', 1, 5),
       ('wendy', 'peffercorn', 5, NULL),
       ('yeah-yeah', 'mcclennon', 2, 3),
       ('kenny', 'denunez', 3, 3),
       ('vertrim', 'weeks', 1, 2),
       ('timmy', 'timmons', 1, 8),
       ('tommy', 'timmons', 1, 8);