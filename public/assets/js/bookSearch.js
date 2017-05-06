
function search(event) {
  event.preventDefault();
  // Search Google Book API
  var title = $(".title").val();   
  var queryUrl = `https://www.googleapis.com/books/v1/volumes?q=${title}`;
  fetch(queryUrl)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }
      // Examine the text in the response  
      response.json().then(function(data) {  
        $(".results").empty();
        for (var i = 0; i < data.items.length; i++) {
          var item = data.items[i];
          var url = `readers/addbook?id=${item.id}`
          var tmp = "<tr>";
              // tmp += "<td><a class='add-book' href=" + url + ">Add</a></td>";
              tmp += "<td class='add-book' data-id=" + item.id + ">Add</td>";
              tmp += "<td>" + item.volumeInfo.industryIdentifiers[0].identifier + "</td>";
              tmp += "<td>" + item.volumeInfo.title       + "</td>";
              tmp += "<td>" + item.volumeInfo.authors[0]  + "</td>";
              tmp += "<td>" + item.volumeInfo.pageCount   + "</td>";
              tmp += "<td>" + item.volumeInfo.publishedDate + "</td>";
            tmp += "</tr>";
          $(".results").append(tmp);
      }

      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });
}


function addBook() {
//  Add book to the database
  var itemId = $(this).attr("data-id");
  var userId = $("tbody").attr("data-userid");
  //console.log("User id: ", userId);
  //console.log(itemId);
  modal.style.display = "none";
  var queryUrl = `https://www.googleapis.com/books/v1/volumes/${itemId}`;
  fetch(queryUrl)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }
      // Examine the text in the response  
      response.json().then(function(item){
        var url = `readers/addbook?id=${itemId}`;
        var book = {
          user_id: userId,
          id: item.id,
          isbn: item.volumeInfo.industryIdentifiers[0].identifier,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors[0],
          pages: item.volumeInfo.pageCount,
          publishedDate: item.volumeInfo.publishedDate,
        }
        fetch( url , 
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(book)        
                });
      })
  })
}


//  When the search button gets clicked, run the search function.
$(".search").on("click", search);
//$("form").on("submit", function(event){event.preventDefault()});

$(document).on("click", ".add-book", addBook);

