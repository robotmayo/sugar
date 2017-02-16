CREATE TABLE user_accounts(
  id serial PRIMARY KEY,
  password VARCHAR(80),
  email VARCHAR(128),
  created_on timestamp DEFAULT NOW(),
  last_updated timestamp
);
CREATE UNIQUE INDEX ON user_accounts (email);

CREATE TABLE app_sessions (
  sid varchar NOT NULL,
	sess json NOT NULL,
	expire timestamp(6) NOT NULL
);

CREATE TABLE recipes(
  id serial PRIMARY KEY,
  user_created boolean,
  added_by int, -- User who created or added the recipe
  name varchar(1024),
  author VARCHAR(500),
  url varchar(2048),
  website varchar(500),
  added_on TIMESTAMP DEFAULT NOW(),
  published_on TIMESTAMP
);

CREATE TABLE recipe_ingredients(
  id serial,
  recipe_id int,
  contents TEXT
);
CREATE INDEX ON recipe_ingredients (recipe_id);

CREATE TABLE recipe_instructions(
  id serial PRIMARY KEY,
  recipe_id int,
  contents TEXT
);
CREATE INDEX ON recipe_instructions (recipe_id);

CREATE TABLE user_saved_recipes(
  id serial PRIMARY KEY,
  recipe_id int NOT NULL,
  user_id int NOT NULL,
  favorite boolean DEFAULT false,
  created_on timestamp DEFAULT NOW(),
  deleted boolean DEFAULT FALSE
);
CREATE INDEX ON user_saved_recipes (user_id);
CREATE INDEX ON user_saved_recipes (user_id, favorite);

CREATE TABLE user_saved_recipe_categories(
  id serial PRIMARY KEY,
  name varchar(100),
  user_id int
);
CREATE INDEX ON user_saved_recipe_categories (user_id, id);

CREATE TABLE user_saved_recipes_categories_items(
  recipe_id int,
  cat_id int,
  user_id int,
  added_on timestamp
);
CREATE INDEX  ON user_saved_recipes_categories_items (user_id, cat_id);
CREATE UNIQUE INDEX ON user_saved_recipes_categories_items (user_id, recipe_id, cat_id);

CREATE TABLE user_calendar(
  id serial PRIMARY KEY,
  user_id int,
  recipe_id int,
  label varchar(100), -- Dinner/ snack / brunch etc
  rank int, -- https://dba.stackexchange.com/questions/31014/design-for-archiving-a-sorted-list-with-ability-for-a-few-insert
  set_date timestamp NOT NULL
);
CREATE INDEX ON user_calendar (user_id, set_date);

CREATE TABLE user_menu(
  id serial PRIMARY KEY,
  name varchar(256),
  user_id int,
  created_on timestamp DEFAULT NOW()
);
CREATE INDEX ON user_menu (user_id);

CREATE TABLE user_menu_items(
  id serial PRIMARY KEY,
  menu_id int,
  recipe_id int,
  user_id int,
  added_on timestamp
);
CREATE INDEX ON user_menu_items (user_id, menu_id, recipe_id);
CREATE INDEX ON user_menu_items (user_id, menu_id);

CREATE TABLE user_groceries(
  id serial PRIMARY KEY,
  user_id int,
  name varchar(256)
);

CREATE INDEX ON user_groceries (id, user_id);

CREATE TABLE user_groceries_items(
  id serial PRIMARY KEY,
  user_id int,
  contents TEXT,
  label varchar(256)
);
CREATE INDEX ON user_groceries_items (id, user_id);
















