const mysql = require('mysql2');
const inquirer = require('inquirer');
const ct = require('console.table');
const figlet = require('figlet');

// create the connection to database
const con = mysql.createConnection({
  host: 'localhost',
  user: 'runSQL',
  password: '123',
  database: 'employee_db',
});

con.connect((err) => {
  if (err) throw err;
  figlet.text(
    'Employee Tracker',
    {
      font: 'speed',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log('ascii art error');
      } else {
        console.log('           ');
        console.log(data);
        console.log('           ');
      }
      init();
    }
  );
});

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
          'Delete a Department',
          'Delete a Role',
          'Delete an Employee',
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
      if (selection.choices === 'Delete a Department') {
        deleteDep();
      }
      if (selection.choices === 'Delete a Role') {
        deleteRole();
      }
      if (selection.choices === 'Delete an Employee') {
        deleteEmp();
      }
    });
}

function showEmployees() {
  const sql =
    'SELECT employee.id AS "ID #", employee.first_name AS "First Name", employee.last_name AS "Last Name", roles.salary AS "$alary", roles.title AS "Title", department.name AS "Department", CONCAT(manager.first_name,manager.last_name) AS "Manager", employee.manager_id AS "Manager ID #"  FROM employee LEFT JOIN roles ON roles.id = employee.role_id LEFT JOIN department ON department.id = roles.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id';
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
    init();
  });
}

//presented names and ids
function showDepts() {
  const sql =
    'SELECT department.id AS "ID #", department.name AS "Department" FROM department';
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
    init();
  });
}

function showRoles() {
  const sql =
    'SELECT roles.id AS "ID #", roles.title AS "Role", department.name AS "Department", roles.salary AS "Salary"  FROM roles LEFT JOIN department ON roles.department_id = department.id';
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
    init();
  });
}

//-------------------------------------------
//--------MANAGER INFO-----------------------
//-------------------------------------------

let managerArr = [];
function chooseManager() {
  (sqlM =
    'SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL'),
    con.query(sqlM, function (err, response) {
      if (err) throw err;
      // console.log(response);
      for (let i = 0; i < response.length; i++) {
        // console.log(response[i].first_name, response[i].last_name);
        managerFirst = response[i].first_name;
        managerLast = response[i].last_name;
        managerArr.push({
          name: `${managerFirst} ${managerLast}`,
          value: response[i].id,
        });
        // console.log(managerArr);
      }
    });
  return managerArr;
}

//-------------------------------------------
//--------ADD EMPLOYEE-----------------------
//-------------------------------------------

function addEmp() {
  const sqlR = 'SELECT * FROM roles';
  con.query(sqlR, function (err, result) {
    if (err) throw err;
    const roleArr = [];
    for (i = 0; i < result.length; i++) {
      roleTitle = result[i].title;
      roleID = result[i].id;
      roleArr.push({ name: roleTitle, value: roleID });
    }

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
        {
          type: 'list',
          name: 'manager_id',
          message: "Choose employee's manager",
          choices: chooseManager(),
        },
      ])
      .then(function (choices) {
        console.log(choices);

        con.query('INSERT INTO employee SET ?', {
          first_name: choices.first_name,
          last_name: choices.last_name,
          role_id: choices.role_id,
          manager_id: choices.manager_id,
        });

        console.log(
          `${choices.first_name} ${choices.last_name} has been added`
        );
      });
  });
}

//-------------------------------------------
//--------ADD ROLE---------------------------
//-------------------------------------------

function addRole() {
  const sqlA = 'SELECT * FROM department';
  con.query(sqlA, function (err, result) {
    if (err) throw err;
    const depArr = [];
    for (i = 0; i < result.length; i++) {
      depName = result[i].name;
      depID = result[i].id;
      depArr.push({ name: depName, value: depID });
    }
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
          message: 'Choose a department',
          choices: depArr,
        },
      ])
      .then(function (choices) {
        console.log(choices.role_name, choices.role_salary, choices.dep_id);

        con.query('INSERT INTO roles SET ?', {
          title: choices.role_name,
          salary: choices.role_salary,
          department_id: choices.dep_id,
        });
      });
  });
}

//-------------------------------------------
//--------ADD DEPARTMENT---------------------
//-------------------------------------------

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
      console.log(`The ${input.dep_name} department has been added`);

      con.query('INSERT INTO department SET ?', {
        name: input.dep_name,
      });
    });
}

//-------------------------------------------
//--------UPDATE EMPLOYEE ROLE---------------
//-------------------------------------------

function updateRoleName() {
  const sqlUrole = 'SELECT * FROM employee';
  con.query(sqlUrole, function (err, result) {
    if (err) throw err;
    const uroleArr = [];
    for (i = 0; i < result.length; i++) {
      firstName = result[i].first_name;
      lastName = result[i].last_name;
      uroleArr.push({
        name: `${firstName} ${lastName}`,
        value: { firstName, lastName },
      });
    }

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
      roleArr.push({ name: roleTitle, value: roleID });
    }
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee_role',
          message: 'Choose a new role for this employee',
          choices: roleArr,
        },
      ])
      .then(function (roleChoices) {
        return updateTable(nameChoices, roleChoices);
      });
  });
}

function updateTable(nameChoices, roleChoices) {
  const sqlUpdate = `UPDATE employee SET role_id = ?  WHERE last_name = ?`;
  const empVals = [
    roleChoices.employee_role,
    nameChoices.employee_name.lastName,
  ];
  con.query(sqlUpdate, empVals, (err, response) => {
    if (err) throw err;
    console.log('Employee role has been successfully changed');
  });
}

//-------------------------------------------
//--------DELETE FUNCTIONS-------------------
//-------------------------------------------

function deleteDep() {
  const sqlA = 'SELECT * FROM department';
  con.query(sqlA, function (err, result) {
    if (err) throw err;
    const depArr = [];
    for (i = 0; i < result.length; i++) {
      depName = result[i].name;
      depID = result[i].id;
      depArr.push({ name: depName, value: depID });
    }
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'dep_id',
          message: 'Choose a department',
          choices: depArr,
        },
      ])
      .then(function (choices) {
        console.log(choices.role_name, choices.role_salary, choices.dep_id);

        con.query(
          'DELETE FROM department WHERE id=?',
          choices.dep_id,
          (err, response) => {
            if (err) throw err;
            console.log('Department Deleted!');
            init();
          }
        );
      });
  });
}

function deleteRole() {
  const sqlR = 'SELECT * FROM roles';
  con.query(sqlR, function (err, result) {
    if (err) throw err;
    const roleArr = [];
    for (i = 0; i < result.length; i++) {
      roleTitle = result[i].title;
      roleID = result[i].id;
      roleArr.push({ name: roleTitle, value: roleID });
    }
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee_role',
          message: 'Choose a role to delete',
          choices: roleArr,
        },
      ])
      .then(function (roleChoices) {
        con.query(
          'DELETE FROM roles WHERE id=?',
          roleChoices.employee_role,
          (err, response) => {
            console.log('Role deleted!');
          }
        );
      });
  });
}
