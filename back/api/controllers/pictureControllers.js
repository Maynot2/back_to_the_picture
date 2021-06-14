const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Picture = require("../models").pictures;

const getPics = async (req, res) => {
    try {
      const pictures = await Picture.findAll({
        limit: 10,
        order: [
          ['albumId', 'ASC']
        ]
      });
      res.json(pictures);
    } catch (error) {
      res.json(error);
    }
}

const getPicById = async (req, res) => {
    try {
        const pictures = await Picture.findByPk(req.params.id);
        if (!pictures) {
          throw Error;
        }
        res.json(pictures);
    } catch (error) {
      res.status(404).send(
        {
          "message": error.message || "Could not find picture for the provided id."
        });
    }
}

const uploadPic =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw Error;
    }
    const { albumId, url } = req.body;
    console.log(req.body);
    await Spot.sync();
    try {
      const createdPicture = await Picture.create({
        albumId,
        url
      });
      res.status(201).json({picture: createdPicture});
    } catch (error) {
      res.status(422).send(
        {
          "message": error.message || "Could not create picture."
        });
      }
}

const updatePic = async (req, res) => {
    const { albumId, url } = req.body; 
    try {
      const updatedPicture = await Picture.findByPk(req.params.id);
      if (!updatedPicture) {
        res.send('Picture not found');
      } else {
        await updatedPicture.update({
          albumId,
          url
        });
        res.status(201).json({place: updatedPicture});
      }
    } catch(error) {
      res.status(422).send(
        {
          "message": error.message || "Invalid inputs passed."
        });
    }
}

const deletePic = (req, res) => {
    Picture.destroy({
      where: { id: req.params.id }
    })
      .then(picture => {
        res.status(201).json({ message: 'Deleted picture.' });
      })
      .catch(err => res.json(err));
}

module.exports = {
    getPics,
    getPicById,
    uploadPic,
    updatePic,
    deletePic
}