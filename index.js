const server = require("./lib/server");
const cli = require("./lib/cli");

const app = {};

app.init = function() {
  //call the function to start the server listening
  server.init();

  //call the function to start the command line interface after 100 ms
  setTimeout(function(){
    cli.init()
  }, 100)
}

app.init();

module.exports = app;