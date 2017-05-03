//Go Read App
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieParser =  require("cookie-parser");
var session = require("express-session");
var port = process.env.PORT || 3000;
var app = module.exports = express(); 
var json = require('jsonify');
var bcrypt = require('bcryptjs');

//For Mobile Connection
var mysql = require('mysql')
var connection = require('./config/connection.js')

//allow the use of sessions
app.use(session({ secret: 'app', cookie: { maxAge: 6*1000*1000*1000*1000*1000*1000 }}));
app.use(cookieParser());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var applicationController = require("./controllers/applicationController.js");
var usersController = require("./controllers/usersController.js");
var readersController = require("./controllers/readersController.js");
var parentsController = require("./controllers/parentsController.js");

app.use("/", applicationController);
app.use("/users", usersController);
app.use("/readers", readersController);
app.use("/parents", parentsController);


/* if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  read up on CORs here: https://www.maxcdn.com/one/visual-glossary/cors/
*/
  //allow the api to be accessed by other apps
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });

//Mobile routes
  app.get("/mobile/logs/:id", function(req, res) {
    console.log("Mobile get logs");
    console.log("id: " + req.params.id);

    var query = "SELECT l.created, l.time_lapsed, b.title , DATE_FORMAT(l.created, '%d/%m/%Y') AS 'log_created' FROM logs l LEFT JOIN books b ON l.book_id = b.id WHERE user_id = ?";
    connection.query(query, [ req.params.id ], function(err, response){
      //console.log(response);
      res.json(response);
    });
  });

  app.get("/mobile/books/:id", function(req, res) {
    console.log("Mobile get books");
    console.log("id: " + req.params.id);

    var query = "SELECT ub.book_id, b.title, b.author, ub.current_page FROM user_books AS ub LEFT JOIN books AS b ON ub.book_id = b.id WHERE ub.user_id = ?";
    connection.query(query, [ req.params.id ], function(err, response){
      //console.log(response);
      res.json(response);
    });
  });

  app.post("/mobile/login", function(req, res) {
    console.log("Mobile post login");
    console.log(req.body);
    console.log("The email: " + req.body.email);
    console.log("The password: " + req.body.password);

    var query = "SELECT * FROM users WHERE email = ?";

    connection.query(query, [ req.body.email ], function(err, response) {
      if (response.length == 0){
        var failed = {
                  error: 'Invalid e-mail',
                  userInfo: {
                    logged_in: false,
                    isLoading: false,
                  },
                };
        res.json(failed);
      }
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.compare(req.body.password, response[0].password_hash, function(err, result) {
              if (result == true){
                //console.log("Logged into the app");
                var resFinal = {
                    userInfo: {
                      logged_in: true,
                      user_id: response[0].id,
                      user_email: response[0].email,
                      usertype: response[0].usertype,
                      username: response[0].username,
                      is_reader: true,
                      is_parent: false,
                    }
                  };
                res.json(resFinal);
              }else{
                var resFinal = {
                  error: 'Invalid e-mail or password',
                  userInfo: {
                    logged_in: false,
                    isLoading: false,
                  },
                };
                res.json(resFinal);
              }
        });
      });
    });
  });

  app.post("/mobile/log", function(req, res) {
    //console.log("Posting time");
    var today = new Date();
    var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //console.log(currentDate);
    var totalTime = parseInt( req.body.totalTime );
    var query = "SELECT * FROM logs WHERE user_id = ? AND book_id = ? AND created = ? ";
    //console.log("Query: " + query);
    //console.log("Attributes: " + req.session.user_id + "  " + req.body.book + " " + currentDate  )
    connection.query(query, [ req.body.user_id, req.body.book, currentDate ], function(err, logs){
      if( logs == "" ){
        //Assumes no time logged
        query = "INSERT INTO logs (user_id, book_id, created, time_lapsed ) VALUES (?, ?, ?, ?)"
        //console.log("Insert Query: " + query);
        connection.query(query, [ req.body.user_id, req.body.book, currentDate, req.body.totalTime ], function(err, response) {
          if (err) res.send('501');
          else {

            //console.log("Refresh Readers Page - Insert");
            //res.redirect("/readers");
            res.send('Posted successfully');
          }; //After posting Insert
        });
      }else {
        //console.log("DB Time: " + logs[0].time_lapsed);
        //console.log("Lapse Time: " + totalTime );
        totalTime += parseInt(logs[0].time_lapsed);
        //console.log("Total time: " + totalTime);
        query = "UPDATE logs SET time_lapsed = ? WHERE user_id = ? AND book_id = ? AND created = ?"
        //console.log("Update Query: " + query);
        connection.query(query, [ totalTime, req.body.user_id, req.body.book, currentDate ], function(err, response) {
          if (err) res.send('600');
          else {
            //console.log("Refresh Readers Page - Update");
            //res.redirect("/readers");
            res.send('Posted successfully');
          };
        });
      };

    });
  });  

app.listen(port);