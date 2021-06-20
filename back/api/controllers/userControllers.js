const { validationResult } = require('express-validator');
// const Sequelize = require('sequelize');

const User = require("../models").users;

const getUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        limit: 10,
        order: [
          ['id', 'ASC']
        ]
      });
      return res.json(users);
    } catch (error) {
        return res.json(error);
    }
  }

const getUserById = async (req, res) => {
      try {
          const { id } = req.params;
          const user = await User.findByPk(id);
          if (!user) {
            throw Error;
          }
          return res.json(user);
      } catch (error) {
          return res.status(404).send(
          {
            "message": error.message || "Could not find user for the provided id."
          });
      }
}

const getUserByName = async (req, res) => {
      try {
        const { name } = req.params;
        const users = await User.findAll({
          where: { name: name }
        });
        if (users.length === 0) {
          throw Error;
        }
        return res.json(users);
      } catch (error) {
          return res.status(404).send(
          {
            "message": error.message || "Could not find user for the provided name."
          });
      }
}

const signup = async (req, res) => {
      const { name, email, password, role } = req.body; 
      await User.sync();
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const createdUser = await User.create({
          name,
          email,
          password,
          role
        });
        if (!createdUser) {
          throw Error;
        }
        return res.status(201).json({user: createdUser});
      } catch (error) {
           return res.status(422).send(
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
          throw Error;
        }
        return res.json({message: 'Logged in!'});
      } catch (error) {
          return res.status(401).send(
          {
            "message": error.message || "Incorrect credentials."
          });
        }
      }

const updateUser = async (req, res) => {
        const { name, email, password, role } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
          const { id } = req.params;
          const updatedUser = await User.findByPk(id);
          if (!updatedUser) {
            throw new Error("User not found.");
          } else {
            await updatedUser.update({
              name,
              email,
              password,
              role
            });
            return res.status(201).json({place: updatedUser});
          }
        } catch(error) {
            return res.status(422).send(
            {
              "message": error.message || "Invalid inputs passed, please check your data."
            });
        }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.destroy({
          where: { id: id }
        });
        if (deletedUser) {
          return res.status(201).json({message: 'User deleted!'});
        }
        throw new Error("User not found.");
    } catch (error) {
        return res.status(422).send(error.message);
    }
};

module.exports = {
    getUsers,
    getUserById,
    getUserByName,
    signup,
    login,
    updateUser,
    deleteUser
}