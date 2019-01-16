const mongoose = require('mongoose');
const explain = require('mongoose-explain');
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

const songsSchema = new mongoose.Schema({
  _id: {
    type: Number,
    index: true,
    // required: [true, '_id field is required'],
  },
  track: String,
  genre: {
    type: String,
    // index: true,
    // required: [true, '_id field is required'],
  },
  artist: {
    type: String,
    // index: true,
    // required: [true, '_id field is required'],
  },
  album: String,
  albumArt: String,
  songURL: String,
  plays: Number,
  likes: Number,
  shares: Number,
  comments: Number,
});

songsSchema.plugin(explain);

const Songs = mongoose.model('Songs', songsSchema);

// Export Models

module.exports.Songs = Songs;

// [Math.floor(Math.random() * 5)]
// RUN THIS CODE TO SEED MONGO DATABASE
