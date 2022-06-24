INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Paul", "Allen", 1, 4),
      ("Patrick", "Bateman", 1, 9),
      ("Timothy", "Bryce", 4, null),
      ("Donald", "Kimball", 5, null),
      ("Harold", "Cranes", 2, 3),
      ("Luis", "Carruthers", 3, 4),
      ("Craig", "McDermott", 4, 9),
      ("Evelyn", "Williams", 5, 3),
      ("David", "VanPatten", 2, null),
      ("Courtney", "Rawlinson", 3, 9);

INSERT INTO roles (title, salary, department_id)
VALUES ( "Executive Manager", 600000, 1 ),
      ( "Vice President", 450000, 1 ),
      ( "Engineer", 250000, 6),
      ( "Assistant", 60000, 3),
      ( "Developer", 90000, 7);

INSERT INTO department (name)
VALUES ( "Mergers and Acquisitions"),
      ( "Finance"),
      ( "Human Resources"),
      ( "Research"),
      ( "Quality Management"),
      ( "Production"),
      ( "Development");