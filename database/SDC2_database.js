const Sequelize = require('sequelize');

const db = new Sequelize('relatedtracks', 'adminjoon', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Songs Model
const Songs = db.define(
  'songs',
  {
    track: Sequelize.STRING,
    genre: Sequelize.STRING,
    artist: Sequelize.STRING,
    album: Sequelize.STRING,
    albumArt: Sequelize.STRING,
    songurl: Sequelize.STRING,
    plays: Sequelize.INTEGER,
    likes: Sequelize.INTEGER,
    shares: Sequelize.INTEGER,
    comments: Sequelize.INTEGER,
  },
  { timestamps: false },
);

module.exports = {
  db,
  Songs,
};
