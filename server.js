const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

async function searchRepos(req, res, next) {
  try {
    const { keyword } = req.params; 
    const response = await fetch(`https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc`);
    const repositories = await response.json();
    client.setex(keyword, 86400, repositories);
  } catch(error) {
    console.error(error);
  }
};

app.get('/repositories/:keyword', searchRepos);

app.listen(3000, () => {
  console.log(`App listening on port ${PORT}`);
});
