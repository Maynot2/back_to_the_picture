const uuid = require('uuid').v4
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

let DUMMY_SPOTS = [
  {
    id: 's1',
    name: 'Eiffel tower',
    latitude: '48.858560665000006', 
    longitude: '2.294449111834222'
  },
  {
    id: 's2',
    name: 'Palais Ideal du Facteur Cheval',
    latitude: '45.256749045596464',
    longitude: '2.294449111834222'
  },
  {
    id: 's3',
    name: 'Test2',
    latitude: '45.120053',
    longitude: '2.793638'
  },
  {
    id: 's4',
    name: 'Test3',
    latitude: '48.848451',
    longitude: '2.425747'
  }
];

const getSpots = (req, res, next) => {
  res.json({ spots: DUMMY_SPOTS });
};

const getSpotById = (req, res, next) => {
  const spotId = req.params.id; // { id: 's1' }

  const found = DUMMY_SPOTS.find(s => {
    return s.id === spotId;
  });

  if (!found) {
    return next(
      new HttpError('Could not find spot for the provided id.', 404)
    );
  }

  res.json({ found }); 
};

const getSpotByName = (req, res, next) => {
    const spotName = req.params.name; 
  
    const found = DUMMY_SPOTS.find(s => {
      return s.name === spotName;
    });
  
    if (!found) {
      return next(
        new HttpError('Could not find spot for the provided name.', 404)
      );
    }
  
    res.json({ found }); 
  };

const createSpot = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { name, latitude, longitude } = req.body;

  const hasSpot = DUMMY_SPOTS.find(s => s.name === name);
  if (hasSpot) {
    throw new HttpError('Could not create spot, name already exists.', 422);
  }

  const createdSpot = {
    id: uuid(),
    name,
    latitude,
    longitude
  };

  DUMMY_SPOTS.push(createdSpot);

  res.status(201).json({spot: createdSpot});
};

const updateSpot = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { name, latitude, longitude } = req.body;
  const spotId = req.params.id;

  const updatedSpot = { ...DUMMY_SPOTS.find(s => s.id === spotId) };
  const spotIndex = DUMMY_SPOTS.findIndex(s => s.id === spotId);
  updatedSpot.name = name;
  updatedSpot.latitude = latitude;
  updatedSpot.longitude = longitude;

  DUMMY_SPOTS[spotIndex] = updatedSpot;

  res.status(200).json({spot: updatedSpot});
};

const deleteSpot = (req, res, next) => {
  const spotId = req.params.id;
  DUMMY_SPOTS = DUMMY_SPOTS.find(s => s.id !== spotId);
  res.status(200).json({ message: 'Deleted spot.' });
};

exports.getSpots = getSpots;
exports.getSpotById = getSpotById;
exports.getSpotByName = getSpotByName;
exports.createSpot = createSpot;
exports.updateSpot = updateSpot;
exports.deleteSpot = deleteSpot;
