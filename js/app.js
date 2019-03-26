/*
 * Create a divst that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the divst of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// This array Contain divst of cards used on the game, there is 8 diffret shape each shape repeated twice
let cardlist = [
  'fa fa-diamond', 'fa fa-diamond',
  'fa fa-cube', 'fa fa-cube',
  'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
  'fa fa-bicycle', 'fa fa-bicycle',
  'fa fa-bolt', 'fa fa-bolt',
  'fa fa-bomb', 'fa fa-bomb',
  'fa fa-leaf', 'fa fa-leaf',
  'fa fa-anchor', 'fa fa-anchor',
];


function GenerateCard(cards) {


  let result = null;
  result = '<div class="row">';
  result = result + '<div><div class="card">  <i class="' + cards[0] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[1] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[2] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[3] + '"></i>  </div>   </div>';
  result = result + '</div>';
  result = result + '<div class="row">';
  result = result + '<div><div class="card">  <i class="' + cards[4] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[5] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[6] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[7] + '"></i>  </div>   </div>';
  result = result + '</div>';
  result = result + '<div class="row">';

  result = result + '<div><div class="card">  <i class="' + cards[8] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[9] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[10] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[11] + '"></i>  </div>   </div>';
  result = result + '</div>';
  result = result + '<div class="row">';
  result = result + '<div><div class="card">  <i class="' + cards[12] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[13] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[14] + '"></i>  </div>   </div>';
  result = result + '<div><div class="card">  <i class="' + cards[15] + '"></i>  </div>   </div>';
  result = result + '</div>';

  return result;
}

// startGame function will generate the cards in the deck  also shuffle the card and works as Refresh
function startGame() {

  $(function() {

    let result = GenerateCard(cardlist);

    $('.deck').children().remove();
    $('.deck').append(result);

    // countDownTo value in milliseconds , 1000 = 1 sec
    let countDownTo = 120000;

    // Time calculations for remaining minutes and seconds
    let minutes = Math.floor((countDownTo % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((countDownTo % (1000 * 60)) / 1000);

    //Display Time for the user
    $("#Timer").text(minutes + ":" + seconds);

    //Start Timer
    var timer = setInterval(setTimer, 1000);

    function setTimer()
    {

      countDownTo = countDownTo - 1000;

      // Re calculate Time for remaining minutes and seconds
      minutes = Math.floor((countDownTo % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((countDownTo % (1000 * 60)) / 1000);

      $("#Timer").text(minutes + ":" + seconds)
      if (countDownTo == 0)
        clearInterval(timer);
    }



  });


}
startGame();


// To get all cards class
let cards = document.querySelectorAll(".card");
// number of moves in the games
let moves = 0;
// number of showen cards, max 2 cards
var showencards = [];

$(document).ready(function() {
  $(".card").click(function() {
    moves++;
    $(".moves").text(moves);
    showencards.push($(this).children("i").attr("class"));

    $(this).addClass('open show');

    if (showencards.length == 2) {
      $(".deck").css("pointer-events", "none");

      if (showencards[0] == showencards[1]) {
        // alert("==");
        $(".deck").find(".open.show").addClass("match");
        $(".deck").find(".open.show").removeClass("open show");

      } else {

        setTimeout(function() {
          $(".deck").find(".open.show").removeClass("open show");
          $('.stars li').first().remove();
        }, 1000);

      }
      setTimeout(function() {
        check();
        showencards = [];
        $(".deck").css("pointer-events", "auto");
      }, 1000);



    }

    // alert( "Handler for .cdivck() called."+     $(this).children("i").attr("class") );
  });


  $(".restart").cdivck(function() {
    location.reload();
  });


  function check() {
    if ($(".match").length == 16) {
      alert("Good Job You did it!");clearInterval(timer);
    }
  }



});
