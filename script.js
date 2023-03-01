let gonAttack = "";
let pitouAttack = "";
let gonHealth = 3;
let pitouHealth = 3;
const gameScreen = document.querySelector('#game-screen');
const startScreen = document.querySelector('#start-screen');





/* ----- GAME LOOP ----- */

document.getElementById('play').addEventListener("click", () => {
    
    hideScreen(startScreen);
    showScreen(gameScreen);
    /* console.clear();

    console.log("Help Gon Defeat Pitou");
    console.log("Gon Health: " + gonHealth);
    console.log("Pitou Health: " + pitouHealth);

    let gameOver = false;
    while(!gameOver){
        //Player Choice
        gonAttack = validatePlayerInput(prompt("Type the attack you want to perform ('rock', 'Paper', 'Scissors')"));
        //NPC choice
        pitouAttack = getPitouAttack();

        //Results
        console.log("----------------------------------------------");
        console.log("Gon Plays: " + gonAttack);
        console.log("Pitou Plays: " + pitouAttack);
        console.log(playRound(gonAttack, pitouAttack));
        console.log("Gon Health: " + gonHealth);
        console.log("Pitou Health: " + pitouHealth);
        console.log("----------------------------------------------");

        gameOver = checkWinner();
    } */
    
});


/* ----- GAME FUNCTIONS ----- */


function checkWinner(){
    if(pitouHealth  === 0){
        console.log("Gon won the fight, Neferpitou was defeated");
        resetGame();
        return true;
    }else if(gonHealth  === 0){
        console.log("Neferpitou won the fight, Gon was defeated");
        resetGame();
        return true;
    }
    return false;
}


function resetGame(){
    gonHealth = 3;
    pitouHealth = 3;
}

function getPitouAttack(){
    let randomAttack = Math.floor(Math.random() * 3) + 1;
    if(randomAttack === 1){
        return "rock"
    }else if(randomAttack === 2){
        return "paper"
    }else if(randomAttack === 3){
        return "scissors"
    }
    return "error";
}

//Calculate the result of the round, decreases the health of the looser by 1 and returns a string with the result
function playRound(player, npc){
    if(player === npc){
        return  "Tie";
    }else if(player === "rock"){

        if(npc === "scissors"){
            pitouHealth--;
            return "Gon Wins";
        }

        if(npc === "paper"){
            gonHealth--;
            return "Pitou Wins";
        }

    }else if(player === "paper"){
        if(npc === "rock"){
            pitouHealth--;
            return "Gon Wins";
        }
        
        if(npc === "scissors"){
            gonHealth--;
            return "Pitou Wins";
        }
    }else if(player === "scissors"){
        if(npc === "paper"){
            pitouHealth--;
            return "Gon Wins";
        }
        
        if(npc === "rock"){
            gonHealth--;
            return "Pitou Wins";
        }
    }
    return "Error";
}

function validatePlayerInput(input){
    if(typeof input === 'string'){
        return input.trim().toLowerCase();
    }

    return "Error"
}


/*  SCREEN FUNCTIONS*/

function hideScreen(screen){
    screen.style.display = 'none';
    
}

function showScreen(screen){
    screen.style.display = 'flex';
}





