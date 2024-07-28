const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');
const cache = require('../middleware/cache');

// Create a post
router.post('/', auth, postController.createPost);

// Get all posts with caching
router.get('/', cache(() => 'posts'), postController.getPosts);


module.exports = router;
