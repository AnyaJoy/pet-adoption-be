CREATE TABLE IF NOT EXISTS pets_saved (
    id               int NOT NULL AUTO_INCREMENT,
    userId           INT,
    petId            INT,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS pets_fostered (
    id               int NOT NULL AUTO_INCREMENT,
    userId           INT,
    petId            INT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pets_adopted (
    id               int NOT NULL AUTO_INCREMENT,
    userId           INT,
    petId            INT,
    PRIMARY KEY (id)
);
