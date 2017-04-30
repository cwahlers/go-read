//Go Read App
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieParser =  require("cookie-parser");
var session = require("express-session");
var port = process.env.PORT || 3000;
var app = module.exports = express(); 
var json = require('jsonify');

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

    var query = "SELECT * FROM users WHERE email = ?";

    connection.query(query, [ req.body.email ], function(err, response) {
      if (response.length == 0){
        res.redirect('/users/sign-in')
      }

        bcrypt.compare(req.body.password, response[0].password_hash, function(err, result) {
            if (result == true){
              console.log("Logged into the app");
              req.session.logged_in = true;
              req.session.user_id = response[0].id;
              req.session.user_email = response[0].email;
              req.session.usertype = response[0].usertype;
              req.session.username = response[0].username;

              console.log("Usertype: " + response[0].usertype );
              switch (response[0].usertype){
                  case 'R':
                    req.session.is_reader = true;
                    req.session.is_parent = false;
                    res.redirect('/readers');
                    break;
                  case 'P':
                    req.session.is_reader = false;
                    req.session.is_parent = true;
                    res.redirect('/parents');
                    break;
                  case 'T':
                    res.redirect('/readers');
                    break;
                }

            }else{
              res.redirect('/users/sign-in')
            }
      });
  });


  });

app.listen(port);