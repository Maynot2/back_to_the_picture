const uuid = require('uuid').v4
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Melvin',
    email: 'mel@test.com',
    password: 'tester1',
    role: 'user'
  },
  {
    id: 'u2',
    name: 'Robert',
    email: 'rob@test.com',
    password: 'tester2',
    role: 'user'
  }
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const getUserById = (req, res, next) => {
  const userId = req.params.uid; // { id: 'u1' }

  const found = DUMMY_USERS.find(u => {
    return u.id === userId;
  });

  if (!found) {
    return next(
      new HttpError('Could not find places for the provided id.', 404)
    );
  }

  res.json({ found }); // => { user } => { user: user }
};

const getUserByName = (req, res, next) => {
    const userName = req.params.name; // { name: 'Melvin' }
  
    const found = DUMMY_USERS.find(u => {
      return u.name === userName;
    });
  
    if (!found) {
      return next(
        new HttpError('Could not find places for the provided name.', 404)
      );
    }
  
    res.json({ found }); // => { user } => { user: user }
  };

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { name, email, password, role } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const createdUser = {
    id: uuid(),
    name, // name: name
    email,
    password,
    role
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
  }

  res.json({message: 'Logged in!'});
};

const updateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }
  const { name, email, password, role } = req.body;
  const userId = req.params.uid;

  const updatedUser = { ...DUMMY_USERS.find(u => u.id === userId) };
  const userIndex = DUMMY_USERS.findIndex(u => u.id === userId);
  updatedUser.name = name;
  updatedUser.email = email;
  updatedUser.password = password;
  updatedUser.role = role;

  DUMMY_USERS[userIndex] = updatedUser;

  res.status(200).json({place: updatedUser});
};

const deleteUser = (req, res, next) => {
  const userId = req.params.uid;
  DUMMY_PLACES = DUMMY_USERS.find(u => u.id !== userId);
  res.status(200).json({ message: 'Deleted user.' });
};

exports.getUserById = getUserById;
exports.getUserByName = getUserByName;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
