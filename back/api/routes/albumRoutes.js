const Album = require("../models").albums;
const Picture = require("../models").pictures;
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function(router) {

  router.get("/api/albums", async (req, res) => {
    try {
      const albums = await Album.findAll({
        limit: 10,
        order: [
          ['name', 'DESC']
        ]
      });
      res.json(albums);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/api/albums/:id", async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) {
          throw Error;
        }
        res.json(album);
    } catch (error) {
      res.status(404).send(
        {
          "message": error.message || "Could not find album for the provided id."
        });
    }
  });

  router.get("/api/albums/name/:name", async (req, res) => {
    try {
      const albums = await Album.findAll({
        where: { name: req.params.name }
      });
      if (albums.length === 0) {
        throw Error;
      }
      res.json(albums);
    } catch (error) {
      res.status(404).send(
        {
          "message": error.message || "Could not find album for the provided name."
        });
    }
  });

  router.post("/api/albums", async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   throw Error;
    // }
    const { name, userId, spotId, takenAt } = req.body;
    await Album.sync();
    try {
      const createdAlbum = await Album.create({
        name,
        userId,
        spotId,
        takenAt: new Date(takenAt)
      });
      res.status(201).json({album: createdAlbum});
    } catch (error) {
      res.status(422).send(
        {
          "message": error.message || "Could not create album."
        });
      }
    });


  router.put('/api/albums/:id', async (req, res) => {
    const { name, userId, spotId, takenAt } = req.body; 
    try {
      const updatedAlbum = await Album.findByPk(req.params.id);
      if (!updatedAlbum) {
        res.send('Album not found');
      } else {
        await updatedAlbum.update({
          name,
          userId,
          spotId,
          takenAt
        });
        res.status(201).json({place: updatedAlbum});
      }
    } catch(error) {
      res.status(422).send(
        {
          "message": error.message || "Invalid inputs passed, please check your data."
        });
    }
  });

  router.delete("/api/albums/:id", (req, res) => {
    Album.destroy({
      where: { id: req.params.id }
    })
      .then(album => {
        res.status(201).json({ message: 'Deleted album.' });
      })
      .catch(err => res.json(err));
  });

  // router.get("/api/albums/:id/pictures", (req, res) => {
  //   Album.sync();
  //   Picture.sync();
  //   try {
  //       const album = await Album.findOne({
  //         where: {
  //           id: {
  //             [Op.eq]: req.params.id
  //           }
  //         },
  //         include: Picture
  //       });
  //       if (!album) {
  //         throw Error;
  //       }
  //       res.json(album.pictures);
  //   } catch (error) {
  //     res.status(404).send(
  //       {
  //         "message": error.message || "Could not find album for the provided id."
  //       });
  //   }
  // });
};
