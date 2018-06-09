CREATE DATABASE IF NOT EXISTS apiworkder;

USE apiworkder;

CREATE TABLE Company(
      id          int(255) auto_increment not null,
      name        varchar(255),
      type        varchar(255),
      sector      varchar(255),
      description varchar(255),
      created_at  datetime DEFAULT NULL,
      updated_at  datetime DEFAULT NULL,
      CONSTRAINT  pk_Company PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE Users(
      id                int(255) auto_increment not null,
      rol               varchar(255),
      name              varchar(255),
      surname           varchar(255),
      age               int(100),
      sex               varchar(255),
      id_Company        int(255) not null,
      id_Orders          int(255),
      created_at        datetime DEFAULT NULL,
      updated_at        datetime DEFAULT NULL,
      remember_token    varchar(255),
      CONSTRAINT pk_User            PRIMARY KEY(id),
      CONSTRAINT fk_User_Company    FOREIGN KEY(id_Company) REFERENCES Company(id)
)ENGINE=InnoDB;

CREATE TABLE Orders(
      id                int(255) auto_increment not null,
      title             varchar(255),
      description       varchar(255),
      difficulty        varchar(255),
      dateInit          datetime,
      dateFinish        datetime,
      id_Users           int(255) not null,
      created_at        datetime DEFAULT NULL,
      updated_at        datetime DEFAULT NULL,
      CONSTRAINT pk_Order         PRIMARY KEY(id),
      CONSTRAINT fk_Order_Users    FOREIGN KEY(id_Users) REFERENCES Users(id),
)ENGINE=InnoDB;