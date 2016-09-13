const args = process.argv;
const contributors = require("./contributers.js");

if (args.length !== 4) {
  return console.log("Error, wrong number of arguments");
} else {
  var urls = contributors.getRepoContributors(args[2], args[3], contributors.getData);
}