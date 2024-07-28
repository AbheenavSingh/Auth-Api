const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://:FsRICjPunTBINVeXFym75jMFGYDkTYjt@redis-11416.c212.ap-south-1-1.ec2.redns.redis-cloud.com:11416'
});

redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

redisClient.connect();

module.exports = redisClient;
