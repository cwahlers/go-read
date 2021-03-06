// Set up MySQL connection.
var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "simple_db"
// });

var app = require('../server');

console.log('--------------the environment we are using----------------');
console.log(app.settings.env);
console.log('--------------the environment we are using----------------');

// if (app.settings.env == 'development'){
//   var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "simple_db"
//   });
// }else {
//   var connection = mysql.createConnection(process.env.JAWSDB_URL);
// }
  var connection;
  if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
  } else {
    connection = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "simple_db"
   });
  };

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;