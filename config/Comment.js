const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Indexes
CommentSchema.index({ post: 1, date: -1 }); // Compound index on post and date for sorting and filtering
CommentSchema.index({ user: 1 }); // Index on user for user-specific queries

module.exports = mongoose.model('Comment', CommentSchema);
