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
        'user': safe.GIT_USER,
        'pass': safe.GIT_KEY
      },
      json: true
    }
    request(options, cb);
  },

  getData: function (err, data, body) {
    if(checkError(err, body)){
      try {
        console.log("Compying avatars to ./avatars !");
        for(curr in body) {
          images.downloadImageByURL(body[curr].avatar_url, `./avatars/${body[curr].login}`);
        }
        console.log("Files copied!");
      } catch(e) {
        console.log(e);
      }
    }
  }

}

function checkError(err, body){
  if (err) {
    console.log(err);
    return false;
  }

  switch (body.message) {
    case'Bad credentials':
      console.log("Error: bad credentials in .env");
      return false;
    case'Not Found':
      console.log("Error: GitHub repo or user not found");
      return false;
  }
  return true;
}
