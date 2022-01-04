CREATE TABLE IF NOT EXISTS pets (
  id                            int NOT NULL AUTO_INCREMENT,
  name                          VARCHAR(200) NOT NULL,
  type                          VARCHAR(200) NOT NULL,
  bio                           VARCHAR(200) NOT NULL,
  adoption_status               ENUM('Available', 'Adopted', 'Fostered') NOT NULL,
  picture                       VARCHAR(200) NOT NULL,
  height                        INT NOT NULL,
  weight                        INT NOT NULL,
  color                         VARCHAR(200) NOT NULL,
  hypoallergenic                ENUM('Yes', 'No') NOT NULL,
  dietery                       VARCHAR(200) NOT NULL,
  breed                         VARCHAR(200) NOT NULL,
  created_date  DATE DEFAULT (CURRENT_DATE),
  PRIMARY KEY (id)
);
