CREATE TABLE USERS (
  ID INT IDENTITY(1, 1) PRIMARY KEY,
  FullName VARCHAR(50) NOT NULL,
  Rut VARCHAR(255) NOT NULL UNIQUE,
  Email VARCHAR(255) NULL,
  BirthDate DATE NOT NULL
);


-- Valores de prueba
insert into
  users
values
(
    'Diego',
    '136332171',
    'diego@gmail.com',
    '1985-01-12'
  )
insert into
  users
values
(
    'Ignacio',
    '160497963',
    'ignacio@gmail.com',
    '1999-12-28'
  )