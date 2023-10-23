var buttonColours=["green","red","yellow","blue","orange","white"]
var gamePattren=[];
var userClickedPattern = [];
var started = false;
var level = 0;
var attempt = 0;
var maxLevel = 0;

$("#btnStart").click(function(){
  if (!started) {
    nextSequence();
    started = true;
  }
})

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
    if(started){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
}});


function checkAnswer(currentLevel){
  if (gamePattren[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattren.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } 
  else {
    playSound("wrong");
    $("#level-title").text("Try again, Press Any Key to Restart");
    startOver();
    attempt++;
    if (attempt == 3 ){
      $("body").addClass("game-over");
      setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
      $("#level-title").text("Game over!, Press Any Key to Restart");
     
      startOver1();
    }
    }
}



function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattren = [];
  started = false;
  
}
function startOver1() {
  level = 0;
  gamePattren = [];
  started = false;
  attempt =0;
  maxLevel =0;
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  if(level>maxLevel){
    maxLevel=level;
    $("#maxLevel").text("Highest Level:" + maxLevel);
  }

  $("#level-title").text("level "+level);
  var randomNumber = (Math.floor(Math.random()*6));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattren.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);  
}