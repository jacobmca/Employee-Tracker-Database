\c company;

-- Insert Departments Data

INSERT INTO departments (name) VALUES
('Sales'),
('IT'),
('HR');

-- Insert Roles Data

INSERT INTO roles (title, salary, department_id) VALUES
('Manager', 80000, 1),
('Salesperson', 70000, 2),
('Intern', 5000, 3);

-- Insert Employees Data

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Joe', 'Smith', 1, NULL),
('Tim', 'Nathan', 2, 1),
('Tahu', 'Nuva', 3, NULL);