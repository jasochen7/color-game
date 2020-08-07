//Declare variables we'll need
var numTiles = 6; 
var colors = [];
var correctColor;
var h1 = document.querySelector("h1");
var tiles = document.querySelectorAll(".tile");
var resetButton = document.querySelector("#reset");
var colorDisplay = document.querySelector("#colorDisplay");
var feedbackDisplay = document.querySelector("#feedback");
var diffButtons = document.querySelectorAll(".difficulty")
var modeButtons = document.querySelectorAll(".mode");
init(); 

//Defining a function to run when page is loaded
function init(){
    diffButtons[1].classList.add("selected");
    modeButtons[1].classList.add("selected");
    //Add functionality to the difficulty buttons
    makeDiffButtons(); 
    makeTiles(); 

    //Add a listener to the play again button
    resetButton.addEventListener("click", reset);
    reset(); 
}

//Defining a function to add functionality to difficulty buttons
function makeDiffButtons(){
    for (var x = 0; x < diffButtons.length; x++){
        diffButtons[x].addEventListener("click", function(){
            diffButtons[0].classList.remove("selected")
            diffButtons[1].classList.remove("selected")
            this.classList.add("selected")
            if (this.textContent === "Easy") {
                numTiles = 3; 
            }
            else {
                numTiles = 6; 
            }
            reset(); 
        })
    }
}
//Defining a function to create a list of colors
function generateColors(num) {
    var arr = []
    for (var x = 0; x < num; x++){
        arr.push(randomColor());
    }
    return arr;
}

//Defining a function that generates a random color
function randomColor() {
    var red =  Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256)
    var blue = Math.floor(Math.random() * 256);
    return("rgb(" + red + ", " + green + ", " + blue + ")");
}

//Define a function that will select a winning color out of the array of colors
function resetColor(){
    var rand = Math.floor(Math.random() * colors.length); 
    return colors[rand];
}

//Defining a function that will reset the game whenever needed
function reset() {
    colors = generateColors(numTiles);
    correctColor = resetColor();
    colorDisplay.textContent = correctColor; 
    for (var x = 0; x < tiles.length; x++) {
        if (colors[x]){
            tiles[x].style.display = "block";
            tiles[x].style.backgroundColor = colors[x];
        }
        else {
            tiles[x].style.display = "none"
        }
        
    }
    resetButton.textContent = "New Colors"
    h1.style.background = "steelblue"; 
    feedbackDisplay.textContent = ""; 
}

//Define a function that will add listeners to every color tile
function makeTiles(){
    for (var x = 0; x < tiles.length; x++) {
        tiles[x].style.backgroundColor = colors[x];
        tiles[x].addEventListener("click", function(){
            var tileColor = this.style.backgroundColor;
            if (tileColor === correctColor){
                feedbackDisplay.textContent = "Correct!"
                changeAllColors(correctColor);
                h1.style.backgroundColor = correctColor; 
                resetButton.textContent = "Play again?"
            }
            else {
                this.style.backgroundColor = "#474747"; 
                feedbackDisplay.textContent = "Try Again"
            }
        });
    }
}

//Define a function that changes the colors of every tile when the correct color is picked
function changeAllColors(color) {
    for (var x = 0; x < tiles.length; x++){
        tiles[x].style.backgroundColor = color; 
    }
}