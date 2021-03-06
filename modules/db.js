const pg = require("pg");
const dbURI =
  "postgres://uquzxumayhwmof:39138d8baaa75d160a95fed8009f15160c83bde1b5ca8e702ae1eb3fde29d5f0@ec2-99-81-177-233.eu-west-1.compute.amazonaws.com:5432/dfkqe7m85k4a4j";
const connstring = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
  connectionString: connstring,
  ssl: { rejectUnauthorized: false },
});

// database methods -------------------------

let dbMethods = {};

// ------------------------------------
dbMethods.getAllToDoLists = function (userid) {
  let sql = "SELECT * FROM todolist WHERE userid = $1";
  let values = [userid];
  return pool.query(sql, values);
};

dbMethods.showToDoList = function (id) {
  let sql = "SELECT * FROM todolist WHERE id = $1";
  let values = [id];
  return pool.query(sql, values);
};

dbMethods.showSharedLists = function (public) {
  let sql = "SELECT * FROM todolist WHERE public = $1";
  let values = [public];
  return pool.query(sql, values);
};

dbMethods.createToDoList = function (heading, items, userid, public) {
  let sql =
    "INSERT INTO todolist (id, date, heading, items, userid, public) VALUES(DEFAULT, DEFAULT, $1, $2, $3, $4) returning *";
  let values = [heading, items, userid, public];
  console.log(values);
  return pool.query(sql, values);
};

dbMethods.updateToDoList = function (items, id) {
  let sql = "UPDATE todolist SET items = $1 WHERE id = $2 RETURNING *";
  let values = [items, id];
  return pool.query(sql, values);
};

dbMethods.deleteToDoList = function (id) {
  let sql = "DELETE FROM todolist WHERE id = $1 RETURNING *";
  let values = [id];
  return pool.query(sql, values);
};

dbMethods.updatePassword = function (password, salt, username) {
  let sql =
    "UPDATE users SET password = $1, salt = $2 WHERE username = $3 RETURNING *";
  let values = [password, salt, username];
  return pool.query(sql, values);
};

dbMethods.shareToDoList = function (sharedid, listid) {
  let sql = "UPDATE todolist SET sharedid = $1 WHERE id = $2 RETURNING *";
  let values = [listid, sharedid];
  return pool.query(sql, values);
};

dbMethods.getUserId = function (username) {
  let sql = "SELECT id FROM users WHERE username = $1";
  let values = [username];
  return pool.query(sql, values);
};

dbMethods.getUser = function (username) {
  let sql = "SELECT * FROM users WHERE username = $1";
  let values = [username];
  return pool.query(sql, values); //return the promise
};

dbMethods.createUser = function (username, password, salt) {
  let sql =
    "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
  let values = [username, password, salt];
  return pool.query(sql, values); //return the promise
};

dbMethods.deleteUser = function (id) {
  let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
  let values = [id];
  return pool.query(sql, values); //return the promise
};

// export dbMethods -------------------------
module.exports = dbMethods;
