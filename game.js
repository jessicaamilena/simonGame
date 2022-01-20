var btnColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var firstPress = true;

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour)
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
}); 

function nextSequence(){

    userClickedPattern = [];
    $("#level-title").text("Level " + (level++));

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = btnColours[randomNumber];    
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);  
}   

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

document.addEventListener("keydown", function(){
    if(firstPress){
        $("#level-title").text("Level " + (level++));
        nextSequence();
        firstPress = false;
    }
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }else{
        $("body").addClass("game-over")
        playSound("wrong")
        $("#level-title").text("Game over! Press any key to restart.");
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        starOver();
    }
}

function starOver(){
    level = 0;
    gamePattern = [];
    firstPress = true;
}