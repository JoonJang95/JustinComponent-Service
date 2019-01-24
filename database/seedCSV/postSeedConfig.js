const {
  db, PlayListIndexes, PlayLists, Songs,
} = require('../SDC2_database.js');

const dbInterface = db.getQueryInterface();

// Add more associations
// PlayLists to PlaylistIndexes
PlayListIndexes.belongsTo(PlayLists); // will add playlistID to playlistIndexes
PlayLists.hasMany(PlayListIndexes);

// Songs to PlayListIndexes
PlayListIndexes.belongsTo(Songs); // will add songsID to playlistIndexes
Songs.hasMany(PlayListIndexes);

// Add Foreign Keys to PlaylistIndexes

// dbInterface.addConstraint('playlistindexes', ['songId'], {
//   type: 'foreign key',
//   name: 'custom_fkey_songId',
//   references: {
//     table: 'songs',
//     field: 'id',
//   },
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// dbInterface.addConstraint('playlistindexes', ['playlistId'], {
//   type: 'foreign key',
//   name: 'custom_fkey_playlistId',
//   references: {
//     table: 'playlists',
//     field: 'id',
//   },
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// Create indexes

dbInterface.addIndex('albums', ['id']);
dbInterface.addIndex('playlistindexes', ['songId', 'playlistId']);
dbInterface.addIndex('songs', ['id', 'genre', 'albumId']);
dbInterface.addIndex('playlists', ['id']);
