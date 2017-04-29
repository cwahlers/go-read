var goal = 0;
var remaining = 0;
var number = 0;
var counter;
var min = 0;
var sec = 0;
//var $totalTime = $('input[name="totalTime"]');


// $(".display-time").html("<h2>" + time + "</h2>");

function run() {
  if (goal == ""){
    goal = $(".time-goal").val();
    remaining = goal;
  }
  $(".goal").html("<h2>Goal: " + goal + " Minutes</h2>");
  $(".display-time").html("<h2>Remaining: " + remaining + " Minutes</h2>");
  counter = setInterval(increment, 100);
}

function increment() {
  //  Increase number by one.
  number++;
  //  Show the number in the #show-number tag.
  if (number == 60) {
    number = 0;
    min++;
    //Min is the number of minutes actually read
    //$totalTime.val(min);
    $(".total-time").val(min);
    //$(".total-time").html("<h2>Total: " + min + " Minutes</h2>");
    remaining--;
    if (remaining < 0) {
      var extra = min - goal;
      $(".display-time").html("<h2>Extra: " + extra + " Minutes</h2>");
    }else if (remaining == 1) {
      $(".display-time").html("<h2>Remaining: " + remaining + " Minute</h2>");
    }else{
      $(".display-time").html("<h2>Remaining: " + remaining + " Minutes</h2>");
    }
  }
  // min = (number/1000/60) << 0,
  // sec = (number/1000) % 60;
  //sec = number *100 / 60; 
  // $(".display-time").html("<h2>" + time + "</h2>");
}

function stop() {
  //  Clear "counter" interval.
  clearInterval(counter);
  //Call route /readers/post the data to the db

}

function pause() {
  //  Clear "counter" interval.
  clearInterval(counter);
  $(".display-time").html("<h2>Remaining: " + remaining + " Minutes</h2>");
}


//  When the start button gets clicked, run the run function.
$(".start").on("click", run);

//  When the stop button gets clicked, run the stop function.
$(".stop").on("click", stop);

//  When the resume button gets clicked, execute the run function.
$(".pause").on("click", pause);