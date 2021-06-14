const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = require("../models").users;

const getUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        limit: 10,
        order: [
          ['id', 'ASC']
        ]
      });
      res.json(users);
    } catch (error) {
        res.json(error);
    }
  }

const getUserById = async (req, res) => {
      try {
          const user = await User.findByPk(req.params.id);
          if (!user) {
            throw Error;
          }
          res.json(user);
      } catch (error) {
        res.status(404).send(
          {
            "message": error.message || "Could not find user for the provided id."
          });
      }
}

const getUserByName = async (req, res) => {
      try {
        const users = await User.findAll({
          where: { name: req.params.name }
        });
        if (users.length === 0) {
          throw Error;
        }
        res.json(users);
      } catch (error) {
        res.status(404).send(
          {
            "message": error.message || "Could not find user for the provided name."
          });
      }
}

const signup = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw Error;
      }
      const { name, email, password, role } = req.body; 
      console.log(req.body);
      await User.sync();
      try {
        const createdUser = await User.create({
          name,
          email,
          password,
          role
        });
        res.status(201).json(createdUser);
      } catch (error) {
        res.status(422).send(
          {
            "message": error.message || "Could not create user, invalid input."
          });
        }
      }

const login = async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({
          where: { email: email, password: password }
        });
        if (!user) {
          res.status(401).send({
            "message": 'Incorrect credentials'
          });
        }
        res.json({message: 'Logged in!'});
      } catch (error) {
        res.status(401).send(
          {
            "message": error.message || "Could not identify user, either email or password are missing."
          });
        }
      }

const updateUser = async (req, res) => {
        const { name, email, password, role } = req.body; 
        try {
          const updatedUser = await User.findByPk(req.params.id);
          if (!updatedUser) {
            res.send('User not found');
          } else {
            await updatedUser.update({
              name,
              email,
              password,
              role
            });
            res.status(201).json({place: updatedUser});
          }
        } catch(error) {
          res.status(422).send(
            {
              "message": error.message || "Invalid inputs passed, please check your data."
            });
        }
}

const deleteUser = (req, res) => {
        User.destroy({
          where: { id: req.params.id }
        })
        .then(user => {
          res.status(201).json({ message: 'Deleted user.' });
        })
        .catch(err => res.json(err));
}

module.exports = {
    getUsers,
    getUserById,
    getUserByName,
    signup,
    login,
    updateUser,
    deleteUser
}