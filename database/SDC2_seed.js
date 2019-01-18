const faker = require('faker');
const stream = require('stream');

const {
  db, Songs, Albums, PlayLists, PlayListIndexes,
} = require('./SDC2_database.js');

let readable = new stream.Readable(); // new empty stream.Readable

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
const randomPlayListId = () => Math.floor(Math.random() * 100000) + 1;

// data storage and counter variables

let song = [];
let album = [];
let playlist = [];
let playListIndex = [];
let psqlAlbumCounter = 0;
let psqlSongsCounter = 0;
let psqlPlayListCounter = 0;
let psqlPlayListIndexCounter = 0;
let songIdCounter = 0;

let round = 1;

const playListIndexDataSeeder = () => {
  console.log('playListIndex for loop starting');
  console.log('round', round);

  for (let i = 1; i <= 100000; i += 1) {
    playListIndex.push({
      playlistId: randomPlayListId(),
      songId: (songIdCounter += 1),
    });

    if (i % 100000 === 0) {
      const data = JSON.stringify(playListIndex);
      readable.push(data);
      playListIndex = [];
      console.log('going to push null');
      readable.push(null);
      console.log('--------------');
    }
  }

  readable.on('data', (chunk) => {
    PlayListIndexes.bulkCreate(JSON.parse(chunk.toString()))
      .then(() => {
        console.log('called');
        psqlPlayListIndexCounter += 1;
        // console.log(number);
        if (round < 10) {
          round += 1;
          readable = new stream.Readable();
          playListIndexDataSeeder();
        }
        if (psqlPlayListIndexCounter === 10) {
          console.timeEnd('streamTime');
          console.log('disconnecting from postgreSQL');
          db.close();
        }
      })
      .catch((e) => {
        console.log(e);
        console.log('error with seeding songs table');
      });
  });
};

const playListDataSeeder = () => {
  console.log('PlayList for loop starting');
  console.log('round', round);

  for (let i = 1; i <= 100000; i += 1) {
    playlist.push({
      description: `${faker.lorem.word()} ${faker.lorem.word()}`,
      owner: `${faker.name.firstName()} ${faker.name.lastName()}`,
      imageurl: faker.random.image(),
      likes: faker.random.number(),
      shares: faker.random.number(),
    });

    if (i % 100000 === 0) {
      const data = JSON.stringify(playlist);
      readable.push(data);
      playlist = [];
      console.log('going to push null');
      readable.push(null);
      console.log('--------------');
    }
  }

  readable.on('data', (chunk) => {
    PlayLists.bulkCreate(JSON.parse(chunk.toString()))
      .then(() => {
        console.log('called');
        psqlPlayListCounter += 1;
        // console.log(number);
        if (round < 1) {
          round += 1;
          readable = new stream.Readable();
          playListDataSeeder();
        }
        if (psqlPlayListCounter === 1) {
          round = 1;
          readable = new stream.Readable();
          playListIndexDataSeeder();
        }
      })
      .catch((e) => {
        console.log(e);
        console.log('error with seeding songs table');
      });
  });
};

const songsDataSeeder = () => {
  console.log('Songs for loop starting');
  console.log('round', round);

  for (let i = 1; i <= 100000; i += 1) {
    song.push({
      title: faker.lorem.words(),
      genre: genre[randomGenre()],
      songurl: audiofile[randomAudio()],
      plays: faker.random.number(),
      likes: faker.random.number(),
      shares: faker.random.number(),
      comments: faker.random.number(),
      albumId: i,
    });

    if (i % 100000 === 0) {
      const data = JSON.stringify(song);
      readable.push(data);
      song = [];
      console.log('going to push null');
      readable.push(null);
      console.log('--------------');
    }
  }

  readable.on('data', (chunk) => {
    Songs.bulkCreate(JSON.parse(chunk.toString()))
      .then(() => {
        psqlSongsCounter += 1;
        // console.log(number);
        if (round < 10) {
          round += 1;
          readable = new stream.Readable();
          songsDataSeeder();
        }
        if (psqlSongsCounter === 10) {
          round = 1;
          readable = new stream.Readable();
          playListDataSeeder();
        }
      })
      .catch((e) => {
        console.log(e);
        console.log('error with seeding songs table');
      });
  });
};

const albumDataSeeder = () => {
  if (round === 1) {
    db.sync({ force: true }).catch(() => {
      console.log('There was an error syncing');
    });
  }
  console.log("album's for loop starting");
  console.log('round', round);

  for (let i = 1; i <= 100000; i += 1) {
    album.push({
      name: faker.lorem.words(),
      year: randomYear(),
      imageurl: faker.random.image(),
      artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
    });

    if (i % 100000 === 0) {
      const data = JSON.stringify(album);
      readable.push(data);
      album = [];
      console.log('going to push null');
      readable.push(null);
      console.log('--------------');
    }
  }

  readable.on('data', (chunk) => {
    Albums.bulkCreate(JSON.parse(chunk.toString()))
      .then(() => {
        psqlAlbumCounter += 1;
        // console.log(number);
        if (round < 1) {
          round += 1;
          readable = new stream.Readable();
          albumDataSeeder();
        }
        if (psqlAlbumCounter === 1) {
          readable = new stream.Readable();
          round = 1;
          songsDataSeeder();
        }
      })
      .catch((e) => {
        console.log(e);
        console.log('error with seeding songs table');
      });
  });
};
console.time('streamTime');
albumDataSeeder();
