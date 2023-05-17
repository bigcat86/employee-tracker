SELECT 
    role.id AS id,
    role.title AS title,
    role.salary AS salary,
    department.department_name AS department
FROM role
JOIN department ON role.department_id=department.id;



SELECT emp.id, 
emp.first_name, 
emp.last_name, 
CONCAT(manager.first_name, ' ', manager.last_name) AS manager,
role.title AS title,
role.salary AS salary,
department.department_name AS department  
FROM employee emp 
LEFT JOIN employee manager 
ON emp.manager_id = manager.id OR manager.id IS NULL
JOIN role
ON role.id = emp.role_id
JOIN department
ON department.id = role.department_id
ORDER BY emp.id ASC;


