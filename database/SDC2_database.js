const promise = require('bluebird');
// Overrides the default (ES6 Promise) promise library for its internal use.
const options = { promiseLib: promise };
// Have pgp incorporate promise library into its native promiseLib.
const pgp = require('pg-promise')(options);
// Database connection details => cn = 'postgres://username:password@host:port/database'
const cn = 'postgresql://adminjoon:password@localhost:5432/relatedtracks';
const db = pgp(cn);

// Set up db schema
const cs = new pgp.helpers.ColumnSet(
  [
    'id',
    'title',
    'genre',
    'playList',
    'artist',
    'released',
    'image',
    'songURL',
    'plays',
    'likes',
    'shares',
    'comments',
  ],
  { table: 'songs' },
);

module.exports = {
  db,
  cs,
};
