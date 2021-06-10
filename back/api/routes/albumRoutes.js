const Album = require("../models").albums;
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
        res.json(spot);
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
      console.log(albums.lenght);
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

  // doesn't work "column \"userId\" does not exist"
  router.post("/api/albums/create", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw Error;
    }
    const { user_id, name, taken_at, spot_id } = req.body; 
    try {
      const createdAlbum = await Album.create({
        user_id,
        name,
        taken_at,
        spot_id
      });
      res.status(201).json({spot: createdAlbum});
    } catch (error) {
      res.status(422).send(
        {
          "message": error.message || "Could not create album."
        });
      }
    });

  // router.post("/api/albums/create", (req, res) => {
  //   Album.create({
  //     name: req.body.name,
  //     user_id: req.body.user_id,
  //     spot_id: req.body.spot_id,
  //     taken_at: req.body.taken_at
  //   })
  //     .then(res => {
  //       res.json(res);
  //     })
  //     .catch(err => res.json(err));
  // });

  router.put('/api/albums/:id', async (req, res) => {
    const { user_id, name, taken_at, spot_id } = req.body; 
    try {
      const updatedAlbum = await Album.findByPk(req.params.id);
      if (!updatedAlbum) {
        res.send('Album not found');
      } else {
        await updatedAlbum.update({
          user_id,
          name,
          taken_at,
          spot_id
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

  // router.put("/api/albums/:id", (req, res) => {
  //   Album.update({
  //       name: req.body.name,
  //       user_id: req.body.user_id,
  //       spot_id: req.body.spot_id,
  //       taken_at: req.body.taken_at },
  //       { where: { id: req.params.id } }
  //   )
  //     .then(updatedAlbum => {
  //       res.json(updatedAlbum);
  //     })
  //     .catch(err => res.json(err));
  // });

  router.delete("/albums/:id", (req, res) => {
    Album.destroy({
      where: { id: req.params.id }
    })
      .then(album => {
        res.status(201).json({ message: 'Deleted album.' });
      })
      .catch(err => res.json(err));
  });
};