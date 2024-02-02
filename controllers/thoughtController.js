const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({_id: req.params.thoughtId});

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID exist.' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }, 

  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created, but found no user with that ID' });
      }

      res.json('Created a thought! 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought deleted but no user with this id!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true })
          .populate({path: 'reactions', select: '-__v'})
          .select('-__v');

      if (!thought) {
        return res.status(404).json({
          message: 'Reaction created, but found no thought with that ID',
        })
      }

      res.json({ message: 'Created the reaction! 🎉' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a reaction from associated thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'No thought with that ID',
        })
      }

      res.json({ message: 'Deleted the reaction!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}