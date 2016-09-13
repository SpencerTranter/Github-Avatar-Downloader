const request = require('request');
const endPoint = 'http://api.github.com'
const images = require("./images.js");

module.exports = {

  getRepoContributors: function(repoOwner, repoName, cb) {
    var options = {
      url: `${endPoint}/repos/${repoOwner}/${repoName}/contributors`,
      headers: {
        'User-Agent': 'request'
      },
      'auth':{
        'user': 'SpencerTranter',
        'pass': '61c1743a64f3cd449522ba6ec00c5d6dad3f3b5b'
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
