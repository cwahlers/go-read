var $kidsbookinput = $('input[name=kid_book]')
	console.log($kidsbookinput);
	// console.log(kidbooks);
var $kidbooksubmit = $('.create-update-form input[type=submit]');

$kidbooksubmit.on('click', function(event){
	event.preventDefault();
	var newbook = $kidsbookinput.val();
	console.log(newbook);

})
console.log("here")



function selectKidBooks() {
	var valueKids = document.getElementById("selectKids").value;
	console.log(valueKids);
	// var queryURL = "/api/kids/" + valueKids;
	// $.ajax({
 //    url: queryURL,
 //    method: "GET"
 //  }).then(function(res) 
	$.get("/api/kids/" + valueKids)
	.then(function(res) {
		console.log("====================")
		// console.log(res);
var newTable = "";
		$("#kids-books").empty();
		
			console.log(typeof res)
			var selectedBookbyKid = JSON.parse(res);
		selectedBookbyKid.forEach(function(item, index) {
			console.log(item);
		newTable += '<tr class="selectkid">';
		newTable += '<td>' + item.user_id + '</td>';
		newTable += '<td>' + item.title + '</td>';
		// newTable += '<td>' + item.current_page + '</td>'  <--causing error
		newTable += '</tr>';
		})
	$("#kids-books").append(newTable);
	})

	$.get("/api/logs/" + valueKids)
	.then(function(res) {
		console.log("====================")
		// console.log(res);
var newLogs = "";
		$("#kids-logs").empty();
		
			console.log(typeof res)
			var selectedBookbyKid = JSON.parse(res);
		selectedBookbyKid.forEach(function(item, index) {
			console.log(item);
		newLogs += '<tr class="selectkid">';
		newLogs += '<td>' + item.log_created + '</td>';
		newLogs += '<td>' + item.title + '</td>';
		newLogs += '<td>' + item.time_lapsed + '</td>'  
		newLogs += '</tr>';
		})
	$("#kids-logs").append(newLogs);
	})
}
// [{"user_id":2,"book_id":8,"title":"Captain Underpants and the Big, Bad Battle of the Bionic Booger Boy"},
// {"user_id":2,"book_id":12,"title":"Wayne Gretzky"}]

// Object {created: "2017-01-12T05:00:00.000Z", time_lapsed: 1.2, title: "My Life as a Gamer", log_created: "01/12/2017"}