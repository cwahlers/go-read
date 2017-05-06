var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql')
var connection = require('../config/connection.js')

//this is the parents_controller.js file
router.get('/', function(req,res) {
  // console.log("Parents");
  query = "SELECT u.id AS kids_id, u.username, u.email FROM users AS u RIGHT JOIN parent_students AS ps ON u.id = ps.student_id WHERE ps.parent_id = ?";
    connection.query(query, [ req.session.user_id ], function(err, kids){
      console.log(kids);
      var allKidsIds = "";
      if ( kids != ""){
        for (var k = 0; k < kids.length; k++) {
          if (k == 0) {allKidsIds += kids[k].kids_id;
          }else {allKidsIds += ", " + kids[k].kids_id;
          };
        };
      }
      console.log(allKidsIds)
      query="SELECT ub.user_id, ub.book_id, b.title FROM user_books AS ub INNER JOIN BOOKS AS b ON ub.book_id = b.id WHERE ub.user_id = ?";
      connection.query(query, [ allKidsIds ], function(err, kidbooks){
        
        console.log(kidbooks);

        // kidbooks = JSON.stringify(kidbooks);
        // kidbooks = kidbooks.replace(/&quot;/g,"\"");
        console.log(kidbooks);
        console.log(kids)

        res.render('parents/parents', { 
          kids: kids,
          kidbooks: kidbooks,
          logged_in: req.session.logged_in,
          user_email: req.session.user_email,
          user_id: req.session.user_id,
          usertype: req.session.usertype,
          is_reader: req.session.is_reader,
          is_parent: req.session.is_parent
        });
      });




      // res.send( { 
      //   kids: kids,
      //   logged_in: req.session.logged_in,
      //   user_email: req.session.user_email,
      //   user_id: req.session.user_id,
      //   usertype: req.session.usertype,
      //   is_reader: req.session.is_reader,
      //   is_parent: req.session.is_parent
      // })
      
    });

});

// ==================================================================================


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

  // res.render('parents/kids', req.session);
});



// ===============================================================================

module.exports = router;
