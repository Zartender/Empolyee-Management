// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const inquirer = require('inquirer');
const mysql = require('mysql2');


require('console.table');
require('dotenv').config();
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306
},
console.log(`Connected to db`)
);

db.connect(err => {
  if(err) throw err;
  console.log('connected');
  init()
})


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
      if(answers.init === 'Add Employee') {
        addEmployee();
    } else if (answers.init === 'View All Departments') {
        viewDept();
    } else if (answers.init === 'Add Department') {
        addDept();
    } else if (answers.init === 'Add Role') {
        addRole();
    } else if (answers.init === 'View All Employees') {
        viewEmployees();
    } else if (answers.init === 'View All Roles') {
        viewRoles();
    } else {
        finish();
    }
})

}


    
function addEmployee() {
  inquirer.prompt([
  {
      type: 'input',
      name: 'firstName',
      message: 'What is the employees first name?',
  },
  {
      type: 'input',
      name: 'lastName',
      message: 'What is the employees last name?',    
  },
  {
      type: 'input',
      name: 'role',
      message: 'What is the employees role?',  
  },
  {
      type: 'input',
      name: 'manager',
      message: 'Who is the employees manager?', 
  },
  ])
  .then((answers) => {
      // console.log(answers);
      let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', '${answers.role}', '${answers.manager}');`;
      db.promise().query(query).then(function(err, res){
          if(err){
              // console.error(err);
          }
          // console.log(res);
          console.log('Employee Added Successfully');
          menu();
      });

  });
}

function addRole() {
  inquirer.prompt([
  {
      type: 'input',
      name: 'newRole',
      message: 'What new role would you like to add?',
  },
  {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?',
  },
  {
      type: 'input',
      name: 'department',
      message: 'What department does this role belong to?',
  },
  ])
  .then((answers) => {
      let query = `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.newRole}', ${answers.salary}, ${answers.department})`;
      db.promise().query(query).then(function(err, res){
         if(err){
             // console.error(err);
         }
         // console.log(res);
         console.log('Successful Addition');
         menu();
     });
  }) 
}

function viewEmployees() {
  db.query('SELECT * FROM employee', (err, data) => {
      if(err) throw err;
      console.table(data);
      menu();
});
}

function viewRoles() {
 db.query('SELECT * FROM roles', (err, data) => {
     if(err) throw err;
     console.table(data);
     menu();
});
}

function finish() {
 console.log('Fin')
};

init();
