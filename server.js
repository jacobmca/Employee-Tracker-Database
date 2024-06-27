import inquirer from 'inquirer';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

// Load Environmental Variables

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT,
});

// Connect to the Database

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack));

// Command Line Options

const options = () => {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "options",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Exit"],
    }).then((answer) => {
        switch (answer.options) {
            case "View all departments":
                viewAllDepartments();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "View all employees":
                viewAllEmployees();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateEmployeeRole();
                break;
            case "Exit":
                client.end();
                break;
        }
    })
};

// View All Departments

const viewAllDepartments = () => {
    client.query('SELECT * FROM departments', (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.table(res.rows);
        }
        options();
    });
};

// View All Roles

const viewAllRoles = () => {
    const query = `
        SELECT roles.id, roles.title, departments.name AS department, roles.salary
        FROM roles
        JOIN departments ON roles.department_id = departments.id;
    `;
     client.query(query, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.table(res.rows);
        }
        options();
    });
};

// View All Employees

const viewAllEmployees = () => {
    const query = `
        SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
               CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employees e
        JOIN roles r ON e.role_id = r.id
        JOIN departments d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id;
    `;
     client.query(query, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            res.rows.forEach(row => {
                if (!row.manager) {
                    row.manager = 'None';
                }
            })
            console.table(res.rows);
        }
        options();
    });
};

// Add a Department

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]).then((answer) => {
        const query = 'INSERT INTO departments (name) VALUES ($1)';
        client.query(query, [answer.name], (err, res) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Department ${answer.name} added successfully.`);
            }
            options();
        });
    });
};

// Add a role

const addRole = () => {
    client.query('SELECT * FROM departments', (err, res) => {
        if (err) {
            console.error(err);
            options();
        } else {
            const departments = res.rows.map(department => ({
                name: department.name,
                value: department.id
            }));
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'role_name',
                    message: 'Enter the role you wish to create:'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for this role:'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Enter the department this role is in:',
                    choices: departments
                }
            ]).then((answer) => {
                const query = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)';
                client.query(query, [answer.role_name, answer.salary, answer.department_id], (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`${answer.role_name} role successfully added.`);
                    }
                    options();
                });
            });
        };
    });
};

// Add employee

const addEmployee = () => {
    const queryRoles = 'SELECT * FROM roles';
    const queryEmployees = 'SELECT * FROM employees';

    client.query(queryRoles, (errRoles, resRoles) => {
        if (errRoles) {
            console.error(errRoles);
            options();
        } else {
            const roles = resRoles.rows.map(role => ({
                name: role.title,
                value: role.id
            }));

            client.query(queryEmployees, (errEmployees, resEmployees) => {
                if (errEmployees) {
                    console.error(errEmployees);
                    options();
                } else {
                    const managers = resEmployees.rows.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }))

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'first_name',
                            message: 'Enter the employee\'s first name:'
                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'Enter the employee\'s last name:'
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            message: 'Enter the department this role is in:',
                            choices: roles
                        },
                        {
                            type: 'list',
                            name: 'employee_id',
                            message: 'Enter the employee\'s manager:',
                            choices: managers
                        },
                    ]).then((answer) => {
                        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
                        client.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.employee_id], (err, res) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(`Employee ${answer.first_name} ${answer.last_name} successfully added.`);
                            }
                            options();
                        });
                    });
                };
            });
        };
    });
};

// Update an Employee Role

const updateEmployeeRole = () => {
    const queryRoles = 'SELECT * FROM roles';
    const queryEmployees = 'SELECT * FROM employees';

    client.query(queryRoles, (errRoles, resRoles) => {
        if (errRoles) {
            console.error(errRoles);
            options();
        } else {
            const roles = resRoles.rows.map(role => ({
                name: role.title,
                value: role.id
            }));

            client.query(queryEmployees, (errEmployees, resEmployees) => {
                if (errEmployees) {
                    console.error(errEmployees);
                    options();
                } else {
                    const employees = resEmployees.rows.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }))

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employee_id',
                            message: 'Select the employee you wish to update:',
                            choices: employees
                        },
                        {
                            type: 'list',
                            name: 'role_id',
                            message: 'Select the employee\'s updated role:',
                            choices: roles
                        },
                    ]).then((answer) => {
                        const query = 'UPDATE employees SET role_id = $1 WHERE id = $2';
                        client.query(query, [answer.role_id, answer.employee_id], (err, res) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(`${answer.employee_id}\'s role successfully added.`);
                            }
                            options();
                        });
                    });
                };
            });
        };
    });
};

// Call to start application
options();