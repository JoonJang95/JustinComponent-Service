const faker = require('faker');
const stream = require('stream');

const { db, Songs } = require('./SDC2_database.js');

let readable = new stream.Readable(); // new empty stream.Readable

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
let psqlCounter = 0;

const dataSeeder = () => {
  console.log('for loop starting');
  console.log('round', round);

  for (let i = 1; i <= 100000; i += 1) {
    song.push({
      track: faker.lorem.words(),
      genre: genre[randomNum()],
      artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
      album: faker.random.number(),
      albumArt: faker.random.image(),
      songURL: audiofile[randomNum()],
      plays: faker.random.number(),
      likes: faker.random.number(),
      shares: faker.random.number(),
      comments: faker.random.number(),
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

  // if (round > 1) {
  //   mongoose.connect(
  //     'mongodb://localhost/sdcRelatedSongs',
  //     { useNewUrlParser: true, useCreateIndex: true, autoIndex: false },
  //   );

  //   const db = mongoose.connection;

  //   db.once('open', () => {
  //     console.log('mongoose is now live!!!');
  //   });
  //   // if there's a connection error log it
  //   db.on('error', console.error.bind(console, 'connection error:'));
  // }

  readable.on('data', (chunk) => {
    if (round === 1) {
      db.sync({ force: true }).catch(() => {
        console.log('There was an error syncing');
      });
    }
    Songs.bulkCreate(JSON.parse(chunk.toString()))
      .then(() => {
        psqlCounter += 1;
        // console.log(number);
        if (round < 100) {
          round += 1;
          readable = new stream.Readable();
          dataSeeder();
        }
        if (psqlCounter === 100) {
          console.timeEnd('streamTime');
          console.log('disconnecting from postgreSQL');
          db.close();
        }
      })
      .catch(() => {
        console.log('error with seeding songs table');
      });
  });
};
console.time('streamTime');
dataSeeder();
