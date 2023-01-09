const { prompt } = require("inquirer");
const db = require("./db/connection");
const {viewDepartments, addDepartment, removeDepartment} = require("./db/departments");
const {viewEmployees, addEmployee, updateEmployee, removeEmployee} = require("./db/employees");
const {viewRoles, addRole, removeRole} = require("./db/roles");

const start = async (s) => {
    console.log("Welcome to the Employee Manager!");
     const {choice} = await prompt ([
        {
            type: 'list',
            message: 'What do you want to?',
            name: 'choices',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee',
                'Remove an employee',
                'Remove a department',
                'Remove a role',
                'Exit',
            ]
        }
     ])
}

start();
