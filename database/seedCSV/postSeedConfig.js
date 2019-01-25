const { db } = require('../SDC2_database.js');

const dbInterface = db.getQueryInterface();

// Add Foreign Keys to PlaylistIndexes

dbInterface.addConstraint('playlistindexes', ['songId'], {
  type: 'foreign key',
  name: 'custom_fkey_songId',
  references: {
    table: 'songs',
    field: 'id',
  },
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

dbInterface.addConstraint('playlistindexes', ['playlistId'], {
  type: 'foreign key',
  name: 'custom_fkey_playlistId',
  references: {
    table: 'playlists',
    field: 'id',
  },
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

// Create indexes

dbInterface.addIndex('albums', ['id']);
dbInterface.addIndex('playlistindexes', ['songId', 'playlistId']);
dbInterface.addIndex('songs', ['id', 'genre', 'albumId']);
dbInterface.addIndex('playlists', ['id']);
