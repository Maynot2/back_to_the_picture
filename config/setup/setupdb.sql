CREATE DATABASE back_to_the_pictures;
\c back_to_the_pictures;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name varchar NOT NULL,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  email varchar NOT NULL,
  role varchar
);
CREATE TABLE spots (
  id SERIAL PRIMARY KEY,
  name varchar NOT NULL,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  latitude varchar NOT NULL,
  longitude varchar NOT NULL
);
CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  taken_at timestamp NOT NULL,
  spot_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (spot_id) REFERENCES spots(id) ON DELETE CASCADE
);
CREATE TABLE pictures (
  id SERIAL PRIMARY KEY,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  url varchar NOT NULL,
  name varchar NOT NULL,
  album_id int NOT NULL,
  FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);
