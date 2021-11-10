// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const inquirer = require('inquirer');
const mysql = require('mysql2');


require('console.table');
require('dotenv').config();
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected to db successfully');
});

function init() {
  console.log("Welcome to Employee Tracker!");

  inquirer
    .prompt([
      {
        type: 'list',
        message: "What would you like to do?",
        name: 'userInput',
        choices: ["View Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
      },

    ])
    .then((answers) => {
      console.log(answers)

      // connection.query('SELECT * from employee', )
    })
    .catch((error) => {
      if (error) {
        // Prompt couldn't be rendered in the current environment
        console.error(error);
      } else {
        // Something else went wrong
      }
    });
  //Question 


}

init();
