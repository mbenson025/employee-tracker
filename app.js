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

// showEmployees();
// showDepts();
// showRoles();

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
          'Update an Employee',
        ],
      },
    ])
    .then(function (selection) {
      console.log(selection.choices);
      if (selection.choices === 'View all Employees') {
        showEmployees();
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
