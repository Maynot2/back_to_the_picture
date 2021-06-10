const Spot = require("../models").spots;
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function(router) {

  router.get("/api/spots", async (req, res) => {
    try {
      const spots = await Spot.findAll({
        limit: 10,
        order: [
          ['name', 'ASC']
        ]
      });
      res.json(spots);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/api/spots/:id", async (req, res) => {
    try {
        const spot = await Spot.findByPk(req.params.id);
        if (!spot) {
          throw Error;
        }
        res.json(spot);
    } catch (error) {
      res.status(404).send(
        {
          "message": error.message || "Could not find spot for the provided id."
        });
    }
  });

  router.get("/api/spots/name/:name", async (req, res) => {
    try {
      const spots = await Spot.findAll({
        where: { name: req.params.name }
      });
      console.log(spots.lenght);
      if (spots.length === 0) {
        throw Error;
      }
      res.json(spots);
    } catch (error) {
      res.status(404).send(
        {
          "message": error.message || "Could not find spot for the provided name."
        });
    }
  });

  router.post("/api/spots/create", async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw Error;
    }
    const { name, latitude, longitude } = req.body; 
    try {
      const createdSpot = await Spot.create({
        name,
        latitude,
        longitude
      });
      res.status(201).json({spot: createdSpot});
    } catch (error) {
      res.status(422).send(
        {
          "message": error.message || "Could not create spot, name already exists."
        });
      }
    });
    
    router.put('/api/spots/:id', async (req, res) => {
      const { name, latitude, longitude } = req.body; 
      try {
        const updatedSpot = await Spot.findByPk(req.params.id);
        if (!updatedSpot) {
          res.send('Spot not found');
        } else {
          await updatedSpot.update({
            name,
            latitude,
            longitude
          });
          res.status(201).json({place: updatedSpot});
        }
      } catch(error) {
        res.status(422).send(
          {
            "message": error.message || "Invalid inputs passed, please check your data."
          });
      }
    });

    // check if id is present
  router.delete("/api/spots/:id", (req, res) => {
    Spot.destroy({
      where: { id: req.params.id }
    })
      .then(spot => {
        res.status(201).json({ message: 'Deleted spot.' });
      })
      .catch(err => res.json(err));
  });
};