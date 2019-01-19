const faker = require('faker');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

// const stream = require('stream');

const {
  db, Songs, Albums, PlayLists, PlayListIndexes,
} = require('./SDC2_database.js');

db.sync({ force: true });

// const readable = new stream.Readable(); // new empty stream.Readable

const audiofile = [
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-buddy.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-creativeminds.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-summer.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-sunny.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-tenderness.mp3',
];
const genre = ['Hiphop', 'RnB', 'Pop', 'Jazz', 'Classical', 'Rap', 'EDM', 'Country', 'Reggae'];

// Randomizer functions

const randomAudio = () => Math.floor(Math.random() * 5);
const randomGenre = () => Math.floor(Math.random() * 9);
const randomYear = () => Math.floor(Math.random() * 21) + 2000;
// **Make sure to change these numbers to match total amount**
const randomSongId = () => Math.floor(Math.random() * 10000000) + 1;
const randomPlaylistId = () => Math.floor(Math.random() * 1000000) + 1;

// csv seeding

let round = 1;
let indexId = 0;
let playlistId = 0;
let songId = 0;
let albumId = 0;

function genPlaylistsIndexesCSV() {
  const filename = path.join(__dirname, 'data', `PlaylistsIndexes${round}.csv`);
  const csvStream = csv.createWriteStream({ headers: true });
  const writableStream = fs.createWriteStream(filename);

  csvStream.pipe(writableStream);

  for (let i = 1; i <= 1000000; i += 1) {
    const playlistsIndexes = {
      id: (indexId += 1),
      playlistId: randomPlaylistId(),
      songId: randomSongId(),
    };
    csvStream.write(playlistsIndexes);
  }
  csvStream.end();
  writableStream.on('finish', () => {
    console.log(`Completed PlaylistsIndexes csv gen round ${round}`);
    if (round !== 30) {
      round += 1;
      genPlaylistsIndexesCSV();
    } else {
      console.timeEnd('csvGen');
    }
  });
}

function genPlaylistsCSV() {
  const filename = path.join(__dirname, 'data', `Playlists${round}.csv`);
  const csvStream = csv.createWriteStream({ headers: true });
  const writableStream = fs.createWriteStream(filename);

  csvStream.pipe(writableStream);

  for (let i = 1; i <= 1000000; i += 1) {
    const playlists = {
      id: (playlistId += 1),
      description: `${faker.lorem.word()} ${faker.lorem.word()}`,
      owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
      imageurl: faker.random.image(),
      likes: faker.random.number(),
      shares: faker.random.number(),
    };
    csvStream.write(playlists);
  }
  csvStream.end();
  writableStream.on('finish', () => {
    console.log(`Completed Playlists csv gen round ${round}`);
    genPlaylistsIndexesCSV();
  });
}

let albumIdCounter = 0;

function genSongsCSV() {
  const filename = path.join(__dirname, 'data', `songs${round}.csv`);
  const csvStream = csv.createWriteStream({ headers: true });
  const writableStream = fs.createWriteStream(filename);

  csvStream.pipe(writableStream);

  if (albumIdCounter === 1000000) {
    albumIdCounter = 0;
  }

  for (let i = 1; i <= 1000000; i += 1) {
    const Song = {
      id: (songId += 1),
      title: faker.lorem.words(),
      genre: genre[randomGenre()],
      songurl: audiofile[randomAudio()],
      plays: faker.random.number(),
      likes: faker.random.number(),
      shares: faker.random.number(),
      comments: faker.random.number(),
      albumId: (albumIdCounter += 1),
    };
    csvStream.write(Song);
  }
  csvStream.end();
  writableStream.on('finish', () => {
    console.log(`Completed Songs csv gen round ${round}`);
    if (round !== 10) {
      round += 1;
      genSongsCSV();
    } else {
      round = 1;
      genPlaylistsCSV();
    }
  });
}

function genAlbumsCSV() {
  const filename = path.join(__dirname, 'data', `albums${round}.csv`);
  const csvStream = csv.createWriteStream({ headers: true });
  const writableStream = fs.createWriteStream(filename);

  csvStream.pipe(writableStream);

  for (let i = 1; i <= 1000000; i += 1) {
    const album = {
      id: (albumId += 1),
      name: faker.lorem.words(),
      year: randomYear(),
      imageurl: faker.random.image(),
      artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
    };
    csvStream.write(album);
  }
  csvStream.end();
  writableStream.on('finish', () => {
    console.log(`Completed Albums csv gen round ${round}`);
    genSongsCSV();
  });
}
console.time('csvGen');
// genAlbumsCSV();

// Stream seeding

// data storage and counter variables

// let song = [];
// let album = [];
// let playlist = [];
// let playListIndex = [];
// const psqlAlbumCounter = 0;
// const psqlSongsCounter = 0;
// const psqlPlayListCounter = 0;
// const psqlPlayListIndexCounter = 0;
// const albumIdCounter = 0;

// const playListIndexDataSeeder = () => {
//   function insertPlayListIndexes(data) {
//     PlayListIndexes.bulkCreate(data)
//       .then(() => {
//         psqlPlayListIndexCounter += 1;
//         // console.log(number);
//         if (round < 300) {
//           round += 1;
//           playListIndexDataSeeder();
//         }
//         if (psqlPlayListIndexCounter === 300) {
//           console.timeEnd('streamTime');
//           console.log('disconnecting from postgreSQL');
//           db.close();
//         }
//       })
//       .catch(() => {
//         console.log('error with seeding songs table');
//       });
//   }

//   console.log('playListIndex for loop starting');
//   console.log('round', round);

//   for (let i = 1; i <= 100000; i += 1) {
//     playListIndex.push({
//       playlistId: i,
//       songId: randomSongId(),
//     });

//     if (i % 100000 === 0) {
//       insertPlayListIndexes(playListIndex);
//       playListIndex = [];
//       console.log('--------------');
//     }
//   }
// };

// const playListDataSeeder = () => {
//   function insertPlayLists(data) {
//     PlayLists.bulkCreate(data)
//       .then(() => {
//         psqlPlayListCounter += 1;
//         // console.log(number);
//         if (round < 10) {
//           round += 1;
//           playListDataSeeder();
//         }
//         if (psqlPlayListCounter === 10) {
//           round = 1;
//           playListIndexDataSeeder();
//         }
//       })
//       .catch(() => {
//         console.log('error with seeding songs table');
//       });
//   }

//   console.log('PlayList for loop starting');
//   console.log('round', round);

//   for (let i = 1; i <= 100000; i += 1) {
//     playlist.push({
//       description: `${faker.lorem.word()} ${faker.lorem.word()}`,
//       owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
//       imageurl: faker.random.image(),
//       likes: faker.random.number(),
//       shares: faker.random.number(),
//     });

//     if (i % 100000 === 0) {
//       insertPlayLists(playlist);
//       playlist = [];
//       console.log('--------------');
//     }
//   }
// };

// const songsDataSeeder = () => {
//   if (albumIdCounter === 1000000) {
//     albumIdCounter = 0;
//   }
//   function insertSongs(data) {
//     Songs.bulkCreate(data)
//       .then(() => {
//         psqlSongsCounter += 1;
//         // console.log(number);
//         if (round < 100) {
//           round += 1;
//           songsDataSeeder();
//         }
//         if (psqlSongsCounter === 100) {
//           round = 1;
//           playListDataSeeder();
//         }
//       })
//       .catch(() => {
//         console.log('error with seeding songs table');
//       });
//   }

//   console.log('Songs for loop starting');
//   console.log('round', round);

//   for (let i = 1; i <= 100000; i += 1) {
//     song.push({
//       title: faker.lorem.words(),
//       genre: genre[randomGenre()],
//       songurl: audiofile[randomAudio()],
//       plays: faker.random.number(),
//       likes: faker.random.number(),
//       shares: faker.random.number(),
//       comments: faker.random.number(),
//       albumId: (albumIdCounter += 1),
//     });

//     if (i % 100000 === 0) {
//       insertSongs(song);
//       song = [];
//       console.log('--------------');
//     }
//   }
// };

// const albumDataSeeder = () => {
//   if (round === 1) {
//     db.sync({ force: true }).catch(() => {
//       console.log('There was an error syncing');
//     });
//   }

//   function insertAlbums(data) {
//     Albums.bulkCreate(data)
//       .then(() => {
//         psqlAlbumCounter += 1;
//         if (round < 10) {
//           round += 1;
//           albumDataSeeder();
//         }
//         if (psqlAlbumCounter === 10) {
//           round = 1;
//           songsDataSeeder();
//         }
//       })
//       .catch(() => {
//         console.log('error with seeding Albums table');
//       });
//   }

//   console.log("album's for loop starting");
//   console.log('round', round);

//   for (let i = 1; i <= 100000; i += 1) {
//     album.push({
//       name: faker.lorem.words(),
//       year: randomYear(),
//       imageurl: faker.random.image(),
//       artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
//     });

//     if (i % 100000 === 0) {
//       insertAlbums(album);
//       album = [];
//       console.log('--------------');
//     }
//   }
// };
// console.time('streamTime');
// albumDataSeeder();
