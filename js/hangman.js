"use strict";
let words = ["COMMITTEE", "CIVILIZED", "COMMUNITY", "GRAPEFRUIT", "GRIFFIN", "ORANGUTAN", "TECHNIQUE", "UNCHARTED", "ELIMINATE", "LAMBORGHINI"];
let score = 0;
let ranks = [];
let word;
let displayed;
let guesses = 0;

//TODO Display the letters within the word when guessed correctly
// Clear previous buttons if game resets

//random number generator from min to max exclusive
function randomGen(min, max){
    return Math.floor(Math.random() * max - min) + min;
}

//Generates all buttons dynamically
function Button(letter){
    this.button = document.createElement("BUTTON")
    this.button.innerHTML = letter
    this.button.onclick = checkIn(letter, word, this.button)
    this.button.className = "button"
    document.body.appendChild(this.button)
}

function alphaButton(){
    for(let i = 0; i < 26; i++){
        let letter = String.fromCharCode(65 + i);
        new Button(letter);
    }
}

//checks if letter is inside word, increases score if it is, disables button TODO
function checkIn(letter, myword, btn){
    return function (){
        let check = false;
        for(let i = 0; i < myword.length; i++){
            if(letter === myword.charAt(i)){
                score++;
                document.getElementById("score").innerHTML = "SCORE: " + score;
                check = true;
            }
        }
        if(check){
            alert("Correct!"); //Testing only
            //document.getElementById("image").src = "img/nice.jpg";
            //document.getElementById("image").style.display = "inline-block";
        } else {
            score--;
            guesses += 1;
            document.getElementById("guesses").innerHTML = "LIVES: " + (7 - guesses);
            document.getElementById("score").innerHTML = "SCORE: " + score;
            alert("Wrong"); //Testing only
            //document.getElementById("image").src = "img/wrong.jpg";
            //document.getElementById("image").style.display = "inline-block";
        }
        btn.style.display = "none";
        displayWord(displayed);
        if(guesses == 7){
            alert("YOU LOSE!! HAHA");
            initialize();
        }
    }
}

//Generates a new word
function newWord(){
    let myword = words[randomGen(0, 10)];
    return myword;
}

// displays word with spaces between each letter
function displayWord(myword){
    let display = "";
    for(let i = 0; i < myword.length; i++){
        if(i != myword.length - 1){
            display += myword.charAt(i) + " ";
        } else {
            display += myword.charAt(i);
        }
    }
    document.getElementById("display").innerHTML = display;
}

// Converts each letter in word to an _
function hideWord(myword){
    let hide = "";
    for(let i = 0; i < myword.length; i++){
        hide += "_";
    }
    return hide;
}

//initialize game
function initialize(){
    word = newWord();
    displayed = hideWord(word);
    displayWord(displayed);
    document.getElementById("buttons").innerHTML = "";
    document.getElementById("guesses").innerHTML = "LIVES: 7";
    document.getElementById("score").innerHTML = "SCORE: 0";
    alphaButton();
    score = 0;
    guesses = 0;
}

//TODO Check if word is complete! (possibly check if each character is now a character)
//TODO Display letters when user guesses correctly
//TODO ANIMATIONS AND CSS MAKE THIS S*** NICE?

document.body.onload = initialize;
