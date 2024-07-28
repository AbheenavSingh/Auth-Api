const Post = require('../config/Post');
const postSchema = require('../validation/postSchema');
const redis = require('../config/redisClient');

exports.createPost = async (req, res) => {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { title, content } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      user: req.user.id
    });

    const post = await newPost.save();

    redis.del('posts');

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
  exports.getPostsByUser = async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
  
    try {
      const posts = await Post.find({ user: userId })
        .sort({ date: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Post.countDocuments({ user: userId });
  
      res.json({
        posts,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  
};
