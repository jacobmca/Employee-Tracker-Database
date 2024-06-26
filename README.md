# Employee-Tracker-Database
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Table of Contents
* [Installation](#installation)
* [Description](#description)
* [Usage](#usage)
* [Contributions](#contributions)
* [License](#license)
* [Credits](#credits)
* [Tests](#tests)
* [Questions](#questions)

## Installation
To install, please clone this repository to your computer using the following steps in Github:

1. Click the "Code" dropdown menu and copy the SSH URL.
2. Open your terminal and navigate to the directory you would like to clone this repository into.
3. Type "git clone <paste SSH URL>", replacing <paste SSH URL> with your copied SSH URL. You can substitute an SSH URL with an HTTPS URL.
4. Press enter.

## Description
This is an node/SQL-based employee tracking program that creates a database tracking yor company's departments, roles and employees via a SQL database.

Using inquirer terminal commands, the user is not only able to view the company's departments, roles, and employees, but also add departments, roles, and employees. You can also update an employee's role within the company.

## Usage
First, ensure that the SQL database "company" is running by entering the following commands via the terminal:

psql -U postgres
\i database/schema.sql
\dt

![Screenshot](assets/screenshots/screenshot1.png)

Once you have confirmed the database is running, navigate to server.js in your terminal and enter "node server.js" to get the program running.

In your terminal, a list of commands will appear that you can navigate to. To select, scrolling over the desired command and press "enter."

![Screenshot](assets/screenshots/screenshot1.png)

If you select "Add a department," follow the prompt to enter the name for the new department you are adding to the database.

If you select "Add a role," follow the prompts to enter the name, salary, and department for the new role you are adding to the database.

If you select "Add an employee," follow the prompts to enter the first name, last name, department, and manager for the new employee you are adding to the database.

If you select "Update an employee role," follow the prompts to select the employee and the employee's new role.

To exit the program, select "Exit" in the main list of prompts.

## Contributions
When contributing to this repository, please reach out to me via e-mail to discuss the change you would like to make first. I am open to ideas both with regards to data stored in the tables and alterations to user interaction with the data.

## License
This project is licensed under the MIT License. For more information, please see the [MIT License](https://opensource.org/licenses/MIT).

## Credits
This program was created by Jacob McAuliffe for the UC Berkeley eDX Coding Boot Camp.

## Tests
In the future, I would like to incorporate both more data within the tables, and further opportunities for user interaction with this data. Ideas for further data within the table include employment start date, list of any recognitions, vacation time available for the employee, annual bonus. Ideas for user interaction include being able to delete data from the tables, or extra data to create sub-tables within the database as needed.

## Questions
If you have further questions, you can reach me at [mcauliffemedia@gmail.com](mailto:mcauliffemedia@gmail.com).

GitHub Account: [jacobmca](https://github.com/jacobmca)
