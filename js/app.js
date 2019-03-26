/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
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

// This array Contain list of cards used on the game, there is 8 diffret shape each shape repeated twice
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

// GenerateCard to generate 16 shuffled card dynamic
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

startGame();

// startGame function will start the game and run shuffle,GenerateCard Function and setTimer
function startGame() {

  $(function() {
     cardlist = shuffle(cardlist);
    let result = GenerateCard(cardlist);


    $('.deck').append(result);

    // countDownTo value in milliseconds , 1000 = 1 sec , 120000 = 2min
    let countDownTo = 120000;

    // Time calculations for remaining minutes and seconds
    let minutes = Math.floor((countDownTo % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((countDownTo % (1000 * 60)) / 1000);

    //Display Time for the user
    $("#Timer").text(minutes + ":" + seconds);

    //Start Timer
    var timer = setInterval(setTimer, 1000);

    function setTimer() {

      countDownTo = countDownTo - 1000;

      // Recalculate Time for remaining minutes and seconds
      minutes = Math.floor((countDownTo % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((countDownTo % (1000 * 60)) / 1000);

      //Display Time for the user after change
      $("#Timer").text(minutes + ":" + seconds)

      // if Timer in last minute than change color of timer + make it shaking
      if (countDownTo <= 60000) {
        $(".Timer").css("background-image", "linear-gradient(45deg,#ff6749,#a5422e, #ff6749, #ba0101)");
        $(".Timer").css("animation", ".3s shake infinite alternate");
      }
      if (countDownTo <= 0) {
        $('#resultTitle').html(" Gameover " + '<i class="fa fa-frown-o" aria-hidden="true"></i>');
        clearInterval(timer);
        $('#resultBody').text("You Couldn't finish in time you made total of " + moves + " moves ");
        $('#popupModal').modal('show');
      }
    }

    // To get all cards by class name
    let cards = document.querySelectorAll(".card");
    // number of moves in the games
    let moves = 0;
    // number of showen cards, max 2 cards
    var showencards = [];

    $(".card").click(function() {
      moves++;
      $(".moves").text(moves);
      showencards.push($(this).children("i").attr("class"));

      $(this).addClass('open show');

      if (showencards.length == 2) {
        $(".deck").css("pointer-events", "none");

        if (showencards[0] == showencards[1]) {

          $(".deck").find(".open.show").addClass("match");
          $(".deck").find(".open.show").removeClass("open show");

        } else {
          setTimeout(function() {
            $(".deck").find(".open.show").removeClass("open show");
            $('.stars li').first().remove();
          }, 500);

        }
        setTimeout(function() {
          check();
          showencards = [];
          $(".deck").css("pointer-events", "auto");
        }, 500);

      }

    });


    $(".restart").click(function() {
      location.reload();
    });


    function check() {
      if ($(".match").length == 16) {

        let numberStars = "";
        let stars = $(".stars>li").find("i");
        if (stars.length >= 1) {
          for (let i = 0; i < stars.length; ++i) {
            numberStars = numberStars + stars[i].outerHTML;
          }
        } else {
          numberStars = 0;
        }

        clearInterval(timer);
        $('#resultTitle').html(" Congratulations " + '<i class="fa fa-smile-o" aria-hidden="true"></i>');
        $('#resultBody').html("You finish in " + minutes + ":" + seconds + " you made total of " + moves + " moves " + " you have " + numberStars + " stars ");
        $('#popupModal').modal('show');

      }
    }


  });

}
