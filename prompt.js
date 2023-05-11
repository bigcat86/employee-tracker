const express = require('express');
const mysql = require('mysql2')
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'sandlot_db',
    rowsAsArray: true
  },
  console.log(`Connected to the classlist_db database.`)
);

let deptValues = [];

function departmentQuery() {
    db.query('SELECT department_name FROM department', (err, results) => {
        for (let i = 0; i < results.length; i++) {
           deptValues.push(results[i][0]);
        }
    })    
}

let roleValues = [];

function roleQuery() {
    db.query('SELECT title FROM role', (err, results) => {
        for (let i = 0; i < results.length; i++) {
           roleValues.push(results[i][0]);
        }
    })    
}

let employeeValues = [];

function employeeQuery() {
    db.query('SELECT first_name, last_name FROM employee', (err, results) => {
        for (let i = 0; i < results.length; i++) {
           employeeValues.push(results[i][0]);
        }
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
        'Update an employee role'],
    },
    {
        type: 'list',
        message: 'What is the name of the department?',
        name: 'department_name',
        choices: deptValues,
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
        name: 'employeee_role',
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
            return typeof !!answers.employee_role === 'boolean'
        }
    },
    {
        type: 'list',
        message: "Which employee's role would you like to update?",
        name: 'update_employee',
        choices: roleValues,
        when(answers) {
            return answers.initial === 'Update an employee role'
        }
    },
    {
        type: 'list',
        message: 'What role do you want to assign the selected employee?',
        name: 'update_role',
        choices: roleValues,
        when(answers) {
            return typeof answers.update_employee === 'string'
        }
    },
]

async function init() {
    departmentQuery();
    roleQuery();
    employeeQuery();
    try {
        const answers = await inquirer.prompt(questions);
        console.table([answers], answers.slice(1));
    } catch (error) {
        console.log(error);
    }
};

init();
