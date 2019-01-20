const {
  db,
  Songs,
  Albums,
  PlayLists,
  PlayListIndexes,
} = require('../../database/SDC2_database.js');

// Personally, I would seperate these queries into 3 seperate request routes,
// but in order to match the front-end, placing them into one route

exports.getRelatedInfo = (req, res) => {
  console.time('totalQuery');
  const { id } = req.params;
  const RelatedInfo = {
    relatedTracks: [],
    playlists: [],
    album: '',
  };
  let queryCheck = 0;

  (async () => {
    // Get related Album
    await Albums.findOne({
      include: [
        {
          model: Songs,
          as: 'songs',
          where: { id: 2 },
          required: true,
        },
      ],
    })
      .then(({ dataValues }) => {
        queryCheck += 1;
        RelatedInfo.album = dataValues;
      })
      .catch((err) => {
        console.log("Error with find current Song's album query: ", err);
        res.sendStatus(404).send(err);
      });

    // Get related Tracks
    //* *Note: Can use raw SQL query to run self inner join to make this into one query...
    // ALSO more realistically, would rebuild front end to hold onto curr song genre
    await Songs.findOne({ attributes: ['genre'], where: { id: 1 } })
      .then(async ({ dataValues }) => {
        // Gen random num to 9,999,000
        // Range is between 1000 numbers
        const randomBaseNum = (() => Math.floor(Math.random() * 9999900) + 1)();
        await Songs.findAll({
          where: {
            genre: `${dataValues.genre}`,
            id: {
              [db.Op.and]: {
                [db.Op.gt]: randomBaseNum,
                [db.Op.lt]: randomBaseNum + 100,
              },
            },
          },
          include: [
            {
              model: Albums,
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
          required: true,
          include: [{ model: Songs, where: { id }, required: true }],
        },
      ],
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

    if (queryCheck === 3) {
      res.status(200).json(RelatedInfo);
    } else {
      res.sendStatus(404).send('error with one of the queries');
    }
  })();
};
