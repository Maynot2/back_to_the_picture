const express = require('express');
const { check } = require('express-validator');

const spotControllers = require('../controllers/spotControllers');

const router = express.Router();

router.get('/', spotControllers.getSpots);
router.get('/:id', spotControllers.getSpotById);
router.get('/name/:name', spotControllers.getSpotByName);
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
  spotControllers.createSpot
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
  spotControllers.updateSpot
);

router.delete('/:id', spotControllers.deleteSpot);

module.exports = router;