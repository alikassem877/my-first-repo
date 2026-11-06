-- 1. Create database
-- Run this separately in pgAdmin:
CREATE DATABASE portfolio_db;


-- 2. Create tables

CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    stars INTEGER DEFAULT 0,
    user_id INTEGER REFERENCES users(id)
);


-- 3. Insert users

INSERT INTO users (name, email)
VALUES
    ('John Doe', 'john.doe@example.com'),
    ('Jane Smith', 'jane.smith@example.com'),
    ('Bob Johnson', 'bob.johnson@example.com');


-- Insert projects

INSERT INTO projects (title, stars, user_id)
VALUES
    ('Portfolio Website', 25, 1),
    ('E-commerce API', 12, 1),
    ('Task Manager', 4, 1),
    ('Weather App', 8, 2),
    ('Blog Platform', 3, 2),
    ('Chat Application', 15, 2);


-- 4. Queries

-- Projects with more than 5 stars
SELECT *
FROM projects
WHERE stars > 5
ORDER BY stars DESC;


-- Each project with its owner's name (INNER JOIN)
SELECT p.title, p.stars, u.name
FROM projects AS p
INNER JOIN users AS u
ON u.id = p.user_id;


-- Every user, including users without projects (LEFT JOIN)
SELECT u.name, p.title
FROM users AS u
LEFT JOIN projects AS p
ON u.id = p.user_id
ORDER BY u.id, p.id;


-- Number of projects and total stars per user
SELECT
    u.name,
    COUNT(p.id) AS project_count,
    COALESCE(SUM(p.stars), 0) AS total_stars
FROM users AS u
LEFT JOIN projects AS p
ON u.id = p.user_id
GROUP BY u.id, u.name
ORDER BY u.id;


-- Users with more than one project (HAVING)
SELECT
    u.name,
    COUNT(p.id) AS project_count
FROM users AS u
LEFT JOIN projects AS p
ON u.id = p.user_id
GROUP BY u.id, u.name
HAVING COUNT(p.id) > 1
ORDER BY u.id;


-- 5. Create index

CREATE INDEX idx_projects_user_id
ON projects(user_id);


-- 6. Transaction with COMMIT

BEGIN;

UPDATE projects
SET stars = stars + 10
WHERE id = 1;

UPDATE projects
SET stars = stars - 10
WHERE id = 2;

COMMIT;


-- Transaction with ROLLBACK

BEGIN;

UPDATE projects
SET stars = stars + 10
WHERE id = 1;

UPDATE projects
SET stars = stars - 10
WHERE id = 2;

ROLLBACK;


-- 7. Test foreign key constraint
-- Run this separately to see the error.
-- It is intentionally commented out so it won't interrupt the script.

-- INSERT INTO projects (title, stars, user_id)
-- VALUES ('Invalid Owner Project', 10, 99999);