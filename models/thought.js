const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')

// Schema to create thought model
const thoughtSchema = new Schema( 
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      // timeSince is a function and we use the json version of the model when we fetch it.
      get: (date) => timeSince(date),
    },
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
  },
);

thoughtSchema.virtual('reactionCount').get(function () {
  return `${this.username} ${this.reactions}`;
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought;