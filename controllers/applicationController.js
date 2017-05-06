var bcrypt = require('bcryptjs');
var express = require('express');
var router  = express.Router();
var mysql = require('mysql')
var connection = require('../config/connection.js')


//this is the users_controller.js file
router.get('/', function(req,res) {
  res.render('index');
});

router.get('/api/kids/:valueKids', function(req,res) {
  console.log("valueKids: " + req.params.valueKids);
  // var query = "SELECT u.id AS kids_id, u.username, u.email FROM users AS u RIGHT JOIN parent_students AS ps ON u.id = ps.student_id WHERE ps.student_id = ?";
  //   connection.query(query, [ req.params.valueKids ], function(err, kids){
  //     console.log("kids: " + kids);
  //     var allKidsIds = "";
  //     if ( kids != ""){
  //       for (var k = 0; k < kids.length; k++) {
  //         if (k == 0) {allKidsIds += kids[k].kids_id;
  //         }else {allKidsIds += ", " + kids[k].kids_id;
  //         };
  //       };SELECT u.id AS kids_id, u.username, u.email FROM users AS u RIGHT JOIN parent_students AS ps ON u.id = ps.student_id WHERE ps.parent_id = ?

  //     }
      var query="SELECT ub.user_id, ub.book_id, b.title FROM user_books AS ub INNER JOIN BOOKS AS b ON ub.book_id = b.id WHERE ub.user_id = ?";
      	connection.query(query, [ req.params.valueKids ], function(err, kidbooks){
        
        	console.log(kidbooks);

        	kidbooks = JSON.stringify(kidbooks);
        	kidbooks = kidbooks.replace(/&quot;/g,"\"");
        	console.log(kidbooks);

    		res.json(kidbooks);
  		});
  	// })
});

router.get('/api/logs/:valueKids', function(req,res) {
  console.log("valueKids: " + req.params.valueKids);
  // var query = "SELECT u.id AS kids_id, u.username, u.email FROM users AS u RIGHT JOIN parent_students AS ps ON u.id = ps.student_id WHERE ps.student_id = ?";
  //   connection.query(query, [ req.params.valueKids ], function(err, kids){
  //     console.log("kids: " + kids);
  //     var allKidsIds = "";
  //     if ( kids != ""){
  //       for (var k = 0; k < kids.length; k++) {
  //         if (k == 0) {allKidsIds += kids[k].kids_id;
  //         }else {allKidsIds += ", " + kids[k].kids_id;
  //         };
  //       };SELECT u.id AS kids_id, u.username, u.email FROM users AS u RIGHT JOIN parent_students AS ps ON u.id = ps.student_id WHERE ps.parent_id = ?

  //     }
      var query="SELECT l.created, l.time_lapsed, b.title , DATE_FORMAT(l.created, '%m/%d/%Y') AS 'log_created' FROM logs l LEFT JOIN books b ON l.book_id = b.id WHERE user_id = ?";
      	connection.query(query, [ req.params.valueKids ], function(err, kidbooks){
        
        	console.log(kidbooks);

        	kidbooks = JSON.stringify(kidbooks);
        	kidbooks = kidbooks.replace(/&quot;/g,"\"");
        	console.log(kidbooks);

    		res.json(kidbooks);
  		});
  	// })
});

module.exports = router;
