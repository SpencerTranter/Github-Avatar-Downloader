const safe = require('dotenv').config()
const fs = require("fs");
const request = require('request');

module.exports = {
  downloadImageByURL: function(url, filePath){
    var writeStream = fs.createWriteStream(filePath);

    var options = {
      url: url,
      headers: {
        'User-Agent': 'request'
      },
      'auth':{
        'user': process.env.GIT_USER,
        'pass': process.env.GIT_KEY
      },
      json: true
    }

    request(options).pipe(writeStream);
  }
}