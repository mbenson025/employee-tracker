INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Paul", "Allen", 1, 1),
      ("Patrick", "Bateman", 1, 2),
      ("Timothy", "Bryce", 4, 3),
      ("Donald", "Kimball", 5, 4),
      ("Harold", "Cranes", 2, 5),
      ("Luis", "Carruthers", 3, null),
      ("Craig", "McDermott", 4, null),
      ("Evelyn", "Williams", 5, null),
      ("David", "VanPatten", 2, null),
      ("Courtney", "Rawlinson", 3, null);

INSERT INTO roles (title, salary, department_id)
VALUES ( "Executive Manager", 600000, 1 ),
       ( "Vice President", 450000, 1 ),
       ( "Engineer", 250000, 6),
       ( "Assistant", 60000, 3),
       ( "Developer", 90000, 7);

INSERT INTO department (name)
VALUES ( "Mergers and Aquisitions"),
       ( "Finance"),
       ( "Human Resources"),
       ( "Research"),
       ( "Quality Management"),
       ( "Production"),
       ( "Development");