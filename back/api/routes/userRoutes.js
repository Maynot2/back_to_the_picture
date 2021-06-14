const express = require('express');
const { check  } = require('express-validator');

const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getUserById);
router.get('/name/:name', userControllers.getUserByName);

router.post(
    '/signup',
    [
      check ('name')
        .not()
        .isEmpty(),
      check ('email')
        .normalizeEmail() // Test@test.com => test@test.com
        .isEmail(),
      check ('password').isLength({ min: 6 })
    ],
    userControllers.signup
  );

router.post('/login', userControllers.login);

router.put(
    '/:id',
    [
      check('name')
          .not()
          .isEmpty(),
        check('email')
          .normalizeEmail() // Test@test.com => test@test.com
          .isEmail(),
        check('password').isLength({ min: 6 })
    ],
    userControllers.updateUser
  );

router.delete('/:id', userControllers.deleteUser);

module.exports = router;