const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersControllers.getUsers);
router.get('/uid/:uid', usersControllers.getUserById);
router.get('/name/:name', usersControllers.getUserByName);

router.post(
    '/signup',
    [
      check('name')
        .not()
        .isEmpty(),
      check('email')
        .normalizeEmail() // Test@test.com => test@test.com
        .isEmail(),
      check('password').isLength({ min: 6 })
    ],
    usersControllers.signup
  );

router.post('/login', usersControllers.login);

router.put(
  '/:uid',
  [
    check('name')
        .not()
        .isEmpty(),
      check('email')
        .normalizeEmail() // Test@test.com => test@test.com
        .isEmail(),
      check('password').isLength({ min: 6 })
  ],
  usersControllers.updateUser
);

router.delete('/:uid', usersControllers.deleteUser);

module.exports = router;
