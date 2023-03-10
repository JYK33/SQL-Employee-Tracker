const db = require("./connection");
const inquirer = require("inquirer");


async function viewDepartments() {
    try{
        const departments = 
        await db.query("SELECT * FROM department")
                return departments;
    } catch (err){
    console.log(err)
    }    
}

async function addDepartment () {
    try {
        const departments = await viewDepartments();
        const {
            name,
        } = await inquirer.prompt ([
            {
                type: 'input',
                message: 'Which department should be added?',
                name: 'name',
            }
        ])
        await db.query(`INSERT into department (name) VALUES ("${name}")`)
        const newDepartment = await viewDepartments();
        return newDepartment       
    }catch (err){
        console.log(err);
    }
}

async function removeDepartment() {
    try {
        const viewAllDepartments = await viewDepartments();
        // console.log(viewAllDepartments)
        const {id} = await inquirer.prompt([
            {
                type: 'list',
                message: 'which department should be deleted?',
                name: 'id',
                choices: viewAllDepartments.map((department) => {
                    return {
                        name : department.name,
                        value : department.id
                    };
                }),
            },
        ]);
        await db.query(`DELETE FROM department WHERE id = ${id}`);
        return await viewDepartments();
    }catch (err){
        console.log(err);
    }
}

module.exports = {viewDepartments, addDepartment, removeDepartment}