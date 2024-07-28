const mongoose = require('mongoose');
const Post = require('./config/Post');
const Comment = require('./config/Comment');
require('dotenv').config();


// Connect to MongoDB

const db = process.env.MONGO_URI;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

async function createIndexes() {
  try {
    await Post.createIndexes();
    await Comment.createIndexes();
    console.log('Indexes created successfully');
  } catch (err) {
    console.error('Error creating indexes:', err);
  } finally {
    mongoose.disconnect();
  }
}

createIndexes();
