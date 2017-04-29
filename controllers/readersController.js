var bcrypt = require('bcryptjs');
var express = require('express');
var dateutil = require('dateutil');
var router  = express.Router();
var mysql = require('mysql')
var connection = require('../config/connection.js')

//this is the readers_controller.js file
router.get('/', function(req,res) {
  var query = "SELECT l.created, l.time_lapsed, b.title , DATE_FORMAT(l.created, '%d/%m/%Y') AS 'log_created' FROM logs l LEFT JOIN books b ON l.book_id = b.id WHERE user_id = ?";
  connection.query(query, [ req.session.user_id ], function(err, logs){
    //console.log(logs);
    //Get my books
    query = "SELECT ub.book_id, b.title, b.author, ub.current_page FROM user_books AS ub LEFT JOIN books AS b ON ub.book_id = b.id WHERE ub.user_id = ?";
    connection.query(query, [ req.session.user_id ], function(err, books){
      //console.log(books);
      var sum = 0;
      if (logs){
        for (var i = 0; i < logs.length; i++) {
        sum += logs[i].time_lapsed
        }
      }
      res.render('readers/readers', { 
        logs: logs,
        books: books,
        logged_in: req.session.logged_in,
        user_email: req.session.user_email,
        user_id: req.session.user_id,
        usertype: req.session.usertype,
        is_reader: req.session.is_reader,
        is_parent: req.session.is_parent,
        sum : sum
      });
    });


  });

  // var query = "SELECT * FROM books WHERE user_id = ?";
  // connection.query(query, [ req.session.user_id ], function(err, books){

  // });

  // res.render('readers/readers', req.session);
});


//logging time
router.post('/log', function(req,res) {
  //check if the user has already posted time
  // user_id int NOT NULL,
  // book_id int NOT NULL,
  // created date NOT NULL,
  // time_lapsed dec(6,2),
  console.log("Posting time");
  var today = new Date();
  var currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  console.log(currentDate);
  var totalTime = parseInt( req.body.totalTime );
  var query = "SELECT * FROM logs WHERE user_id = ? AND book_id = ? AND created = ? ";
  console.log("Query: " + query);
  console.log("Attributes: " + req.session.user_id + "  " + req.body.book + " " + currentDate  )
  connection.query(query, [ req.session.user_id, req.body.book, currentDate ], function(err, logs){
    // console.log(logs);
     //console.log(logs[0].time_lapsed);
    // var newTime = parseInt(logs[0].time_lapsed);
    // console.log("New time: " + newTime);
    if( logs == "" ){
      //Assumes no time logged
      query = "INSERT INTO logs (user_id, book_id, created, time_lapsed ) VALUES (?, ?, ?, ?)"
      console.log("Insert Query: " + query);
      connection.query(query, [ req.session.user_id, req.body.book, currentDate, req.body.totalTime ], function(err, response) {
        if (err) res.send('501');
        else {

          console.log("Refresh Readers Page - Insert");
          res.redirect("/readers");

          // var query = "SELECT l.created, l.time_lapsed, b.title , DATE_FORMAT(l.created, '%d/%m/%Y') AS 'log_created' FROM logs l LEFT JOIN books b ON l.book_id = b.id WHERE user_id = ?";
          // connection.query(query, [ req.session.user_id ], function(err, logs){
          //   //console.log(logs);
          //   //Get my books
          //   query = "SELECT ub.book_id, b.title, b.author, ub.current_page FROM user_books AS ub LEFT JOIN books AS b ON ub.book_id = b.id WHERE ub.user_id = ?";
          //   connection.query(query, [ req.session.user_id ], function(err, books){
          //     //console.log(books);
          //     var sum = 0;
          //     if (logs){
          //       for (var i = 0; i < logs.length; i++) {
          //       sum += logs[i].time_lapsed
          //       }
          //     };
          //       res.render('readers/readers', { 
          //         logs: logs,
          //         books: books,
          //         logged_in: req.session.logged_in,
          //         user_email: req.session.user_email,
          //         user_id: req.session.user_id,
          //         usertype: req.session.usertype,
          //         is_reader: req.session.is_reader,
          //         is_parent: req.session.is_parent,
          //         sum : sum
          //       });  //res.render
          //     });  //user book query
          //   });

        }; //After posting Insert
      });
    }else {
      console.log("DB Time: " + logs[0].time_lapsed);
      console.log("Lapse Time: " + totalTime );
      totalTime += parseInt(logs[0].time_lapsed);
      console.log("Total time: " + totalTime);
      query = "UPDATE logs SET time_lapsed = ? WHERE user_id = ? AND book_id = ? AND created = ?"
      console.log("Update Query: " + query);
      connection.query(query, [ totalTime, req.session.user_id, req.body.book, currentDate ], function(err, response) {
        if (err) res.send('600');
        else {
          console.log("Refresh Readers Page - Update");
          res.redirect("/readers");

          // var query = "SELECT l.created, l.time_lapsed, b.title , DATE_FORMAT(l.created, '%d/%m/%Y') AS 'log_created' FROM logs l LEFT JOIN books b ON l.book_id = b.id WHERE user_id = ?";
          // connection.query(query, [ req.session.user_id ], function(err, logs){
          //   //console.log(logs);
          //   //Get my books
          //   query = "SELECT ub.book_id, b.title, b.author, ub.current_page FROM user_books AS ub LEFT JOIN books AS b ON ub.book_id = b.id WHERE ub.user_id = ?";
          //   connection.query(query, [ req.session.user_id ], function(err, books){
          //     //console.log(books);
          //     var sum = 0;
          //     if (logs){
          //       for (var i = 0; i < logs.length; i++) {
          //       sum += logs[i].time_lapsed
          //       }
          //     };
          //       res.render('readers/readers', { 
          //         logs: logs,
          //         books: books,
          //         logged_in: req.session.logged_in,
          //         user_email: req.session.user_email,
          //         user_id: req.session.user_id,
          //         usertype: req.session.usertype,
          //         is_reader: req.session.is_reader,
          //         is_parent: req.session.is_parent,
          //         sum : sum
          //       });  //res.render
          //     });  //user book query
          //   });

        };
      });
  };

  });
});

module.exports = router;
