CREATE DATABASE back_to_the_pictures;
\c back_to_the_pictures;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name varchar NOT NULL,
  createdAt timestamp DEFAULT NOW(),
  updatedAt timestamp DEFAULT NOW(),
  email varchar NOT NULL,
  password varchar NOT NULL,
  role varchar
);
CREATE TABLE spots (
  id SERIAL PRIMARY KEY,
  name varchar NOT NULL,
  createdAt timestamp DEFAULT NOW(),
  updatedAt timestamp DEFAULT NOW(),
  latitude float NOT NULL,
  longitude float NOT NULL
);
CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  name varchar NOT NULL,
  userId int NOT NULL,
  createdAt timestamp DEFAULT NOW(),
  updatedAt timestamp DEFAULT NOW(),
  taken_at timestamp NOT NULL,
  spotId int NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (spotId) REFERENCES spots(id) ON DELETE CASCADE
);
CREATE TABLE pictures (
  id SERIAL PRIMARY KEY,
  createdAt timestamp DEFAULT NOW(),
  updatedAt timestamp DEFAULT NOW(),
  url varchar NOT NULL,
  albumId int NOT NULL,
  FOREIGN KEY (albumId) REFERENCES albums(id) ON DELETE CASCADE
);
