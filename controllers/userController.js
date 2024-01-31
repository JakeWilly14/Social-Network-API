const { User, Thought } = require('../models')

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err)
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({_id: req.params.studentId})

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID'})
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err)
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user 
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a thought from associated user 
    async removeThought(req, res) {
      try {             
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: {thoughts: req.params.thoughtId} },
          { runValidators: true, new: true }
        );
        
        if (!req.params.thoughtId) {
          return res.status(404).json({ message: 'No such thought exists' });
        }
  
        res.json({ message: 'Thought successfully deleted' }, user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

  // Update an associated user with a friend
  async newFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: {friends: req.params.friendId} },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json({ message: 'Successfully added a new friend.' }, user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a friend from associated user
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friends: req.param.friendId} },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json({ message: 'Successfully added a new friend.' }, user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}