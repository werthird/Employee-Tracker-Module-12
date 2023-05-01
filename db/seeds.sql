INSERT INTO department (name)
-- Department
VALUES ("Sales"),
       ("Customer Service"),
       ("Landscape Design")
       ("Maintenance");


INSERT INTO roles (title, salary, department_id)
-- Role  -  Salary  -  Department#/Department ID
VALUES ("Sales Manager", 110000, 1),
       ("Sales Representative", 70000, 1),
       ("Service Manager", 100000, 2),
       ("Customer Service Representative", 65000, 2),
       ("Project Manager", 100000, 3),
       ("Landscape Designer", 85000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- First  -  Last  -  Role#/Role ID  -  Manager#/Employee ID
VALUES ("Sarah", "Johnson", 1, 3),
       ("Alex", "Garcia", 4, 2),
       ("Rachel", "Thompson", 1, NULL),
       ("Frank", "Charleston", 3, NULL);