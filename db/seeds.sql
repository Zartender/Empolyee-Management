USE employee_tracker_db;

INSERT INTO department (name)
VALUES ('Engineering'), 
        ('Accounting'),
        ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 130000, 1), 
        ('Associate Accountant', 150000, 2),
        ('HR Manager', 32000, 3);

