const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/SDC_database.js');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

const port = 9000; // Change Me for Proxy!!

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
