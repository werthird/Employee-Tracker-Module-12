INSERT INTO department (name)
VALUES ("Sales"),
       ("Customer Service");


INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 110000, 1),
       ("Sales Representative", 70000, 1),
       ("Service Manager", 100000, 2),
       ("Customer Service Representative", 65000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Johnson", 1, NULL),
       ("Alex", "Garcia", 3, NULL),
       ("Rachel", "Thompson", 2, 1),
       ("Frank", "Charleston", 2, 1);