const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
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
PostSchema.index({ title: 'text' }); // Text index for full-text search on title
PostSchema.index({ user: 1, date: -1 }); // Compound index on user and date for sorting and filtering

module.exports = mongoose.model('Post', PostSchema);
