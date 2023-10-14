const inquirer = require('inquirer');
const mysql = require('mysql2');
require(
    "dotenv"
).config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_tracker'
    },
    console.log('successfully connected.')
);
function showOptions(){
    inquirer.prompt({
        name : 'choice',
        message: 'pleae make a choice',
        type: 'list',
        choices: ['View Departments','Add Department','View Roles', 'Add Role', 'View Employees', 'Add Employee', 'Update Employee Role']
    }).then(answer => {
        switch (answer.choice) {
            case 'View Departments':
                 getDepartments()
                 break
            case 'Add Department':
                addDepartment()
                break
            case 'View Roles':
                getRoles()
                break
            case 'Add Role':
                addRole()
                break
            case 'View Employees':
                getEmployees()
                break
            case 'Add Employee':
                addEmployee()
                break
            case 'Update Employee Role':
                updateEmployee()
                break
            default:
                db.end()
                break
        }
    })
}

function getDepartments(){
    db.query('SELECT * FROM department', function (err, results){
        if (err){
            console.log(err);
        }
            

        console.table(results);
            return showOptions()
    })
}

function addDepartment(){
    inquirer.prompt([
       { name: 'name',
        message: 'please enter new department name.',}
    ]).then(answer => {
        db.query('INSERT INTO department (name) VALUES (?)', [answer.name], function (err, results){
            if (err){
                console.log(err);
            }
            console.table(results)
                return showOptions()
        })
    })
}





function getRoles(){
    db.query('SELECT * FROM roles',function (err, results){
        if (err){
            console.log(err);
        }
        console.table(results);
            return showOptions()
    })
}

function addRole(){
    inquirer.prompt([
        {
            name: 'title',
            message: 'Please enter the role title.',
        },
        {
            name: 'salary',
            message: 'Please enter role salary.',
        },
        {
            name: 'department_id',
            message: 'Please enter the department ID for this role.',
        }
    ]).then(answer=>{
        db.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)',
            [answer.title, answer.salary, answer.department_id], function (err, results) {
                if (err) {
                        console.log(err);
                }
                console.log(results);
                    return showOptions() 
            });
    });

 }


function getEmployees(){
    db.query('SELECT * FROM employee', function (err, results){
        if (err){
            console.log(err);
        }
        console.table(results);
            return showOptions()
    })
}

function addEmployee(){
    inquirer.prompt([
        {
            name: 'first_name',
            message: 'Please enter employee first name.',
        },
        {
            name: 'last_name',
            message:'please enter employee last name.',
        },
        {
            name: 'role_id',
            message:'please enter role ID for this employee.'
        },
        {
            name: 'manager_id',
            message: 'please enter manager Id for thsi employee',
        }
    ]).then(answer => {
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.log(results);
                showOptions();
            });
    });
    
 }


function updateEmployee(){
    inquirer.prompt([
        {
            name: 'employee_id',
            message: 'please enter the id of the employee you want to update',
        },
        {
            name: 'new_role_id',
            message: 'please enter the new role id for the employee:',
        },
    ]).then(answer => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.new_role_id, answer.employee_id], function (err, results) {
            if (err) {
                console.log(err);
            }else {
                if (resulsts.affectedRows === 0) {
                    console.log("No employee found with that ID.");
                }else {
                    console.log("employee's role updated successfully.");
                }
            }
            showOptions();
        });
    });
}

showOptions()


// db.query(`DELETE FROM favorite_books WHERE id = ?`, deletedRow, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });
  
//   // Query database
//   db.query('SELECT * FROM favorite_books', function (err, results) {
//     console.log(results);
//   });