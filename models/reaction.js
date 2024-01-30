const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Schema.Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      // timeSince is a function and we use the json version of the model when we fetch it.
      get: (date) => timeSince(date),
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
  },
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;