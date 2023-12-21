var gameStarted = false;
var gameInProgress = false;
var userInput = [];
var order = [];
var result = false;
var level = 1;
var index = 0;
var colors = ["green", "red", "yellow", "blue"]


document.addEventListener("keypress", function (event){
    if(gameStarted == false && event.key == 'a'){
        gameStarted = true;
        startGame();
    }
    else if(gameInProgress == false && gameStarted == true){
        startGame();
    }
})

$(".btn").click(function (){
    if(gameInProgress == true){
        var color = this.id;
        
        playAudio(color);
        playAnimation(color);
        userInput.push(color);

        if(userInput[index] == order[index]) index++;
        else if(userInput[index] != order[index]) endGame();

        if(index == order.length){
            setTimeout(function (){
                generateNext();
            }, 750);
        }
    }
});

function generateNext(){
    userInput = [];
    index = 0;

    document.querySelector("h1").textContent = "Level " + level;
    var nextNumber = Math.floor(Math.random()*4);
    var color = colors[nextNumber];
    order.push(color);

    showUser(color);
    level++;

}

function endGame(){
    gameInProgress = false;
    document.querySelector("h1").textContent = "Game Over, Press Any Key to Restart";
    document.body.style.backgroundColor = "black";

    playAudio("wrong");
}

function showUser(color){
    playAudio(color);
    playAnimation(color);
}

function playAnimation(color){
    $("#"+color).addClass("pressed");
    setTimeout(function (){$("#"+color).removeClass("pressed");},100);
}

function playAudio(fileName){
    var audioFile = "./sounds/" + fileName+ ".mp3";
    var audio = new Audio(audioFile);
    audio.play();
}


function startGame(){
    gameInProgress = true;
    document.body.style.backgroundColor = "#011F3F";
    level = 1;
    result = true;
    order = [];
    userInput = [];

    setTimeout(function (){
        generateNext();
    }, 750);
}