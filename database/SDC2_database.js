const Sequelize = require('sequelize');

const db = new Sequelize('relatedtracks', 'adminjoon', 'password', {
  host: 'host.docker.internal',
  port: '5432',
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

// Songs Model (schema)
const Songs = db.define(
  'songs',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: Sequelize.STRING,
    genre: Sequelize.STRING,
    songurl: Sequelize.STRING,
    plays: Sequelize.INTEGER,
    likes: Sequelize.INTEGER,
    shares: Sequelize.INTEGER,
    comments: Sequelize.INTEGER,
  },
  { timestamps: false },
);

// PlayList Schema

const PlayLists = db.define(
  'playlists',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    description: Sequelize.STRING,
    owner: Sequelize.STRING,
    imageurl: Sequelize.STRING,
    likes: Sequelize.INTEGER,
    shares: Sequelize.INTEGER,
  },
  { timestamps: false },
);

// Playlist / Song association Schema

const PlayListIndexes = db.define(
  'playlistindexes',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    playlistId: Sequelize.INTEGER,
    songId: Sequelize.INTEGER,
  },
  { timestamps: false },
);

// Album Schema

const Albums = db.define(
  'albums',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: Sequelize.STRING,
    year: Sequelize.INTEGER,
    imageurl: Sequelize.STRING,
    artist: Sequelize.STRING,
  },
  { timestamps: false },
);

// Associations

// Songs to Albums
Songs.belongsTo(Albums); // will add AlbumID to Songs
Albums.hasMany(Songs);

// PlayLists to PlaylistIndexes
PlayListIndexes.belongsTo(PlayLists); // will add playlistID to playlistIndexes
PlayLists.hasMany(PlayListIndexes);

// Songs to PlayListIndexes
PlayListIndexes.belongsTo(Songs); // will add songsID to playlistIndexes
Songs.hasMany(PlayListIndexes);

// const queryInterface = db.getQueryInterface();

// Add composite UNIQUE constraint
// queryInterface.addConstraint('playlistindexes', ['playlistId', 'songId'], {
//   type: 'unique',
//   name: 'uniquePairs',
// });

module.exports = {
  db,
  Songs,
  Albums,
  PlayLists,
  PlayListIndexes,
};
