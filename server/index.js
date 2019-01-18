const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const getTracks = require('../database/helpers.jsx').getTracks;
const sortTracks = require('../database/helpers.jsx').sortTracks;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(`${__dirname}/../client/dist`));
app.use(/\/\d+/, express.static('./client/dist/'));

app.get('/tracks/:id', (req, res) => {
  const { id } = req.params;
  getTracks((err, data) => {
    if (err) return err;
    const sortedData = sortTracks(data, id);
    res.send(sortedData);
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
