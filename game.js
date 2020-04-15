
var buttonColours = ["red", "blue", "green", "yellow"];


var userClickedPattern = [];
var gamePattern = [];
var level = 0

 // random color game.
function nextSequence(){
        userClickedPattern = [];

      var randomNumber =  Math.floor(Math.random()*4);
      var randomChosenColor = buttonColours[randomNumber];
      gamePattern.push(randomChosenColor);

      $("#"+randomChosenColor).fadeOut(150).fadeIn(150);
      playsound(randomChosenColor);

      animatePress(randomChosenColor);
      level ++;
      $("#level-title").text("level "+level);
};

// user answer
$(".btn").on("click", function(event){
      var userChosenColour = event.target.id;
      userClickedPattern.push(userChosenColour);
      playsound(userChosenColour);

      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
});

// sound
function playsound(name){

  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();

};
 // animate
function animatePress(currentColour){

    $("#"+currentColour).addClass("pressed");

        setTimeout(function() {
            $("#"+currentColour).removeClass("pressed");
     },100);
};


// key to start game once.
 var started =  false;
  $(document).on("keypress", function(){
       if (started === false){
            started = true;

         nextSequence();

       }
  });



function checkAnswer(currentLevel){

      if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success!");
          if(userClickedPattern.length === gamePattern.length){

            setTimeout (function(){
              nextSequence();
            },1000);
          }
      } else {
         console.log("wrong");
         var gameover = new Audio("sounds/wrong.mp3");
         gameover.play();
         $("body").addClass("game-over");

         setTimeout(function(){
           $("body").removeClass("game-over");
         },200);

         $("h1").text("Game over, Press Any Key to Restart");
         starOver();
      }
};


// starting over
function starOver(){
  level = 0;
  gamePattern= [];
  started = false;
  
}
