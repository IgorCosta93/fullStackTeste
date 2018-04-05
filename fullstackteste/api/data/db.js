var mongoose = require('mongoose');
//LOCAL
var dburl = 'mongodb://localhost:27017/db8';
//MLAB
var dburl = 'mongodb://<usuario>:<senha>@ds233739.mlab.com:33739/fullstackteste'
var retry = null;
mongoose.connect(dburl,{
    useMongoClient: true
});

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

function gracefulShutdown(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
}

process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function($location, $window, AuthFactory) {
  gracefulShutdown('App termination (SIGINT)', function() {
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  gracefulShutdown('App termination (SIGTERM)', function() {
    process.exit(0);
  });
});

require('./candidato.model');
