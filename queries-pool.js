const e = require("express");
const mysql = require("mysql");

const insert = (connection, data, callback) => {
  let insertQuery = "INSERT INTO users (id, name) VALUES (?, ?)";
  let query = mysql.format(insertQuery, [data.id, data.name]);
  connection.query(query, (err, result) => {
    if (err) throw err;
    callback(result);
    connection.end();
  });
};
const read = (connection, callback) => {
  let insertQuery = "SELECT * FROM users";
  connection.query(insertQuery, (err, result) => {
    if (err) throw err;
    callback(result);
    connection.end();
  });
};
const update = (connection, data, callback) => {
  const randomLetters = Math.random().toString(36).substring(5);
  const newName = `${randomLetters}`;
  let insertQuery = "UPDATE users SET name = ?  WHERE id = ?";
  let query = mysql.format(insertQuery, [newName, data.id]);
  connection.query(query, (err, result) => {
    if (err) throw err;
    callback(result);
    connection.end();
  });
};
const remove = (connection, data, callback) => {
  const insertQuery = "DELETE FROM users WHERE id = ?";
  const query = mysql.format(insertQuery, [data.id]);
  connection.query(query, (err, result) => {
    if (err) throw err;
    callback(result);
    connection.end();
  });
};
module.exports = {
  insertPool: insert,
  readPool: read,
  updatePool: update,
  removePool: remove,
};
