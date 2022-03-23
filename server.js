const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express(); // create express app
const http = require('http');
const mysql = require('mysql');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// add middlewares
const root = require('path').join(__dirname, 'build');
app.use(express.static(root));

//app.use('/*', (req, res) => {
//  res.sendFile(path.join(__dirname, 'build', 'index.html'));
//});

const server = http.createServer(app);

const db = mysql.createConnection({
  user: "nodejs",
  host: "localhost",
  password: "nodejs",
  database: "account_information"
});

db.connect((err) => {
    if (err) {
        throw err;
    }

    console.log("Connected to MySQL server.");
});

app.post("/create", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const address = req.body.address;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;

  const query = "INSERT INTO account (username, email, address, password, first_name, last_name, phone_num) VALUES (?, ?, ?, ?, ?, ?, ?);";
  db.query(
    query,
    [username, email, address, password, firstname, lastname, phone],
    );
  return res.json(200);
});

app

// start express server on port 5000
server.listen(5000, () => {
    console.log('NodeJS server running');
});