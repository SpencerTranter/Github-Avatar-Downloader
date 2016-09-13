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
        'user': 'SpencerTranter',
        'pass': '61c1743a64f3cd449522ba6ec00c5d6dad3f3b5b'
      },
      json: true
    }

    request(options).pipe(writeStream);
  }
}