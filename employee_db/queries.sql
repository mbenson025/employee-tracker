-- SELECT *
-- FROM course_names;

-- SELECT department, COUNT(id) AS number_courses
-- FROM course_names
-- GROUP BY department;

-- SELECT department, SUM(total_enrolled) AS sum_enrolled
-- FROM course_names
-- GROUP BY department;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("CECY", "FLORES", 3, 4);