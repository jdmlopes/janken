let gonAttack = "";
let pitouAttack = "";
let gonHealth = 3;
let pitouHealth = 3;
const gameScreen = document.querySelector('#game-screen');
const startScreen = document.querySelector('#start-screen');
const roundResults = document.querySelector('#round-results');
const attacks = document.querySelectorAll('.attack');




/* ----- GAME EVENTS ----- */

document.getElementById('play').addEventListener('click', (e) => {
    
    hideScreen(startScreen);
    showScreen(gameScreen);
    resetGame();
});

attacks.forEach((attack) =>{
    attack.addEventListener('click',(e) => {

        updateGameLog(playRound(e.target.id,getPitouAttack()));
        checkWinner();
    });
});




/* ----- GAME FUNCTIONS ----- */


function checkWinner(){
    if(pitouHealth  === 0){
        console.log("Gon won the fight, Neferpitou was defeated");
        resetGame();
        return;
    }else if(gonHealth  === 0){
        console.log("Neferpitou won the fight, Gon was defeated");
        resetGame();
        return;
    }
}


function resetGame(){
    gonHealth = 3;
    pitouHealth = 3;
    drawHealthBar(document.getElementById('player-health'),gonHealth);
    drawHealthBarReverse(document.getElementById('opponent-health'),pitouHealth);
    clearGameLog();

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
function playRound(playerAttack, opponentAttack){
    if(playerAttack === opponentAttack){
        return  "Tie";
    }else if(playerAttack === "rock"){

        if(opponentAttack === "scissors"){
            pitouHealth--;
            drawHealthBarReverse(document.getElementById('opponent-health'),pitouHealth);
            return "Rock beats Scissors, Gon Wins";
        }

        if(opponentAttack === "paper"){
            gonHealth--;
            drawHealthBar(document.getElementById('player-health'),gonHealth);
            return "Paper beats Rock, Pitou Wins";
        }

    }else if(playerAttack === "paper"){
        if(opponentAttack === "rock"){
            pitouHealth--;
            drawHealthBarReverse(document.getElementById('opponent-health'),pitouHealth);
            return "Paper beats Rock, Gon Wins";
        }
        
        if(opponentAttack === "scissors"){
            gonHealth--;
            drawHealthBar(document.getElementById('player-health'),gonHealth);
            return "Scissors beat Paper, Pitou Wins";
        }
    }else if(playerAttack === "scissors"){
        if(opponentAttack === "paper"){
            pitouHealth--;
            drawHealthBarReverse(document.getElementById('opponent-health'),pitouHealth);
            return "Scissors beat Paper, Gon Wins";
        }
        
        if(opponentAttack === "rock"){
            gonHealth--;
            drawHealthBar(document.getElementById('player-health'),gonHealth);
            return "Rock beats Scissors, Pitou Wins";
        }
    }
    return "Error";
}



/*  SCREEN FUNCTIONS*/

function hideScreen(screen){
    screen.style.display = 'none';
    
}

function showScreen(screen){
    screen.style.display = 'flex';
}

function drawHealthBar(healthBar,health,totalHealth = 3){
    let pencil = healthBar.getContext('2d');
    let barWidth = pencil.canvas.width / totalHealth;
    let barHeight = pencil.canvas.height;
    pencil.clearRect(0,0,pencil.canvas.width,pencil.canvas.height);
    for(i = 0; i < health; i++){
        pencil.beginPath();
        pencil.rect(i*barWidth,0,barWidth-1,barHeight);
        pencil.fillStyle = 'green';
        pencil.fill();
        pencil.closePath();
    }  
}

function drawHealthBarReverse(healthBar,health,totalHealth = 3){
    let pencil = healthBar.getContext('2d');
    let barWidth = pencil.canvas.width / totalHealth;
    let barHeight = pencil.canvas.height;
    pencil.clearRect(0,0,pencil.canvas.width,pencil.canvas.height);
    for(i = 1; i <= health; i++){
        pencil.beginPath();
        pencil.rect(pencil.canvas.width - (i*barWidth),0,barWidth-1,barHeight);
        pencil.fillStyle = 'green';
        pencil.fill();
        pencil.closePath();
    }  
}

function updateGameLog(resultText){
    let p = document.createElement('p');
    p.classList.add('round-text');
    p.textContent = resultText;
    roundResults.prepend(p);

}

function clearGameLog(){
    while(roundResults.firstChild){
        roundResults.removeChild(roundResults.firstChild);
    }
}






