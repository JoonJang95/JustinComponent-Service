const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbURL: process.env.db_URL,
  nodePORT: process.env.nodePORT,
  dbPORT: process.env.dbPORT,
  nodeURL: process.env.nodeURL,
  dbPassword: process.env.dbPassword,
};
