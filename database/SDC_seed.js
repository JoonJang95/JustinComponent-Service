const faker = require('faker');
const stream = require('stream');
const mongoose = require('mongoose');

let readable = new stream.Readable(); // new empty stream.Readable

const { Playlists, Albums, Songs } = require('./SDC_database.js');

const audiofile = [
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-buddy.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-creativeminds.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-summer.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-sunny.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-tenderness.mp3',
];
const genre = ['Hiphop', 'RnB', 'Pop', 'Jazz', 'Classical'];
const randomNum = () => Math.floor(Math.random() * 5);

let song = [];
let round = 1;
let number = 0;
let mongoCounter = 0;

const dataSeeder = () => {
  console.log('for loop starting');
  console.log('round', round);
  for (let i = 1; i <= 1000000; i += 1) {
    song.push({
      title: faker.lorem.words(),
      genre: genre[randomNum()],
      playList: [randomNum(), randomNum(), randomNum()],
      artist: 'hey',
      albumID: 1,
      released: faker.date.past(),
      duration: faker.random.number(),
      image: faker.random.image(),
      songURL: audiofile[randomNum()],
      plays: faker.random.number(),
      likes: faker.random.number(),
      shares: faker.random.number(),
      comments: faker.random.number(),
    });

    if (i % 10000 === 0) {
      const data = JSON.stringify(song);
      readable.push(data);
      song = [];
    }
    if (i % 500000 === 0) {
      console.log('--------------');
    }

    if (i === 1000000) {
      console.log('going to push null');
      readable.push(null);
    }
  }

  if (round > 1) {
    mongoose.connect(
      'mongodb://localhost/sdcRelatedSongs',
      { useNewUrlParser: true, useCreateIndex: true, autoIndex: false },
    );

    const db = mongoose.connection;

    db.once('open', () => {
      console.log('mongoose is now live!!!');
    });
    // if there's a connection error log it
    db.on('error', console.error.bind(console, 'connection error:'));
  }

  readable.on('data', (chunk) => {
    Songs.collection.insertMany(JSON.parse(chunk.toString()), (err) => {
      if (err) {
        console.log('error inserting documents in to songs collection: ', err);
      } else {
        mongoose.disconnect(() => {
          // console.log('disconnected!');
        });
        mongoCounter += 1;
      }
      number += 1;
      // console.log(number);
      // Num limit has to be 100 less than seed target. Ex - (400 => 5 million data points)
      if (number % 100 === 0 && number <= 900) {
        round += 1;
        readable = new stream.Readable();
        dataSeeder();
      }
      if (mongoCounter === 1000) {
        console.timeEnd('streamTime');
      }
    });
  });
};
console.time('streamTime');
dataSeeder();

// mongoose.connection.once('open', () => {
//   console.log('mongoose is now Seeding!!!');
//   // Clear collections if they already have documents

//   mongoose.connection.collections.playlists.drop((err) => {
//     if (err) {
//       console.log("couldn't drop playlists collections");
//     }
//     if (!err) {
//       console.log('dropped playlists collections');
//     }
//   });
//   mongoose.connection.collections.albums.drop((err) => {
//     if (err) {
//       console.log("couldn't drop albums collections");
//     }
//     if (!err) {
//       console.log('dropped albums collections');
//     }
//   });
//   mongoose.connection.collections.songs.drop((err) => {
//     if (err) {
//       console.log("couldn't drop songs collections");
//     }
//     if (!err) {
//       console.log('dropped songs collections');
//     }
//   });
// });

// Seed DB w/ Nodejs to MongoDB

// Playlists.collection.insertMany(allPlaylists, (err) => {
//   if (err) {
//     console.log('error inserting documents in to Playlists collection');
//   } else {
//     console.log('multiple documents inserted to playlist collection');
//     console.log('Time for playlist seeding');
//     console.timeEnd('seedingPlaylists');
//   }
// });

// Albums.collection.insertMany(allAlbums, (err) => {
//   if (err) {
//     console.log('error inserting documents in to Albums collection');
//   } else {
//     console.log('multiple documents inserted to Albums collection');
//     console.log('Time for Albums seeding');
//     console.timeEnd('seedingAlbum');
//   }
// });

// Songs.collection.insertMany(allSongs, (err) => {
//   if (err) {
//     console.log('error inserting documents in to Albums collection');
//   } else {
//     console.log('multiple documents inserted to Albums collection');
//     console.log('Time for Songs seeding');
//     console.timeEnd('seedingSongs');
//     mongoose.disconnect(() => {
//       console.log('disconnected!');
//     });
//   }
// });
