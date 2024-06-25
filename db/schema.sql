-- Create company Database

DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

\c company;

-- Departments Table
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Roles Table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary NUMERIC NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Employees Table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);