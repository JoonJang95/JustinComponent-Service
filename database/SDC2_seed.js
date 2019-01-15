const promise = require('bluebird');
// Overrides the default (ES6 Promise) promise library for its internal use.
const options = { promiseLib: promise };
// Have pgp incorporate promise library into its native promiseLib.
const pgp = require('pg-promise')(options);
const faker = require('faker');
const { db, cs } = require('./SDC2_database.js');

const audiofile = [
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-buddy.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-creativeminds.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-summer.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-sunny.mp3',
  'https://s3.amazonaws.com/audiosdc/Audio+Files/bensound-tenderness.mp3',
];
const genre = ['Hiphop', 'RnB', 'Pop', 'Jazz', 'Classical'];
const randomNum = () => Math.floor(Math.random() * 5);

// implement a massive-insert operation

// pg-promise method of inserting massive data

console.time('pgSeedTime');

function getNextData(t, pageIndex) {
  let data = null;
  if (pageIndex < 1000) {
    data = [];
    for (let i = 0; i < 10000; i += 1) {
      const idx = pageIndex * 10000 + i; // to insert unique product names
      data.push({
        id: idx,
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
    }
  }
  return Promise.resolve(data);
}

db.tx('massive-insert', t => t
  .sequence(index => getNextData(t, index).then((data) => {
    if (data) {
      const insert = pgp.helpers.insert(data, cs);
      return t.none(insert);
    }
  }))
  .then(() => {
    console.timeEnd('pgSeedTime');
  }));
