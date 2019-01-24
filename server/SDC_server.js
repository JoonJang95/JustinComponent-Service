require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');
const cluster = require('cluster');

const controller = require('./controllers/index.js');
const { nodePORT } = require('../envConfigs.js');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(/(\/\d+)|\//, express.static('./client/dist/'));

// API Request Handlers
app.get('/tracks/:id', controller.getRelatedInfo);

app.post('/createPlayList', controller.createPlaylist);

app.put('/updatePlayListDescription', controller.updatePlaylistDescription);

app.delete('/deletePlayList', controller.deletePlaylist);

const port = nodePORT; // Change Me for Proxy!!

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running on port: ${port}`);
  // Count the machine's CPUs
  const cpuCount = os.cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
