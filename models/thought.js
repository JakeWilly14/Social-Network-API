const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
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
        type: String,
        required: true,
      },
    ],
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    id: false,
  },
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought;