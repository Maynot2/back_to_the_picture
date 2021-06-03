const uuid = require('uuid').v4
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

let DUMMY_PICS = [
  {
    id: 'p1',
    url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/mathieu-chirico-JSEn2f96rzY-unsplash.jpg',
    album_id: '1'
  },
  {
    id: 'p2',
    url: 'https://hbnb-bttp-s3.s3.eu-west-3.amazonaws.com/philipp-kammerer-thFqCz8cXu0-unsplash.jp',
    album_id: '1'
  }
];

const getPics = (req, res, next) => {
  res.json({ users: DUMMY_PICS });
};

const getPicById = (req, res, next) => {
  const picId = req.params.id;

  const found = DUMMY_PICS.find(p => {
    return p.id === picId;
  });

  if (!found) {
    return next(
      new HttpError('Could not find picture for the provided id.', 404)
    );
  }

  res.json({ found }); 
};

const uploadPic = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { album_id, url } = req.body;

  const hasPic = DUMMY_PICS.find(p => p.url === url);
  if (hasPic) {
    throw new HttpError('Could not upload user, pic already exists.', 422);
  }

  const uploadedPic = {
    id: uuid(),
    album_id,
    url
  };

  DUMMY_PICS.push(uploadedPic);

  res.status(201).json({user: uploadedPic});
};

const updatePic = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { album_id, url } = req.body;
  const picId = req.params.id;

  const updatedPic = { ...DUMMY_PICS.find(p => p.id === picId) };
  const picIndex = DUMMY_PICS.findIndex(p => p.id === picId);
  updatedPic.album_id = album_id;
  updatedPic.url = url;

  DUMMY_PICS[picIndex] = updatedPic;

  res.status(200).json({place: updatedPic});
};

const deletePic = (req, res, next) => {
  const picId = req.params.id;
  DUMMY_PICS = DUMMY_PICS.find(p => p.id !== picId);
  res.status(200).json({ message: 'Deleted picture.' });
};

exports.getPicById = getPicById;
exports.getPics = getPics;
exports.uploadPic = uploadPic;
exports.updatePic = updatePic;
exports.deletePic = deletePic;
