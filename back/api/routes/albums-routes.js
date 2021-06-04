const express = require('express');
const { check } = require('express-validator');

const albumsControllers = require('../controllers/albums-controllers');

const router = express.Router();

router.get('/', albumsControllers.getAlbums);
router.get('/id/:id', albumsControllers.getAlbumById);
router.get('/name/:name', albumsControllers.getAlbumByName);

router.post(
  '/create',
  [
    check('user_id')
      .not()
      .isEmpty(),
    check('name')
      .not()
      .isEmpty(),
    check('taken_at')
      .not()
      .isEmpty(),
    check('spot_id')
      .not()
      .isEmpty(),
  ],
  albumsControllers.createAlbum);

router.put(
  '/:id',
  [
    check('user_id')
      .not()
      .isEmpty(),
    check('name')
      .not()
      .isEmpty(),
    check('taken_at')
      .not()
      .isEmpty(),
    check('spot_id')
      .not()
      .isEmpty(),
  ],
  albumsControllers.updateAlbum);

router.delete('/:id', albumsControllers.deleteAlbum);

module.exports = router;
