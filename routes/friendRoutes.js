const router = require('express').Router();
const {
  newFriend,
  deleteFriend,
} = require('../controllers/friendController.js')


// /api/users/:userId/friends/:friendId
router.route('/:friendId')
  .put(newFriend)
  .delete(deleteFriend);

module.exports = router;