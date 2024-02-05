const { Schema, model } = require('mongoose');
const moment = require('moment')

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
      default: Date.now,
      get: timestamp => moment(timestamp).format('LLL'),
    },
  },
  {
    toJSON: { 
      getters: true, 
      virtuals: true 
    },
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
      default: Date.now,
      get: timestamp => moment(timestamp).format('LLL'),
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
    toJSON: { 
      getters: true, 
      virtuals: true 
    },
    id: false,
  },
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought;