const safe = require('dotenv').config()
const request = require('request');
const images = require("./images.js");
const endPoint = 'http://api.github.com'

module.exports = {

  getRepoContributors: function(repoOwner, repoName, cb) {
    var options = {
      url: `${endPoint}/repos/${repoOwner}/${repoName}/contributors`,
      headers: {
        'User-Agent': 'request'
      },
      'auth':{
        'user': process.env.GIT_USER,
        'pass': process.env.GIT_KEY
      },
      json: true
    }
    request(options, cb);
  },

  getData: function (err, data, body){
    var i = 0;
    if (err){
      console.log(err);
      return;
    }
    for(curr in body){
      images.downloadImageByURL(body[curr].avatar_url, `./avatars/${i}.jpg`);
      i++;
    }
  }
}
