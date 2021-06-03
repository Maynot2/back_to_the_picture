const express = require('express');
const { check } = require('express-validator');

const spotsControllers = require('../controllers/spots-controllers');

const router = express.Router();

router.get('/', spotsControllers.getSpots);
router.get('/id/:id', spotsControllers.getSpotById);
router.get('/name/:name', spotsControllers.getSpotByName);

router.post(
    '/create',
    [
      check('name')
        .not()
        .isEmpty(),
      check('latitude')
        .not()
        .isEmpty(),
      check('longitude')
        .not()
        .isEmpty()
    ],
    spotsControllers.createSpot
  );

router.put(
  '/:id',
  [
    check('name')
        .not()
        .isEmpty(),
      check('latitude')
        .not()
        .isEmpty(),
      check('longitude')
        .not()
        .isEmpty()
  ],
  spotsControllers.updateSpot
);

router.delete('/:id', spotsControllers.deleteSpot);

module.exports = router;
