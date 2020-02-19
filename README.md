# GH-Search-Proxy

This application is a code challenge from Hotel Engine. Here are the requirements: The objective is to build a repository search application using the Github repository search API (https://developer.github.com/v3/search/#search-repositories) that displays the results of a query. This app should query an API that you write in node. The node API should implement response caching to prevent more requests than necessary being made to Github.
The list should be able to sort by relevance (score) and number of stars and also should be able to filter by language.
Each result when selected should route to a detailed screen that displays information about the repository. The results should contain the repository name, description, number of stars, language, and the owners name. You can include more information as you see fit to enhance the UI.

## Tech

The tech used in this app includes:

- Node.js
- Express.js
- redis
- node-fetch
- CORS

## Setup

1) Run `git clone https://github.com/N-Gibson/gh-search-proxy.git`

2) Cd into directory

3) Run `npm install` to install dependencies

4) Run `nodemon server.js` to start server

At the moment this proxy server only has one endpoint: http://localhost:3001/repositories/${keyword}. The enpoint that it hits is the GitGub Repository server at https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc

5) Please visit the front end [here](https://github.com/N-Gibson/gh-search)
