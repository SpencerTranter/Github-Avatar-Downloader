const fs = require("fs");
const request = require('request');
const http = require('http');

const args = process.argv;
const repoOwner = 'lighthouse-labs' //args[2];
const repoName = 'laser_shark' //args[3];
const endPointAuth = 'http://SpencerTranter:61c1743a64f3cd449522ba6ec00c5d6dad3f3b5b@api.github.com'
var filePath = '${endPointAuth}/repos/${repoOwner}/${repoName}/contributors'

function grabData(err, data, body){
  var i = 1;
  if (err){
    console.log(err);
    return;
  }
  for(curr in body){
    downloadImageByURL(body[curr].avatar_url, './avatars/' + i + '.jpg');
    i++;
  }
}


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: `${endPointAuth}/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request'
    },
    json: true
  }
  request(options, cb);
}

function downloadImageByURL(url, filePath){
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

getRepoContributors(repoOwner, repoName, grabData);


// const endpoint = 'https://api.github.com';

// request.get({
//   url: endpoint + /users/:username/repos
//   qs: {
//     state: process.argv[2]
//   },
//   headers: {
//     'User-Agent': 'Lighthouse'
//   },
//   json: true
// }, function (err, incomingMessage, responseBody) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   // It's either this or add `json: true` to the options object above
//   // var parsedResponse = JSON.parse(responseBody);
//   console.log(responseBody.length);
// });



// /repos/:owner/:repo/contributors

// // function printExampleHTML(err, response, body){
// //   if (err) {
// //     console.log(err);
// //   }
// //   console.log(body);
// // };

// // var request = require("request");

// // request("http://www.example.com", printExampleHTML);