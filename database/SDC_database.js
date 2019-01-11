const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// connect to mongo via localhost
mongoose.connect(
  'mongodb://localhost/sdcRelatedSongs',
  {
    useMongoClient: true,
  },
);

// define connection
const db = mongoose.connection;

db.once('open', () => {
  console.log('mongoose is now live!!!');
});
// if there's a connection error log it
db.on('error', console.error.bind(console, 'connection error:'));

// define Schema

// const GenreSchema = new mongoose.Schema({
//   _id: {
//     type: Number,
//     required: [true, '_id field is required'],
//   },
//   songlists: [Number],
// });

const songsSchema = new mongoose.Schema({
  _id: {
    type: Number,
    index: true,
    required: [true, '_id field is required'],
  },
  title: String,
  genre: {
    type: String,
    index: true,
    required: [true, '_id field is required'],
  },
  artist: String,
  album: String,
  released: Date,
  duration: 


});


// [Math.floor(Math.random() * 5)]
// RUN THIS CODE TO SEED MONGO DATABASE
