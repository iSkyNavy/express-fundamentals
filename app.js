const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();
const { insert, read, update, remove } = require("./queries");
const { insertPool } = require("./queries-pool");
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});
app.get("/", (req, res) => {
  res.send("Hello express");
});
app.get("/insert", (req, res) => {
  insert(connection, { id: 1, name: "diego" }, (result) => {
    res.json(result);
  });
});
app.get("/insert-pool", (req, res) => {
  insertPool(pool, { id: 1, name: "diegoPool" }, (result) => {
    res.json(result);
  });
});
app.get("/read", (req, res) => {
  read(connection, (result) => {
    res.json(result);
  });
});
app.get("/update", (req, res) => {
  update(connection, { id: 1 }, (result) => {
    res.json(result);
  });
});
app.get("/remove", (req, res) => {
  remove(connection, { id: 1 }, (result) => {
    res.json(result);
  });
});

app.listen(3000, () => console.log("Servidor on port 3000"));
