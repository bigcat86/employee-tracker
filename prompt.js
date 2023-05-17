const express = require('express');
const mysql = require('mysql2')
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'sandlot_db',
      multipleStatements: true
    },
    console.log(`Connected to the sandlot_db database.`)
);

function viewDepartment() {
    db.query('SELECT * FROM department', (err, results) => {
        console.log('\n');
        console.table(results);
    })    
    init();
}

function viewRole() {
    db.query(`SELECT 
    role.id AS id,
    role.title AS title,
    role.salary AS salary,
    department.department_name AS department
    FROM role
    JOIN department ON role.department_id=department.id`, (err, results) => {
        console.log('\n');
        console.table(results);
    })    
}

function viewEmployee() {
    db.query(`SELECT 
    emp.id, 
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
    ORDER BY emp.id ASC`, (err, results) => {
        console.log('\n');
        console.table(results);
    })    
}

let deptValues = [];

function departmentQuery() {
    db.query('SELECT department_name FROM department', (err, results) => {
        results.forEach(result => deptValues.push(result.department_name))
        return deptValues;
    })    
}

let roleValues = [];

function roleQuery() {
    db.query('SELECT title FROM role', (err, results) => {
        results.forEach(result => roleValues.push(result.title))
        return roleValues;
    })    
}

let employeeValues = [];

function employeeQuery() {
    db.query('SELECT first_name, last_name FROM employee', (err, results) => {
        results.forEach(result => employeeValues.push(result.first_name + ' ' + result.last_name))
        return employeeValues;
    })    
}

function addDepartment(departmentName) {
    db.query(`INSERT INTO department (department_name) VALUES ("${departmentName}")`, (err, results) => {
        err ? console.log(err) : viewDepartment();
    })
}

function addRole(roleTitle, roleSalary, roleDept) {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${roleTitle}", "${roleSalary}", "${roleDept}")`, (err, results) => {
        err ? console.log(err) : viewRole();
    })
}

function addEmployee(firstName, lastName, employeeRole, employeeManager) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employeeRole}", "${employeeManager}")`, (err, results) => {
        err ? console.log(err) : viewEmployee();
    })
}

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initial',
        choices: [
        'View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update an employee role',
        new inquirer.Separator()
    ],
    },
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'department_name',
        when(answers) {
            return answers.initial === 'Add a department'
        }
    },
    {
        type: 'input',
        message: 'What is the title of the role?',
        name: 'role_title',
        when(answers) {
            return answers.initial === 'Add a role'
        }
    },
    {
        type: 'number',
        message: 'What is the salary of the role?',
        name: 'role_salary',
        when(answers) {
            return typeof answers.role_title === 'string'
        }
    },
    {
        type: 'list',
        message: 'What is the department of the role?',
        name: 'role_department',
        choices: deptValues,
        when(answers) {
            return typeof answers.role_salary === 'number'
        }
    },
    {
        type: 'input',
        message: 'What is the first name of the employee?',
        name: 'employee_firstname',
        when(answers) {
            return answers.initial === 'Add an employee'
        }
    },
    {
        type: 'input',
        message: 'What is the last name of the employee?',
        name: 'employee_lastname',
        when(answers) {
            return typeof answers.employee_firstname === 'string'
        }
    },
    {
        type: 'list',
        message: 'What is the role of the employee?',
        name: 'employee_role',
        choices: roleValues,
        when(answers) {
            return typeof answers.employee_lastname === 'string'
        }
    },
    {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'employee_manager',
        choices: employeeValues,
        when(answers) {
            return !!answers.employee_role;
        }
    },
    {
        type: 'list',
        message: "Which employee's role would you like to update?",
        name: 'update_employee',
        choices: employeeValues,
        when(answers) {
            return answers.initial === 'Update an employee role'
        }
    },
    {
        type: 'list',
        message: 'What role do you want to assign the selected employee?',
        name: 'update_role',
        choices: roleValues,
        when: function (answers) {
            return !!answers.update_employee;
        }
    },
]

function init() {
    departmentQuery();
    roleQuery();
    employeeQuery();
    inquirer.prompt(questions)
    .then((answers) => {
        if (answers.initial === 'View all departments') {
            viewDepartment();
        } else if (answers.initial === 'View all roles') {
            viewRole();
        } else if (answers.initial === 'View all employees') {
            viewEmployee();
        } else if (answers.initial === 'Add a department') {
            console.log(`Added ${answers.department_name} to the database`);
            addDepartment(answers.department_name);
        } else if (answers.initial === 'Add a role') {
            db.query(`SELECT id FROM department WHERE department_name=?`, answers.role_department, (err, results) => {
                const newRoleDept = results[0].id;
                console.log(`Added ${answers.role_title} to the database`)
                addRole(answers.role_title, answers.role_salary, newRoleDept);
            })      
        } else if (answers.initial === 'Add an employee') {
            db.query(`SELECT id FROM role WHERE title=?; SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name)=?`, 
                [answers.employee_role, answers.employee_manager], (err, results) => {
                    const newEmployeeRole = results[0][0].id;
                    const newEmployeeManager = results[1][0].id;
                    console.log(`Added ${answers.employee_firstname + ' ' + answers.employee_lastname} to the database`)
                    addEmployee(answers.employee_firstname, answers.employee_lastname, newEmployeeRole, newEmployeeManager);
                })          
        } else if (answers.initial === 'Update an employee role') {
            db.query(`UPDATE employee SET role_id=(SELECT id FROM role WHERE title=?) WHERE CONCAT(first_name, ' ', last_name)=?`, 
                [answers.update_role, answers.update_employee], (err, results) => {
                    console.log(`Updated ${answers.update_employee}'s role to ${answers.update_role}`)
                    viewEmployee();                
                })         
        } else {
            console.table(answers);
        }
    });
};

init();
