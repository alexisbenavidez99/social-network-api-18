const router = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require('../controllers/userController');

const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    createReaction,
    removeReaction,
} = require('../controllers/thoughtController');

// User Routes

router.route('/users').get(getUsers).post(createUser);
router.route('/users/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);
router.route('/users/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Thought Routes

router.route('/thoughts').get(getThoughts).post(createThought);
router.route('/thoughts/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtById);
router.route('/thoughts/:thoughtId/reactions').post(createReaction);
router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

