const mysql = require('mysql2');
const inquirer = require('inquirer');
const ct = require('console.table');

// create the connection to database
const con = mysql.createConnection({
  host: 'localhost',
  user: 'runSQL',
  password: '123',
  database: 'employee_db',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Wow!');
});

init();
function init() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choices',
        message: 'Choose an option',
        choices: [
          'View all Employees',
          'View all Departments',
          'View all Roles',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
        ],
      },
    ])
    .then(function (selection) {
      console.log(selection.choices);
      if (selection.choices === 'View all Employees') {
        showEmployees();
      }
      if (selection.choices === 'View all Departments') {
        showDepts();
      }
      if (selection.choices === 'View all Roles') {
        showRoles();
      }
      if (selection.choices === 'Add a Role') {
        addRole();
      }
      if (selection.choices === 'Add a Department') {
        addDept();
      }
      if (selection.choices === 'Add an Employee') {
        addEmp();
      }
      if (selection.choices === 'Update an Employee Role') {
        updateRole();
      }
    });
}

function showEmployees() {
  const sql = 'SELECT * FROM employee';
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
  });
}

function showDepts() {
  const sql = 'SELECT * FROM department';
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
  });
}

function showRoles() {
  const sql = 'SELECT * FROM roles';
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
  });
}

//-------------------------------------------------------------------------------

function addEmp() {
  // const sqlR = 'SELECT * FROM roles';
  // con.query(sqlR, function (err, result) {
  //   if (err) throw err;
  //   // console.log(result);
  //   console.table(result);
  // })
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name",
      },
      {
        type: 'list',
        name: 'chooseRole',
        message: "Choose the employee's Role",
        choices: ['engineer'],
      },
    ])
    .then(function (choices) {
      console.log(choices);
    });
  // const sql =
  //   'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("", "", 3, 4)';
}

function addRole() {
  const sql =
    'INSERT INTO roles (title, salary, department_id) VALUES ("", "", 1)';
}
function addDept() {
  const sql = 'INSERT INTO department (name) VALUES ("")';
}
function updateRole() {
  const sql =
    'UPDATE employee SET first_name =(""), last_name = (""), role_id = 1, manager_id =1';
}
