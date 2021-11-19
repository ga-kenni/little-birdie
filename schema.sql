-- Run this whole file in one go by running this:
-- $ cat schema.sql | psql

CREATE DATABASE little_birdie;

\c little_birdie;

DROP TABLE IF EXISTS entries;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  password_hash TEXT
);

INSERT INTO users(name, email, password_hash) VALUES ('bob', 'bob@example.com', '$2b$10$VDV2P7MyqUaEi6AsREOtt.lpyuKWOVn9fBs9wyCUT3uGFnhMjkHce');
INSERT INTO users(name, email, password_hash) VALUES ('alice', 'alice@example.com', '$2b$10$XFPXrqomp1fV7P.669R9auUyUhSWeta62KHiAEDPmw2PMMEHxbob6');

CREATE TABLE entries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER, 
  content TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

INSERT INTO entries (user_id, content) VALUES (1, 'First post!');
INSERT INTO entries (user_id, content) VALUES (2, 'Just joined this birdie thing, is it really limited to only 140 characters?');
INSERT INTO entries (user_id, content) VALUES (1, 'Breaking news! Politician avoiding directly answering the question.');
INSERT INTO entries (user_id, content) VALUES (2, 'The illuminati are real. Their strategy of making people think it''s made up is working...');
INSERT INTO entries (user_id, content) VALUES (2, 'Sending hugs to all of you having a rough day today! <3');

CREATE TABLE important_table (
  content TEXT
);