const uuid = require('uuid').v4
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

let DUMMY_ALBUMS = [
  {
    id: 'a1',
    user_id: 'u1', 
    name: 'Lacanau1',
    taken_at: 'xx',
    spot_id: 's1'
  },
  {
    id: 'a2',
    user_id: 'u2', 
    name: 'Alpes',
    taken_at: 'xx',
    spot_id: 's2'
  }
];

const getAlbums = (req, res, next) => {
  res.json({ albums: DUMMY_ALBUMS });
};

const getAlbumById = (req, res, next) => {
  const albumId = req.params.id;

  const found = DUMMY_ALBUMS.find(a => {
    return a.id === albumId;
  });

  if (!found) {
    return next(
      new HttpError('Could not find album for the provided id.', 404)
    );
  }

  res.json({ found }); 
};

const getAlbumByName = (req, res, next) => {
    const albumName = req.params.name;
  
    const found = DUMMY_ALBUMS.find(a => {
      return a.name === albumName;
    });
  
    if (!found) {
      return next(
        new HttpError('Could not find album for the provided name.', 404)
      );
    }
  
    res.json({ found }); 
  };

const createAlbum = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { user_id, name, taken_at, spot_id } = req.body;

  const hasAlbum = DUMMY_ALBUMS.find(a => a.name === name);
  if (hasAlbum) {
    throw new HttpError('Could not create album, name already exists.', 422);
  }

  const createdAlbum = {
    id: uuid(),
    user_id,
    name,
    taken_at,
    spot_id
  };

  DUMMY_ALBUMS.push(createdAlbum);

  res.status(201).json({album: createdAlbum});
};

const updateAlbum = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { user_id, name, taken_at, spot_id } = req.body;
  const albumId = req.params.id;

  const updatedAlbum = { ...DUMMY_ALBUMS.find(a => a.id === albumId) };
  const albumIndex = DUMMY_ALBUMS.findIndex(a => a.id === albumId);
  updatedAlbum.user_id = user_id;
  updatedAlbum.name = name;
  updatedAlbum.taken_at = taken_at;
  updatedAlbum.spot_id = spot_id;

  DUMMY_ALBUMS[albumIndex] = updatedAlbum;

  res.status(200).json({album: updatedAlbum});
};

const deleteAlbum = (req, res, next) => {
  const albumId = req.params.id;
  DUMMY_ALBUMS = DUMMY_ALBUMS.find(a => a.id !== albumId);
  res.status(200).json({ message: 'Deleted album.' });
};

exports.getAlbums = getAlbums;
exports.getAlbumById = getAlbumById;
exports.getAlbumByName = getAlbumByName;
exports.createAlbum = createAlbum;
exports.updateAlbum = updateAlbum;
exports.deleteAlbum = deleteAlbum;
