USE employee_tracker;

INSERT INTO department (name) VALUES
    ('Sales'),
    ('Finance'),
    ('Legal'),
    ('Engineering');


    INSERT INTO roles (title, department_id ,salary) VALUES 
        ('Software Engineer', 4, 120000),
        ('Lead Engineer', 4, 160000),
        ('Salesperson', 1, 80000),
        ('Sales Lead', 1, 100000),
        ('Account Manager', 2, 150000),
        ('Accountant', 2, 115000),
        ('Legal Team Lead', 3, 250000),
        ('Lawyer', 3, 180000);

        INSERT INTO employee (
            
            first_name,
            last_name,
            roles_id,
            manager_id
        ) VALUES 
            ('Brandon', 'Myers',1 , NULL ),
            ('Drew', 'Davis', 2, NULL),
            ('Kaze', 'Haya', 3, 1),
            ('Ami', 'Marie', 4, 1 ),
            ('Tate', 'Dingleberry', 5, 2),
            ('Jagger', 'Goldstein', 6, NULL),
            ('Raven', 'Resme', 7, 1),
            ('Peter', 'Griffin',8, NULL);
            



