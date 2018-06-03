//Create a list that holds all of your cards
const icons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", 
                "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
                "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];
var p = document.getElementsByTagName('p')[0];
    seconds = 0, minutes = 0;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 //init the game
 
function init() {
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);
    
        // Add Click Event
        click(card);
    }
}

//Click Card
function click(card) {
    card.addEventListener("click", function() {
        const currentCard = this;
        const previousCard = openedCards[0];
        
        if(openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);
             //Start Timer
            time();

            //Compare Between Opened Cards
            compare(currentCard, previousCard);
        } else {
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
       }
        
    });
}


//Compare Cards
function compare(currentCard, previousCard) {

    
    if(currentCard.innerHTML === previousCard.innerHTML) {
            
        currentCard.classList.add("match");
        previousCard.classList.add("match");
        matchedCards.push(currentCard, previousCard);
        openedCards = [];
        // Check If The Game Is Over!
        isOver();

    } else {
        
        // Cards Wait 400ms 
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
        }, 400);
        openedCards = [];
    }

    // Add New Move
    addMove();
}

//If Game Over
function isOver() {
    if(matchedCards.length === icons.length) {
        alert("Game Finished :)");

    }
}
//Adding Moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set Rating
    rating();
}

//Rating Func
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {

    if( moves < 10) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 15) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}

//Restart Button
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    // Delete ALL cards
    cardsContainer.innerHTML = "";

    init();

    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = star + star + star;
});
// Initiates the timer as soon as the game is loaded
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    p.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" 
    + (seconds > 9 ? seconds : "0" + seconds);

    time();
}
function time() {
    t = setTimeout(add, 1000);
}
init();