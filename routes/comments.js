const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');
const cache = require('../middleware/cache');

// Create a comment
router.post('/', auth, commentController.createComment);

// Get comments for a post with caching
router.get('/:postId', cache((req) => `comments:${req.params.postId}`), commentController.getComments);

module.exports = router;


