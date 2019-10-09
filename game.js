var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("level" + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //Sounds
  makeSound(userChosenColour);
  console.log(userClickedPattern)
  
  animatePress(userChosenColour);
  //Check if the answer is correct
  checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
  //increase level
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour);
  makeSound(randomChosenColour);
}


function makeSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $(currentColor).addClass("pressed");
  setTimeout(() => {
    $(currentColor).removeClass("pressed");
  }, 200);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 300);
    $("#level-title").text("Game over. Start again by pushin any key");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}



