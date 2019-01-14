const mongoose = require('mongoose');
const Promise = require('bluebird');

Promise.promisifyAll(mongoose);

// connect to mongo via localhost
mongoose.connect(
  'mongodb://localhost/sdcRelatedSongs',
  { useNewUrlParser: true, useCreateIndex: true, autoIndex: false },
);

// define connection
const db = mongoose.connection;

db.once('open', () => {
  console.log('mongoose is now live!!!');
});
// if there's a connection error log it
db.on('error', console.error.bind(console, 'connection error:'));

// define Schema

const playListsSchema = new mongoose.Schema({
  // _id: {
  //   type: Number,
  //   required: [true, '_id field is required'],
  // },
  title: String,
  owner: String,
  description: String,
  imageURL: String,
  likes: Number,
  shares: Number,
});

const albumsSchema = new mongoose.Schema({
  // _id: {
  //   type: Number,
  //   required: [true, '_id field is required'],
  // },
  name: String,
  artist: String,
  year: String,
  imageURL: String,
});

const songsSchema = new mongoose.Schema({
  // _id: {
  //   type: Number,
  //   index: true,
  //   required: [true, '_id field is required'],
  // },
  title: String,
  genre: {
    type: String,
    // index: true,
    // required: [true, '_id field is required'],
  },
  playList: [Number],
  artist: {
    type: String,
    // index: true,
    // required: [true, '_id field is required'],
  },
  albumID: Number,
  released: Date,
  duration: Number,
  image: String,
  songURL: String,
  plays: Number,
  likes: Number,
  shares: Number,
  comments: Number,
});

const Playlists = mongoose.model('PlayLists', playListsSchema);
const Albums = mongoose.model('Albums', albumsSchema);
const Songs = mongoose.model('Songs', songsSchema);

// Export Models

module.exports.Playlists = Playlists;
module.exports.Albums = Albums;
module.exports.Songs = Songs;

// [Math.floor(Math.random() * 5)]
// RUN THIS CODE TO SEED MONGO DATABASE
