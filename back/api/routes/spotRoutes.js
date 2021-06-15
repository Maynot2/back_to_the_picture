const Spot = require("../models").spots;
const Album = require("../models").albums;
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// http://localhost:5000/api/spots?min_latitude=48&max_latitude=50&min_longitude=4.8&max_longitude=1&min_date=2021-06-10&max_date=2021-06-30
// http://localhost:5000/api/spots?min_latitude=41.11&max_latitude=55.58&min_longitude=-11.32&max_longitude=16.04&min_date=2021-06-10&max_date=2021-06-30

module.exports = function(router) {

  router.get("/api/spots/test", async (req, res) => {
    // min/max date format: yyyy-mm-dd
    await Spot.sync();

    try {
      const spots = await Spot.findAll();
      res.json(spots);
    } catch (error) {
      res.json(error);
    }
  });
  router.get("/api/spots", async (req, res) => {
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

  

  router.post("/api/spots", async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   throw Error;
    // }
    const { name, latitude, longitude } = req.body; 
    await Spot.sync();
    try {
      const createdSpot = await Spot.create({
        name,
        latitude,
        longitude,
      });
      console.log('->', createdSpot)
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