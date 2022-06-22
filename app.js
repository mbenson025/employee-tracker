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
        updateRoleName();
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
  const sqlR = 'SELECT * FROM roles';
  con.query(sqlR, function (err, result) {
    if (err) throw err;
    const roleArr = [];
    for (i = 0; i < result.length; i++) {
      roleTitle = result[i].title;
      roleID = result[i].id;
      console.log(roleTitle, roleID);
      roleArr.push({ name: roleTitle, value: roleID });
    }
    console.log(roleArr);

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
          name: 'role_id',
          message: "Choose the employee's Role",
          choices: roleArr,
        },
        //manager_id must be integer for field value
        {
          type: 'input',
          name: 'manager_id',
          message: "Enter the employee's manager ID(if applicable)",
        },
      ])
      .then(function (choices) {
        console.log(
          choices.first_name,
          choices.last_name,
          choices.role_id,
          choices.manager_id
        );

        const sql = con.query('INSERT INTO employee SET ?', {
          first_name: choices.first_name,
          last_name: choices.last_name,
          role_id: choices.role_id,
          manager_id: choices.manager_id,
        });

        con.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        });
      });
  });
}

function addRole() {
  const sqlA = 'SELECT * FROM department';
  con.query(sqlA, function (err, result) {
    if (err) throw err;
    const depArr = [];
    for (i = 0; i < result.length; i++) {
      // console.log(result);
      depName = result[i].name;
      depID = result[i].id;
      // console.log(depName, depID);
      depArr.push({ name: depName, value: depID });
    }
    // console.log(depArr);
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'role_name',
          message: 'Enter the name of the role you want to add',
        },
        {
          type: 'input',
          name: 'role_salary',
          message: 'Enter the salary for the role',
        },
        {
          type: 'list',
          name: 'dep_id',
          message: 'Department. Choose one',
          choices: depArr,
        },
      ])
      .then(function (choices) {
        // console.log(choices);
        console.log(choices.role_name, choices.role_salary, choices.dep_id);

        const sqlAr = con.query('INSERT INTO roles SET ?', {
          title: choices.role_name,
          salary: choices.role_salary,
          department_id: choices.dep_id,
        });
        con.query(sqlAr, function (err, result) {
          if (err) throw err;
          console.table(result);
        });
      });
  });
}
function addDept() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'dep_name',
        message: 'Enter the name of the department you would like to add',
      },
    ])
    .then(function (input) {
      console.log(input);

      const sqlDep = con.query('INSERT INTO department SET ?', {
        name: input.dep_name,
      });
      con.query(sqlDep, function (err, result) {
        if (err) throw err;
        console.table(result);
      });
    });
}

function updateRoleName() {
  const sqlUrole = 'SELECT * FROM employee';
  con.query(sqlUrole, function (err, result) {
    if (err) throw err;
    const uroleArr = [];
    for (i = 0; i < result.length; i++) {
      firstName = result[i].first_name;
      lastName = result[i].last_name;
      console.log(firstName, lastName);
      uroleArr.push({ name: `${firstName} ${lastName}` });
    }
    console.log(uroleArr);

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee_name',
          message: 'Choose an employee to update their role',
          choices: uroleArr,
        },
      ])
      .then(function (nameChoices) {
        console.log(nameChoices);
        return updateEmpRole(nameChoices);
      });
  });
}

function updateEmpRole(nameChoices) {
  const sqlR = 'SELECT * FROM roles';
  con.query(sqlR, function (err, result) {
    if (err) throw err;
    const roleArr = [];
    for (i = 0; i < result.length; i++) {
      roleTitle = result[i].title;
      roleID = result[i].id;
      console.log(roleTitle, roleID);
      roleArr.push({ name: roleTitle, value: roleID });
    }
    console.log(roleArr);
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee_role',
          message: 'Choose a role',
          choices: roleArr,
        },
      ])
      .then(function (roleChoices) {
        console.log(roleChoices);
        return updateEmpManager(nameChoices, roleChoices);
      });
  });
}

function updateEmpManager(nameChoices, roleChoices) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager ID for this employee',
      },
    ])
    .then(function (managerOption) {
      console.log(nameChoices, roleChoices, managerOption);
    });
  const sqlUpdate = con.query('UPDATE employee SET ?', {
    first_name: choices.first_name,
    last_name: choices.last_name,
    role_id: choices.role_id,
    manager_id: choices.manager_id,
  });
}
