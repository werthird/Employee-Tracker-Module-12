INSERT INTO department (name)
VALUES ("Sales"),
       ("Customer Service");


INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Representative", 70000, 1),
       ("Sales Manager", 110000, 1),
       ("Customer Service Representative", 50000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Johnson", 1, 1),
       ("Alex", "Garcia", 3, 1),
       ("Rachel", "Thompson", 2, 0);