const safe = require('dotenv').config();
const request = require('request');
const images = require("./images.js");
const endPoint = 'http://api.github.com';

module.exports = {

  getRepoContributors: function(repoOwner, repoName, cb) {
    var options = {
      url: `${endPoint}/repos/${repoOwner}/${repoName}/contributors`,
      headers: {
        'User-Agent': 'request'
      },
      'auth': {
        'user': process.env.GIT_USER,
        'pass': process.env.GIT_KEY
      },
      json: true
    }
    request(options, cb);
  },

  getData: function (err, data, body) {
    if (err) {
      console.log(err);
      return;
    }
    try{
      for(curr in body) {
        images.downloadImageByURL(body[curr].avatar_url, `./avatars/${body[curr].login}`);
      }
    } catch(e) {
      console.log("Error, incorrect GitHub user or repo", e);
    }
  }
}
