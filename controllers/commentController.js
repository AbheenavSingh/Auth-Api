const Comment = require('../config/Comment');
const commentSchema = require('../validation/commentSchema');
const redisClient = require('../config/redisClient');

exports.createComment = async (req, res) => {
  const { error } = commentSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { postId, content } = req.body;

  try {
    const newComment = new Comment({
      postId,
      content,
      user: req.user.id
    });

    const comment = await newComment.save();

    // Invalidate the cache for comments on the specific post
    await redisClient.del(`comments:${postId}`);

    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCommentsForPost = async (req, res) => {
  const { postId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const comments = await Comment.find({ post: postId })
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Comment.countDocuments({ post: postId });

    res.json({
      comments,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
