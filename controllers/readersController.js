var bcrypt = require('bcryptjs');
var express = require('express');
var dateutil = require('dateutil');
var router  = express.Router();
var request = require('request');
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
});



//logging time
router.post('/log', function(req,res) {
  //check if the user has already posted time
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
    if( logs == "" ){
      //Assumes no time logged
      query = "INSERT INTO logs (user_id, book_id, created, time_lapsed ) VALUES (?, ?, ?, ?)"
      console.log("Insert Query: " + query);
      connection.query(query, [ req.session.user_id, req.body.book, currentDate, req.body.totalTime ], function(err, response) {
        if (err) res.send('501');
        else {

          console.log("Refresh Readers Page - Insert");
          res.redirect("/readers");
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
        };
      });
    };
  });
});


//Search book
router.get('/search', function(req,res) {
  var apiKey = 'AIzaSyBfgy9-c2w3ALEyfhQvxk8v5x4TvC2eQd4';
  res.render('readers/search', { 
    logged_in: req.session.logged_in,
    user_email: req.session.user_email,
    user_id: req.session.user_id,
    usertype: req.session.usertype,
    is_reader: req.session.is_reader,
    is_parent: req.session.is_parent,  
  });
});


//add book
router.post('/addbook', function(req, res) {
  //check if the user has already posted time
  console.log("Add book");
  console.log("User: " , req.body.user_id);
  var apiKey = 'AIzaSyBfgy9-c2w3ALEyfhQvxk8v5x4TvC2eQd4';  

    var query = "SELECT * FROM books WHERE google_id = ?";
    connection.query(query, [ req.body.id ], function(err, findBook){
      console.log("findBook: ", findBook);
      console.log(findBook.length);
      if (findBook.length >= 1){
        console.log("Book already exists");
        assignBook(req.body.user_id, findBook[0].id);
        //res.redirect("/readers");
        return;
      } else { //add book to db
        console.log("Books does not exist in the db");
        var insert = "INSERT INTO books (title, author, isbn, google_id, pages ) VALUES (?, ?, ?, ?, ? )";
        //console.log("Insert Query: " + insert);

        console.log(req.body.title)
        console.log(req.body.author)
        console.log(req.body.isbn)
        console.log(req.body.id)
        console.log(req.body.pages)

        connection.query(insert, [ req.body.title, req.body.author, req.body.isbn, req.body.id, req.body.pages ], function(err, newBook) {
          console.log(err);
          console.log(newBook);
          if (err) console.log(err);
          else {
            console.log("Refresh Readers Page - Inserted Book");
            console.log("New Book Id: " , newBook.insertId);
            assignBook(req.body.user_id, newBook.insertID);

            //res.redirect("/readers");
            return;
          }; //After posting Insert
        });
        //res.redirect("/readers");
        return;
      }
    }); //End check if book exists
});
  // var query = "SELECT ub.book_id, b.title, b.author, ub.current_page FROM user_books AS ub LEFT JOIN books AS b ON ub.book_id = b.id WHERE ub.user_id = ?";
  // connection.query(query, [ req.session.user_id ], function(err, books){
  //   //console.log(books);
  //   var sum = 0;
  //   if (logs){
  //     for (var i = 0; i < logs.length; i++) {
  //     sum += logs[i].time_lapsed
  //     }
  //   }
  // });

 // res.redirect("/readers");

  // var query = "SELECT * FROM books WHERE isbn = ? ";
  // console.log("Query: " + query);
  // console.log("Attributes: " + req.session.user_id + "  " + req.body.book + " " + currentDate  )
  // connection.query(query, [ req.session.user_id, req.body.book, currentDate ], function(err, logs){
  //   // console.log(logs);
  //   if( logs == "" ){
  //     //Assumes no time logged
  //     query = "INSERT INTO logs (user_id, book_id, created, time_lapsed ) VALUES (?, ?, ?, ?)"
  //     console.log("Insert Query: " + query);
  //     connection.query(query, [ req.session.user_id, req.body.book, currentDate, req.body.totalTime ], function(err, response) {
  //       if (err) res.send('501');
  //       else {

  //         console.log("Refresh Readers Page - Insert");
  //         res.redirect("/readers");
  //       }; //After posting Insert
  //     });
  //   }else {
  //     console.log("DB Time: " + logs[0].time_lapsed);
  //     console.log("Lapse Time: " + totalTime );
  //     totalTime += parseInt(logs[0].time_lapsed);
  //     console.log("Total time: " + totalTime);
  //     query = "UPDATE logs SET time_lapsed = ? WHERE user_id = ? AND book_id = ? AND created = ?"
  //     console.log("Update Query: " + query);
  //     connection.query(query, [ totalTime, req.session.user_id, req.body.book, currentDate ], function(err, response) {
  //       if (err) res.send('600');
  //       else {
  //         console.log("Refresh Readers Page - Update");
  //         res.redirect("/readers");
  //       };
  //     });
  //   };
  // });
//});

//******************** functions
function assignBook(userId, bookId){
  console.log("Assign Book to User in the db ", userId, bookId);
        var insert = "INSERT INTO user_books (user_id, book_id ) VALUES (?, ? )";
        //console.log("Insert Query: " + insert);

        connection.query(insert, [ userId, bookId ], function(err, newAssignment) {
          console.log(newAssignment);
          if (err) console.log(err);
          else {
            console.log("Book assigned to user");
            console.log("New assignment: " , newAssignment.insertId);
            return;
          };
        });
};

module.exports = router;
