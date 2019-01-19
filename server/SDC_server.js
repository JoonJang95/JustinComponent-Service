const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controllers/RelatedInfo.js');

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(/\/\d+/, express.static('./client/dist/'));

// API Request Handlers
app.get('/tracks/:id', controller.getRelatedInfo);

const port = 9000; // Change Me for Proxy!!

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
