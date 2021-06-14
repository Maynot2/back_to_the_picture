const express = require('express');
const { check } = require('express-validator');

const albumControllers = require('../controllers/albumControllers');

const router = express.Router();

router.get('/', albumControllers.getAlbums);
router.get('/:id', albumControllers.getAlbumById);
router.get('/name/:name', albumControllers.getAlbumByName);
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
  albumControllers.createAlbum);

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
  albumControllers.updateAlbum);

router.delete('/:id', albumControllers.deleteAlbum);

router.get(':id/pictures', albumControllers.getAlbumByIdPic);

module.exports = router;
