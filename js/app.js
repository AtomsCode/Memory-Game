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


function startGame(cardslist)
{

  var cardslist = [
   'fa fa-diamond','fa fa-diamond',
   'fa fa-cube','fa fa-cube',
   'fa fa-paper-plane-o','fa fa-paper-plane-o',
   'fa fa-bicycle','fa fa-bicycle',
   'fa fa-bolt','fa fa-bolt',
   'fa fa-bomb','fa fa-bomb',
   'fa fa-leaf','fa fa-leaf',
   'fa fa-anchor','fa fa-anchor',
  ];

// using shuffle function to shuffle all cards
cardslist = shuffle(cardslist);

let deck = document.querySelector(".deck");
cardslist.forEach(function(card)
{
   onecardset='<li class="card"><i class="'+ card +'"></i></li>';
   deck.insertAdjacentHTML('afterbegin', onecardset);
});

}
startGame();

// Select All cards and Add EventListener to theme so when action onclick, card will show up
let cards = document.querySelectorAll(".card");
let moves = 0;
var showencards = [];


$( document ).ready(function() {
  $( ".card" ).click(function() {
    moves++;
    $(".moves").text(moves);
    showencards.push( $(this).children("i").attr("class") );

  $(this).addClass('open show');

    if(showencards.length==2)
    {
      $(".deck").css("pointer-events", "none");
  //do something


        if(showencards[0] == showencards[1])
        {
          // alert("==");
          $(".deck").find(".open.show").addClass("match");
          $(".deck").find(".open.show").removeClass("open show");

        }
        else
        {
          // alert("!!");
           setTimeout(function(){
            $(".deck").find(".open.show").removeClass("open show");
             $('.stars li').first().remove(); }, 1000);

        }
        setTimeout(function()
        {
            check();
            showencards = [];
            $(".deck").css("pointer-events", "auto");
         }, 1000);



    }

    // alert( "Handler for .click() called."+     $(this).children("i").attr("class") );
  });


  $( ".restart" ).click(function() {
     location.reload();
  });


  function check()
  {


  if($(".match").length == cards.length ){alert("Good Job You did it!");}
  }


});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
