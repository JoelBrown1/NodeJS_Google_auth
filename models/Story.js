const mongoose = require('mongoose');

/**
 * making a data structure for the stories
 */
const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true
  },
  body: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Story', StorySchema);