
const app = require('../app');
const cluster = require('cluster');

const { SERVER_PORT, } = process.env;

function startServer() {

    // returns http-server instance
    return app.listen(SERVER_PORT, function(err) {
        if (err) {
          return console.error(err);
        }
  
        console.log('Listening at http://localhost:' + SERVER_PORT);
    });
};

module.exports = startServer();