const args = process.argv;
const contributors = require("./contributers.js");

var urls = contributors.getRepoContributors(args[2], args[3], contributors.getData);