CREATE TABLE IF NOT EXISTS users (
  id                 INT NOT NULL AUTO_INCREMENT,
  email              VARCHAR(255) NOT NULL UNIQUE,
  password_hash      VARCHAR(255) NOT NULL,
  first_name         VARCHAR(200) NOT NULL,
  last_name          VARCHAR(200) NOT NULL,
  bio                VARCHAR(200) NOT NULL,
  type               ENUM('Admin', 'User'),
  picture            VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);