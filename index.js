const { prompt } = require("inquirer");
const db = require("./db/connection");
const {veiwDepartments, addDepartments, removeDepartments} = require("./db/departments");

const start = () => {
    console.log("Welcome to the Employee Manager!");
}

start();
