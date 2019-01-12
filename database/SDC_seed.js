const faker = require('faker');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
// const mongoose = require('mongoose');

const readable = new stream.Readable(); // new empty stream.Readable
// const { Playlists, Albums, Songs } = require('./SDC_database.js');

// Name of Collection and creation of documents (ONLY USE TO TEST MONGOEXPORT)

const audiofile = [
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-buddy.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-creativeminds.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-summer.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-sunny.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-tenderness.mp3',
];
const genre = ['Hiphop', 'RnB', 'Pop', 'Jazz', 'Classical'];
const randomNum = () => Math.floor(Math.random() * 5);

// function test() {
let songs = [];
console.time('streamTime');
for (let i = 1; i <= 10000000; i += 1) {
  songs.push({
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

  if (i % 100 === 0) {
    // console.log('100 boi');
    readable.push(`${songs}`);
    songs = [];
  }
  if (i % 1000000 === 0) {
    console.log('--------------');
  }
  if (i === 10000000) {
    readable.push(null);
  }
}
// Songs.collection.insertMany(songs, (err) => {
//   if (err) {
//     console.log('error inserting documents in to songs collection');
//   } else {
//     // console.log('multiple documents inserted to songs collection');
//     // console.log('Time for Songs seeding');
//     // console.timeEnd('seedingSongs');
//     mongoose.disconnect(() => {
//       // console.log('disconnected!');
//       // number += 1;
//       // songs = [];
//       dataPoints = [];
//     });
//   }
// if (number === 50) {
//   console.timeEnd('streamTime');
// }
//  });
// }

// return JSON.stringify(arr);
// }

// const readableStream = new Readable({
//   read(1000) {
//     this.push(test());
//     if (count === 3) this.push(null);
//     count++;
//   },
// });

// // piping
// readableStream.pipe(process.stdout);

// through the data event

// readable.on('readable', () => {
//   // there is some data to read now
//   let data;

//   while ((data = this.read(1000))) {
//     console.log(data);
//   }
// });

// WORKING METHOD UNCOMMENT
let number = 0;
readable.on('data', (chunk) => {
  number += 1;
  // Songs.collection.insertMany(JSON.parse(chunk.toString()), (err) => {
  //   if (err) {
  //     console.log('error inserting documents in to songs collection');
  //   } else {
  //     // console.log('multiple documents inserted to songs collection');
  //     // console.log('Time for Songs seeding');
  //     // console.timeEnd('seedingSongs');
  //     mongoose.disconnect(() => {
  //       // console.log('disconnected!');
  //       number += 1;
  //     });
  //   }
  //   if (number === 50) {
  //     console.timeEnd('streamTime');
  //   }
  // });
});
readable.on('end', () => {
  console.log(number);
  console.timeEnd('streamTime');
});

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
//     console.log('Timer Started');
//     console.time('seedingAlbum');
//     console.time('seedingPlaylists');
//     console.time('seedingSongs');
//   });
// });

// Generate multiple documents

// multiple playlists

// const allPlaylists = (() => {
//   const playlists = [];
//   for (let i = 1; i <= 200000; i += 1) {
//     playlists.push({
//       title: faker.lorem.words(),
//       owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
//       description: faker.lorem.words(),
//       imageURL: faker.random.image(),
//       likes: faker.random.number(),
//       shares: faker.random.number(),
//     });
//   }
//   return playlists;
// })();

// // multiple Albums

// const allAlbums = (() => {
//   const albums = [];
//   for (let i = 1; i <= 300000; i += 1) {
//     albums.push({
//       name: faker.lorem.words(),
//       artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
//       year: 2017,
//       imageURL: faker.random.image(),
//     });
//   }
//   return albums;
// })();

// Multiple songs

// const allSongs = () => {
//   const songs = [];
//   for (let i = 1; i <= 1; i += 1) {
//     songs.push({
//       title: faker.lorem.words(),
//       genre: genre[randomNum()],
//       playList: [randomNum(), randomNum(), randomNum()],
//       artist: 'hey',
//       albumID: 1,
//       released: faker.date.past(),
//       duration: faker.random.number(),
//       image: faker.random.image(),
//       songURL: audiofile[randomNum()],
//       plays: faker.random.number(),
//       likes: faker.random.number(),
//       shares: faker.random.number(),
//       comments: faker.random.number(),
//     });
// if (i % 1 === 0) {
// readable.push(JSON.stringify(songs))

// readable.pipe(process.stdout);
// console.log('500k hit bruh');
// songs = [];
// if (i % 500 === 0) {
//   console.log('5M');
// }
// readable.pipe(process.stdout);
// }
//   }
//   return songs;
// };

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
