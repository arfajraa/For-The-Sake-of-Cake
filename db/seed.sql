DROP DATABASE IF EXISTS sake_of_cake;
CREATE DATABASE sake_of_cake;
\c sake_of_cake

-- add create tables here

CREATE TABLE users(
  id serial primary key,
  isAdmin boolean DEFAULT false,
  username varchar UNIQUE not null,
  hash_pass varchar,
  fname varchar not null,
  lname varchar,
  email varchar UNIQUE not null,
  phone_number varchar not null
  --address?
);

INSERT INTO users (isAdmin, username, hash_pass, fname, lname, email, phone_number) VALUES 
(true, 'rj', '$2b$10$/2OLI8LvBap0m8x4bHNP0.vDOiQIiCIUtzAJFHGxL5rpBCkwYfwBq', 'Raed', 'Alarfaj', 'raa@gmail.com', '0555555555');

CREATE TABLE products(
  id serial primary key,
  name varchar not null,
  description varchar not null,
  image text,
  price float not null
);

CREATE TABLE orders(
  id serial primary key,
  -- placed varchar not null,
  total varchar not null,
  status varchar not null,
  paymentName text,
  cardNumber text,
  expirationDate text,
  user_id int not null,
  foreign key(user_id) references users
);

CREATE TABLE orderItems(
  id serial primary key,
  product_id int,
  product_name text,
  product_price int,
  quantity int,
  order_id int not null,
  foreign key(order_id) references orders
);

-- CREATE TABLE cart(
--   id serial primary key,
--   username varchar not null,
--   product_id int not null,
--   quantity int not null,
--   foreign key(username) references users
--   foreign key(product_id) references products
-- );

-- CREATE TABLE ordertest(
--   id serial primary key,
--   placed varchar not null,
--   orderItems text[]
-- );


-- INSERT INTO ordertest 
--   (placed, orderItems)
-- VALUES
--   ('now', ARRAY ['{"cart":[{"productId":"1","quantity":"1"}]}', '{"cart":[{"productId":"2","quantity":"5"}]}']);



INSERT INTO products
  (name, description, image, price)
VALUES
  ('Chocolate Cake', 'Lovely chocolate cake of your dreams.', 'https://www.tasteofhome.com/wp-content/uploads/2018/01/exps957_TH143195C09_04_4b-2.jpg', 70),
  ('Carrot Cake', 'Specialty carrot cake with pecans.', 'https://www.biggerbolderbaking.com/wp-content/uploads/2015/03/BBB62-Carrot-Cake-Thumbnail-FINAL--1024x576.jpg', 80),
  ('Red Velvet', 'Velvety goodness you could kill for.', 'https://www.tasteofhome.com/wp-content/uploads/2017/10/Classic-Red-Velvet-Cake_exps25168_SF143315C11_05_1bC_RMS.jpg', 75),
  ('Milk Saffron', 'Signature traditional milk saffron cake.', 'https://fattoush.net/f/attachments/2018/04/28/604_Saffron-CakeJPG_-_Qu80_RT600x0-_OS640x605-_RD600x567-.jpg', 80);