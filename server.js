const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

app.get('/repositories/:keyword', cacheMiddleware, async (req, res) => {
  try {
    const { keyword } = req.params;
    const response = await fetch(`https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc`);
    const repositories = await response.json();

    client.setex(keyword, 86400, JSON.stringify(repositories));
  } catch(error) {
    console.error(error)
  }
});

function cacheMiddleware(req, res, next) {
  const { keyword } = req.params;

  client.get(keyword, (error, repositories) => {
    if(error) {
      throw error;
    };

    if(repositories !== null) {
      res.send(repositories);
    } else {
      next();
    }
  });
};

app.listen(3000, () => {
  console.log(`App listening on port ${PORT}`);
});
