const {
  db,
  Songs,
  Albums,
  PlayLists,
  PlayListIndexes,
} = require('../../database/SDC2_database.js');

// Get related Info

// Personally, I would seperate these queries into 3 seperate request routes,
// but in order to match the front-end, placing them into one route

exports.getRelatedInfo = (req, res) => {
  const { id } = req.params;
  const RelatedInfo = {
    relatedTracks: [],
    playlists: [],
    album: '',
  };
  let queryCheck = 0;

  (async () => {
    // Get related Tracks
    // * *Note: Can use raw SQL query to run self inner join to make this into one query...
    // ALSO more realistically, would rebuild front end to hold onto curr song genre
    await Songs.findOne({ attributes: ['genre', 'albumId'], where: { id } })
      .then(async ({ dataValues }) => {
        // Get related Album
        await Albums.findByPk(dataValues.albumId)
          .then((results) => {
            queryCheck += 1;
            RelatedInfo.album = results.dataValues;
          })
          .catch((err) => {
            console.log("Error with find current Song's album query: ", err);
            res.sendStatus(404).send(err);
          });
        // Gen random num to 9,999,000
        // Range is between 1000 numbers
        const randomBaseNum = (() => Math.floor(Math.random() * 9999900) + 1)();
        await Songs.findAll({
          where: {
            genre: `${dataValues.genre}`,
            id: {
              [db.Op.and]: {
                [db.Op.gt]: randomBaseNum,
                [db.Op.lt]: randomBaseNum + 50,
              },
            },
          },
          attributes: ['title', 'genre', 'songurl', 'plays', 'likes', 'shares', 'comments'],
          include: [
            {
              model: Albums,
              attributes: ['artist', 'imageurl'],
              required: true,
            },
          ],
          order: db.literal('random()'),
          limit: 3,
        })
          .then((songs) => {
            queryCheck += 1;
            songs.forEach((song) => {
              RelatedInfo.relatedTracks.push(song.dataValues);
            });
          })
          .catch((err) => {
            console.log('Error with find related tracks by genre query: ', err);
            res.sendStatus(404).send(err);
          });
      })
      .catch((err) => {
        console.log("Error with find current Song's genre query: ", err);
        res.sendStatus(404).send(err);
      });

    // Get related Playlists
    await PlayLists.findAll({
      include: [
        {
          model: PlayListIndexes,
          attributes: [],
          required: true,
          include: [
            {
              model: Songs,
              where: { id },
              required: true,
            },
          ],
        },
      ],
      attributes: { exclude: ['id'] },
    })
      .then((playlists) => {
        queryCheck += 1;
        playlists.forEach((playlist) => {
          RelatedInfo.playlists.push(playlist.dataValues);
        });
      })
      .catch((err) => {
        console.log('Error with find related playlists query: ', err);
        res.sendStatus(404).send(err);
      });

    // If all 3 queries ran, then send a response to client
    if (queryCheck === 3) {
      res.status(200).json(RelatedInfo);
    } else {
      res.sendStatus(404).send('error with one of the queries');
    }
  })();
};

// Create (POST) a playlist

exports.createPlaylist = (req, res) => {
  const { description, owner, imageurl } = req.body;
  PlayLists.findOne({ order: [['id', 'DESC']] })
    .then(({ dataValues }) => {
      PlayLists.create({
        id: dataValues.id + 1,
        description,
        owner,
        imageurl,
        likes: 0,
        shares: 0,
      })
        .then(() => {
          res.status(201).send('new playlist successfully created!');
        })
        .catch((err) => {
          console.log('There was an error trying to post new playlist: ', err);
          res.sendStatus(400);
        });
    })
    .catch((err) => {
      console.log('Error retrieving most recent playlist id, :', err);
      res.sendStatus(404);
    });
};

// Update playlist

exports.updatePlaylistDescription = (req, res) => {
  console.log(req.body.description, req.body.id);
  PlayLists.update({ description: req.body.description }, { where: { id: req.body.id } })
    .then(() => {
      res.status(200).send('Playlist description successfully updated');
    })
    .catch((err) => {
      console.log('Error trying to update playlist description: ', err);
      res.sendStatus(400);
    });
};

// Delete Playlist

exports.deletePlaylist = (req, res) => {
  PlayLists.destroy({ where: { id: req.body.id } })
    .then(() => {
      res.status(200).send('Playlist has been successfuly deleted');
    })
    .catch((err) => {
      console.log('Error trying to delete playlist: ', err);
      res.sendStatus(500);
    });
};
