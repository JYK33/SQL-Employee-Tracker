const {prompt, default:inquirer} = require("inquirer");
const db = require("./db/connection");
const {viewDepartments, addDepartment, removeDepartment} = require("./db/departments");
const {viewEmployees, addEmployee, updateEmployee, removeEmployee} = require("./db/employees");
const {viewRoles, addRole, removeRole} = require("./db/roles");

const start = async (s) => {
   if (s) console.log("Welcome to the Employee Manager!");
     const {choice} = await prompt ([
        {
            type: 'list',
            message: 'What do you want to?',
            name: 'choice',
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

console.log(choice)
switch (choice) {
    case "View all departments":
        const departments = await viewDepartments()
        console.table(departments)
        break;
    case "View all roles":
        const roles = await viewRoles()
        console.table(roles)
        break;
    case "View all employees":
        const employees = await viewEmployees()
        console.table(employees)
        break;
    case "Add a department":
        const newDepartment = await addDepartment()
        console.table(newDepartment)
        break;
    case "Add a role":
        const newRole = await addRole()
        console.table(newRole)
        break;
    case "Add an employee":
        const newEmployees = await addEmployee()
        console.table(newEmployees)
        break;
    case "Update employee role":
        const updatedEmployee = await updateEmployee()
        console.table(updatedEmployee)
        break;
    case "Remove an Employee":
        const removedEmployee = await removeEmployee()
        console.table(removedEmployee)
        break;
    case "Delete a Department":
        const removedDepartment = await removeDepartment()
        console.table(removedDepartment)
        break;
    case "Delete a Role":
        const removedRole = await removeRole()
        console.table(removedRole)
        break;
    case "Exit":
        console.log("GoodBye!");
        process.exit();
}     
start(false);
}
start(true);
