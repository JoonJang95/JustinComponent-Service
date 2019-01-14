const express = require('express');

const app = express();
const cluster = require('express-cluster');

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../database/SDC_database.js');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

// cluster(
//   (worker) => {
//     app.get('/', (req, res) => {
//       res.send(`hello from worker #${worker.id}`);
//     });
//     return app.listen(9001);
//   },
//   { count: 4 },
// );

// // if (cluster.isMaster) {
// //   for (let i = 0; i < 2; i += 1) {
// //     cluster.fork();
// //   }
// // } else {
// //   app.listen(8000);
// // }

const port = 9000; // Change Me for Proxy!!

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
