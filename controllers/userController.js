const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
    },
    // Get single user by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => {
            !user
              ? res.status(404).json({ message: 'No user found with that ID '})
              : res.json(user)
            }
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create new user
    createUser(req,res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
    },
};