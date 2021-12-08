// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const inquirer = require('inquirer');
const mysql = require('mysql2');



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
    if (err) throw err;
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
                choices: ["View Employees", "Add Employee", "Update Employee Role", "View Roles", "Add Role", "View Departments", "Add Department"]
            },

        ])
        .then((answers) => {
            console.log(answers)

            // connection.query('SELECT * from employee', )
            if (answers.userInput === 'Add Employee') {
                addEmployee();
            } else if (answers.userInput === 'View Departments') {
                viewDept();
            } else if (answers.userInput === 'Add Department') {
                addDepartment();
            } else if (answers.userInput === 'Add Role') {
                addRole();
            } else if (answers.userInput === 'View Employees') {
                viewEmployees();
            } else if (answers.userInput === 'View Roles') {
                viewRoles();
                 } else if (answers.userInput === 'View Roles') {
                viewRoles();
            } else {
                finish();
            }
        })

}



function addEmployee() {
    //select get all role and store it in a varaible 
    db.query('SELECT id, title FROM role', (err, data) => {
        if (err) throw err;
        //looping through all the rows from the database and selcting only id and title 
        const roleChoices = data.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        // console.log(roleChoices); 
        db.query(`SELECT id, CONCAT(first_name, last_name) as 'Manager' FROM employee`, (err, data) => {
            if (err) throw err;
            console.log(data);
            //looping through all the rows from the database and selcting only id and title 
            const mgrChoices = data.map(({ id, Manager }) => ({
                name: Manager,
                value: id
            }));
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employees first name?',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employees last name?',
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employees role?',
                    choices: roleChoices //pulling foreign key values 
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the employees manager?',
                    choices: mgrChoices
                },
            ])
                .then((answers) => {

                    if (answers.manager === "") {
                        answers.manager = 0
                    }
                    let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', '${answers.role}', '${answers.manager}');`;
                    db.promise().query(query).then(function (err, res) {
                        if (err) {
                            // console.error(err);
                        }

                        console.log('Employee Added Successfully');
                        init();
                    });

                });
        });

    });

}

function addRole() {
    db.query('SELECT id, name FROM department', (err, data) => {
        if (err) throw err;
        //looping through all the rows from the database and selcting only id and title 
        const deptChoices = data.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'new_role',
                message: 'What new role would you like to add?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: deptChoices
            },
        ])
            .then((answers) => {
                let query = `INSERT INTO role (title, salary, department_id) VALUES ('${answers.new_role}', ${answers.salary}, ${answers.department})`;
                db.promise().query(query).then(function (err, res) {
                    if (err) {
                        // console.error(err);
                    }
                    // console.log(res);
                    console.log('Successful Addition');
                    init();
                });
            })
    });
}

function addDepartment() {
    
        inquirer.prompt([
            {
                type: 'input',
                name: 'new_department',
                message: 'What new department would you like to add?',
            },
            
        ])
        .then((answers) => {
            let query = `INSERT INTO department (name) VALUES ('${answers.new_department}')`;
            db.promise().query(query).then(function (err, res) {
                if (err) {
                    // console.error(err);
                }
                // console.log(res);
                console.log('Successful Addition');
                init();
            });
        })
    }
function viewEmployees() {
    db.query('SELECT * FROM employee', (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
}

function viewDept() {
    db.query('SELECT * FROM department', (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
}

function viewRoles() {
    db.query('SELECT * FROM role', (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    });
}

function finish() {
    console.log('Fin')
};

// init();
