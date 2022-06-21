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

showEmployees();
showDepts();

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
