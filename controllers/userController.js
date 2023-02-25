const { User } = require('../models');

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
    // Update user by id
    updateUserById(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with this ID' })
          : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete user by id
    deleteUserById(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this ID' })
                return;
            }
        })
        .then((user) => {
            res.json({ message: 'User delete successfully!' })
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    },
    // Add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.body } },
            { runValidators: true, new: true }
        )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with that ID' })
                return;
            }
            res.json(user);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    },
    // Remove friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { userId: req.params.userId } } },
            { new: true }
        )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this ID' })
                return;
            }
            res.json(user);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    }
};