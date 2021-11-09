--View all roles and departments
SELECT  department.id, department.name AS 'Department',  role.id AS 'Role ID',role.title as 'TITLE', salary
FROM role
JOIN department ON role.department_id = department.id;
