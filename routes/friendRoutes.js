const router = require('express').Router();
const {
  newFriend,
  deleteFriend,
} = require('../controllers/friendController.js')


// /api/users/:userId/friends
router.route('/:userId/friends')
  .put(newFriend);

// /api/users/:userId/friends/friendId
router.route('/:userId/friends/:friendId')
  .delete(deleteFriend);

module.exports = router;