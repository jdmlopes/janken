let playerAttack = "";
let npcAttack = "";
let playerHealth = 5;
let npcHealth = 5;

const gameScreen = document.querySelector('#game-screen');
const startScreen = document.querySelector('#start-screen');
const gameLog = document.querySelector('#game-log');
const gameOverScreen = document.querySelector('#game-over-screen');
const playButtons = document.querySelectorAll('.play');
const attacks = document.querySelectorAll('.attack');




/* ----- GAME EVENTS ----- */
playButtons.forEach((button) =>{
    button.addEventListener('click', (e) => {
        hideScreen(startScreen);
        hideScreen(gameOverScreen);
        showScreen(gameScreen);
        resetGame();
    });
});


attacks.forEach((attack) =>{
    attack.addEventListener('click',(e) => {

        updateGameLog(playRound(e.target.id,getNpcAttack()));
        checkWinner();
    });
});




/* ----- GAME FUNCTIONS ----- */


function checkWinner(){
    if(npcHealth  === 0){
        showWinner('player')
        return;
    }else if(playerHealth  === 0){
        showWinner('npc')
        return;
    }
}


function resetGame(){
    playerHealth = 5;
    npcHealth = 5;
    drawHealthBar(document.getElementById('player-health'),playerHealth);
    drawHealthBarReverse(document.getElementById('opponent-health'),npcHealth);
    clearGameLog();
}


function getNpcAttack(){
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
            npcHealth--;
            drawHealthBarReverse(document.getElementById('opponent-health'),npcHealth);
            return "Rock beats Scissors, Gon Wins";
        }

        if(opponentAttack === "paper"){
            playerHealth--;
            drawHealthBar(document.getElementById('player-health'),playerHealth);
            return "Paper beats Rock, Opponent Wins";
        }

    }else if(playerAttack === "paper"){
        if(opponentAttack === "rock"){
            npcHealth--;
            drawHealthBarReverse(document.getElementById('opponent-health'),npcHealth);
            return "Paper beats Rock, Gon Wins";
        }
        
        if(opponentAttack === "scissors"){
            playerHealth--;
            drawHealthBar(document.getElementById('player-health'),playerHealth);
            return "Scissors beat Paper, Opponent Wins";
        }
    }else if(playerAttack === "scissors"){
        if(opponentAttack === "paper"){
            npcHealth--;
            drawHealthBarReverse(document.getElementById('opponent-health'),npcHealth);
            return "Scissors beat Paper, Gon Wins";
        }
        
        if(opponentAttack === "rock"){
            playerHealth--;
            drawHealthBar(document.getElementById('player-health'),playerHealth);
            return "Rock beats Scissors, Opponent Wins";
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

function drawHealthBar(healthBar,health,totalHealth = 5){
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

function drawHealthBarReverse(healthBar,health,totalHealth = 5){
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
    gameLog.prepend(p);

}

function clearGameLog(){
    while(gameLog.firstChild){
        gameLog.removeChild(gameLog.firstChild);
    }
}

function showWinner(winner){
    hideScreen(gameScreen);
    showScreen(gameOverScreen);
    if(winner === 'player'){
        document.getElementById('winner-title').textContent = "YOU WIN, CONGRATULATIONS!!!!";
        document.getElementById('winner-image').src = "./images/gon_victory.jpg";
        document.getElementById('winner-text').textContent = "You won the fight, you are a true master of nen.";
    }else if(winner === 'npc'){
        document.getElementById('winner-title').textContent = "YOU LOSE!";
        document.getElementById('winner-image').src = "./images/pitou_victory.jpg";
        document.getElementById('winner-text').textContent = "You lost the fight and died, but you can always ressurrect and try again.";

    }

}





