const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Album = require("../models").albums;
const Picture = require("../models").pictures;

const getAlbums = async (req, res) => {
    try {
      const albums = await Album.findAll({
        limit: 10,
        order: [
          ['id', 'ASC']
        ]
      });
      return res.json(albums);
    } catch (error) {
        return res.json(error);
    }
}

const getAlbumById = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await Album.findByPk(id);
        if (!album) {
          throw Error;
        }
        return res.json(album);
    } catch (error) {
      return res.status(404).send(
        {
          "message": error.message || "Could not find album for the provided id."
        });
    }
}

const getAlbumByName =   async (req, res) => {
    try {
      const { name } = req.params;
      const albums = await Album.findAll({
        where: { name: name }
      });
      console.log(albums.lenght);
      if (albums.length === 0) {
        throw Error;
      }
      return res.json(albums);
    } catch (error) {
        return res.status(404).send(
        {
          "message": error.message || "Could not find album for the provided name."
        });
    }
}

const createAlbum = async (req, res) => {
    const { name, userId, spotId, takenAt } = req.body; 
    await Album.sync();
    // const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }
    try {
      const createdAlbum = await Album.create({
        name,
        userId,
        spotId,
        takenAt
      });
      if (!createdAlbum) {
        throw Error;
      }
      return res.status(201).json({album: createdAlbum});
    } catch (error) {
        return res.status(422).send(
        {
          "message": error.message || "Could not create album."
        });
      }
}

const updateAlbum = async (req, res) => {
    const { name, userId, spotId, takenAt } = req.body; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const updatedAlbum = await Album.findByPk(id);
      if (!updatedAlbum) {
        throw Error;
      } else {
        await updatedAlbum.update({
          name,
          userId,
          spotId,
          takenAt
        });
        return res.status(201).json({place: updatedAlbum});
      }
    } catch(error) {
      return res.status(422).send(
        {
          "message": error.message || "Invalid inputs passed, please check your data."
        });
    }
}

const deleteAlbum = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedAlbum = await Album.destroy({
        where: { id: id }
      });
      if (deletedAlbum) {
        return res.status(201).json({message: 'Album deleted!'});
      }
      throw new Error("Album not found.");
  } catch (error) {
      return res.status(422).send(error.message);
  }
};

const getAlbumByIdPic = async (req, res) => {
    await Album.sync();
    await Picture.sync();
    try {
        const { id } = req.params;
        const album = await Album.findOne({
          where: {
            id: {
              [Op.eq]: id
            }
          },
          include: Picture
        });
        if (!album) {
          throw Error;
        }
        return res.json(album.pictures);
    } catch (error) {
        return res.status(404).send(
        {
          "message": error.message || "Could not find album for the provided id."
        });
    }
}

module.exports = {
    getAlbums,
    getAlbumById,
    getAlbumByName,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getAlbumByIdPic
}