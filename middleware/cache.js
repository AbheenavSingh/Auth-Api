const redisClient = require('../config/redisClient');

const cache = (keyGenerator) => async (req, res, next) => {
  if (typeof keyGenerator !== 'function') {
    return next(new Error('keyGenerator must be a function'));
  }

  try {
    const key = keyGenerator(req);
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      redisClient.set(key, JSON.stringify(body), 'EX', 60 * 15); // Cache for 15 minutes
      res.sendResponse(body);
    };

    next();
  } catch (err) {
    console.error('Cache middleware error: ', err);
    next();
  }
};

module.exports = cache;
