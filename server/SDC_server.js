const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controllers/index.js');

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(/(\/\d+)/, express.static('./client/dist/'));

// API Request Handlers
app.get('/tracks/:id', controller.getRelatedInfo);

app.post('/createPlayList', controller.createPlaylist);

app.put('/updatePlayListDescription', controller.updatePlaylistDescription);

app.delete('/deletePlayList', controller.deletePlaylist);

const port = 9000; // Change Me for Proxy!!

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
