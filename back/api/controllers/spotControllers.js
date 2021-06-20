const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Spot = require("../models").spots;
const Album = require("../models").albums;

const getSpotsT = async (req, res) => {
  await Spot.sync();

    try {
      const spots = await Spot.findAll();
      return res.json(spots);
    } catch (error) {
        return res.json(error);
    }
}

const getSpots = async (req, res) => {
    // min/max date format: yyyy-mm-dd
    await Spot.sync();
    let args = req.query
    let conditionQuery = {}
    if ('min_date' in req.query && 'max_date' in req.query)
    {
      conditionQuery = {
        where: {
          latitude: {
             [Op.between]: [Number(args.min_latitude), Number(args.max_latitude)],
          },
          longitude: {
            [Op.between]: [Number(args.min_longitude), Number(args.max_longitude)],
         },
        },
        include: { 
          model: Album,
          where: {
            takenAt: {
              [Op.between]: [new Date(args.min_date), new Date(args.max_date)],
            }
          }
        }
      }
    } else {
      conditionQuery = {
        where: {
          latitude: {
             [Op.between]: [Number(args.min_latitude), Number(args.max_latitude)],
          },
          longitude: {
            [Op.between]: [Number(args.min_longitude), Number(args.max_longitude)],
         },
        },
        include: { 
          model: Album
        }
      }
    }
    try {
      const spots = await Spot.findAll(conditionQuery);
      return res.json(spots);
    } catch (error) {
        return res.json(error);
    }
}

const getSpotById = async (req, res) => {
    try {
        const { id } = req.params;
        const spot = await Spot.findByPk(id);
        if (!spot) {
            throw Error;
        }
        return res.json(spot);
    } catch (error) {
        return res.status(404).send(
        {
            "message": error.message || "Could not find spot for the provided id."
        });
    }
}

const getSpotByName = async (req, res) => {
    try {
        const { name } = req.params;
        const spots = await Spot.findAll({
          where: { name: name }
        });
        if (spots.length === 0) {
          throw Error;
        }
        return res.json(spots);
    } catch (error) {
        return res.status(404).send(
        {
            "message": error.message || "Could not find spot for the provided name."
        });
    }
}

const createSpot = async (req, res) => {
    const { name, latitude, longitude } = req.body; 
    await Spot.sync();
    // const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }
    try {
      const createdSpot = await Spot.create({
        name,
        latitude,
        longitude
      });
      if (!createdSpot) {
        throw Error;
      }
      return res.status(201).json({spot: createdSpot});
    } catch (error) {
        return res.status(422).send(
        {
          "message": error.message || "Could not create spot, name already exists."
        });
    }
}

const updateSpot = async (req, res) => {
    const { name, latitude, longitude } = req.body; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const updatedSpot = await Spot.findByPk(id);
      if (!updatedSpot) {
        throw new Error("Spot not found.");
      } else {
        await updatedSpot.update({
          name,
          latitude,
          longitude
        });
        return res.status(201).json({place: updatedSpot});
      }
    } catch(error) {
        return res.status(422).send(
        {
          "message": error.message || "Invalid inputs passed, please check your data."
        });
    }
}

const deleteSpot = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedSpot = await Spot.destroy({
        where: { id: id }
      });
      if (deletedSpot) {
        return res.status(201).json({message: 'Spot deleted!'});
      }
      throw new Error("Spot not found.");
  } catch (error) {
      return res.status(422).send(error.message);
  }
};

module.exports = {
    getSpotsT,
    getSpots,
    getSpotById,
    getSpotByName,
    createSpot,
    updateSpot,
    deleteSpot
}