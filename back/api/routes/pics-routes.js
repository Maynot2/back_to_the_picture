const express = require('express');
const { check } = require('express-validator');

const picsControllers = require('../controllers/pics-controllers');

const router = express.Router();

router.get('/', picsControllers.getPics);
router.get('/id/:id', picsControllers.getPicById);

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
    picsControllers.uploadPic
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
  picsControllers.updatePic
);

router.delete('/:id', picsControllers.deletePic);

module.exports = router;
