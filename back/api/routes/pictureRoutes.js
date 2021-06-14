const express = require('express');
const { check } = require('express-validator');

const pictureControllers = require('../controllers/pictureControllers');

const router = express.Router();

router.get('/', pictureControllers.getPics);
router.get('/:id', pictureControllers.getPicById);

router.post(
    '/upload',
    [
      check('album_id')
        .not()
        .isEmpty(),
      check('url')
        .not()
        .isEmpty()
    ],
    pictureControllers.uploadPic
  );

router.put(
  '/:id',
  [
    check('album_id')
        .not()
        .isEmpty(),
    check('url')
        .not()
        .isEmpty()
  ],
  pictureControllers.updatePic
);

router.delete('/:id', pictureControllers.deletePic);

module.exports = router;