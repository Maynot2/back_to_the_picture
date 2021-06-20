const { validationResult } = require('express-validator');
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

const Picture = require("../models").pictures;

const getPics = async (req, res) => {
    try {
      const pictures = await Picture.findAll({
        limit: 10,
        order: [
          ['albumId', 'ASC']
        ]
      });
      return res.json(pictures);
    } catch (error) {
        return res.json(error);
    }
}

const getPicById = async (req, res) => {
    try {
        const { id } = req.params;
        const pictures = await Picture.findByPk(id);
        if (!pictures) {
          throw Error;
        }
        return res.json(pictures);
    } catch (error) {
      return res.status(404).send(
        {
          "message": error.message || "Could not find picture for the provided id."
        });
    }
}

const uploadPic =  async (req, res) => {
    const { albumId, url } = req.body;
    await Spot.sync();
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    try {
      const createdPicture = await Picture.create({
        albumId,
        url
      });
      if (!createdPicture) {
        throw Error;
      }
      return res.status(201).json({picture: createdPicture});
    } catch (error) {
      return res.status(422).send(
        {
          "message": error.message || "Could not create picture."
        });
      }
}

const updatePic = async (req, res) => {
    const { albumId, url } = req.body; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const updatedPicture = await Picture.findByPk(id);
      if (!updatedPicture) {
        res.send('Picture not found');
      } else {
        await updatedPicture.update({
          albumId,
          url
        });
        return res.status(201).json({place: updatedPicture});
      }
    } catch(error) {
        return res.status(422).send(
        {
          "message": error.message || "Invalid inputs passed."
        });
    }
}

const deletePic = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedPic = await Picture.destroy({
        where: { id: id }
      });
      if (deletedPic) {
        return res.status(201).json({message: 'Picture deleted!'});
      }
      throw new Error("Picture not found.");
  } catch (error) {
      return res.status(422).send(error.message);
  }
};

module.exports = {
    getPics,
    getPicById,
    uploadPic,
    updatePic,
    deletePic
}