const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

let missHits=0;



function round() {


  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");
  $(".game-field").empty();

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(+hits+1);

  if(!hits) firstHitTime=getTimestamp();

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".game-field-wrapper").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-points").text(hits);
  $("#total-miss-points").text(missHits);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {

  if ($(event.target).hasClass("target")) {
      hits++;
      round();
  } else {
      $(event.target).addClass("miss");
      missHits++;
  }

}


function init() {

  $("#button-start-game").click(function(){
    round();
    $(this).addClass("d-none");
    $("#button-reload").removeClass("d-none");

    $(".game-field").click(handleClick);

  });
  


  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
