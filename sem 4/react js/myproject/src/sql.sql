CREATE DATABASE restaurant_management;

USE restaurant_management;

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  partySize INT NOT NULL
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tableNumber INT NOT NULL,
  menuItem VARCHAR(255) NOT NULL,
  quantity INT NOT NULL
);

CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  itemName VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  threshold INT NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);
