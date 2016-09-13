const safe = require('dotenv').config()
const fs = require("fs");
const request = require('request');


module.exports = {

  downloadImageByURL: function(url, filePath) {
    var options = {
      url: url,
      headers: {
        'User-Agent': 'request'
      },
      'auth': {
        'user': process.env.GIT_USER,
        'pass': process.env.GIT_KEY
      },
      json: true
    }

    if (!fs.existsSync('./avatars')) {
      fs.mkdirSync('./avatars');
    }

    var req = request(options, function(err, data) {
      if (err) {
        console.log(err);
        return;

      } else {
        writeWithExtension(data.headers['content-type'].split('/')[1]);
      }
    });

    var writeStream = fs.createWriteStream(filePath);
    req.pipe(writeStream);

    function writeWithExtension(extension) {
      fs.renameSync(filePath, filePath + "." + extension)
    }
  }

}
