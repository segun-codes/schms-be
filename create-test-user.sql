-- Drop user first if they exist
DROP USER if exists 'schmbe_test'@'localhost' ;

-- Now create user with prop privileges
CREATE USER 'schmbe_test'@'localhost' IDENTIFIED BY 'schmbe_test';

GRANT ALL PRIVILEGES ON * . * TO 'schmbe_test'@'localhost';