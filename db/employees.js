const db = require('./connection');
const inquirer = require('inquirer');
const {viewRoles} = require('./roles');
const { removeListener } = require('./connection');

async function viewEmployees() {
    try{
        const employee =
            await db.query('SELECT employee.id, employee.first_name, role.title, role.salary, employee.manager_id FROM employee LEFT JOIN role ON role.id = employee.role_id')
                return employee
    } catch (err) {
        console.log(err)
    }
}

async function addEmployee() {
    try {
        const roles = await viewRoles();
        const employee = await viewEmployees();
        const {
            firstName,
            lastName,
            role,
            manager

        } = await inquirer.prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'What is the first name of the employee?',
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'What is the last name of the employee?',
            },
            {
              type: 'list',
              name: 'role',
              message: "What is this employee's role?",
              choices: roles.map(role => {
                return {
                    value: role.id,
                    name: role.title
                };
              }),
            },
            {
              type: 'list',
              name: 'manager',
              message: "who is this employee's manager?",
              choices: [
                ...viewEmployees.map((e) => {
                    return {
                        value: e.id,
                        name: `${e.first_name} ${e.last_name}`
                    };
                }),
            {
                value: null,
                name: 'No manager'
            }
              ]  
            }
        ])
await db.query(`INSERT into empoyee (first_name, las_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}"), "(${role})", "(${manager})"`)
const newEmployees = await viewEmployees()
return newEmployees 
}catch (err) {
  console.log(err)
}
}

async function updateEmploee() {
  try {
    const currentEmployee = await viewEmployees();
    const employeeRoles = await viewRoles();
    const {employee, newRole} = await inquirer.promt([
      {
        type: 'list',
        name: 'employee',
        message: 'which employee should be updated?',
        choices: currentEmployee.map((e) => {
          return {
            name: `${e.first_name} ${e.last_name}`,
            value: e.id,
          };
        }),
      },
      {
        type: 'list',
        name: 'newRole',
        message: "what is the employee's new role?",
        choices: employeeRoles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        }),
      },
    ]);
    
await db.query(
  `UPDATE employee SET role_id = ${newRole} WHERE id = ${employee}`
);
const updatedEmployee = await viewEmployees();
return await updatedEmployee;
  } catch (err) {
    console.log(err);
  }
}