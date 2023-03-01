const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find({})
          .sort({ createdAt: -1 })
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
    },
    // Get thought user by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) => {
            if (!thought) {
              res.status(404).json({ message: 'No thought found with that ID '})
            } else {
                res.json(thought)
            }
        })
        .catch((err) => res.status(500).json(err));
    },
    // Create new thought
    createThought(req,res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: thought._id } },
              { new: true }
            );
          })
          .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with that ID' });
                return;
            }
            res.json({ message: 'Thought created successfully!' });
          })
          .catch((err) => {
            res.status(400).json(err);
          })
    },
    // Update thought by id
    updateThoughtById(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought 
          ? res.status(404).json({ message: 'No thought found by that ID' })
          : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete thought by id
    deleteThoughtById(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found witht that ID' })
                return;
            }
            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thought: req.params.thoughtId } },
                { new: true }
            );
          })
          .then((user) => {
            res.json({ message: 'Thought deleted successfully!' })
          })
          .catch((err) => {
            res.status(400).json(err);
          });
    },
    // Create reaction 
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this ID' });
                return;
            }
            res.json(thought);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    },
    // Remove reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this ID' });
                return;
            }
            res.json(thought);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    }
};