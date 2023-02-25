let gonAttack = "";
let pitouAttack = "";

console.log("Help Gon Defeat Pitou")

document.getElementById('play-round').addEventListener("click", function() {
    //Player Choice
    gonAttack = validatePlayerInput(prompt("Type the attack you want to perform ('rock', 'Paper', 'Scissors')"));
    //NPC choice
    pitouAttack = getPitouAttack();

    //Results
    console.log("Gon Plays: " + gonAttack);
    console.log("Pitou Plays: " + pitouAttack);
    console.log(playRound(gonAttack, pitouAttack));

});



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

function playRound(player, npc){
    if(player === npc){
        return  "Tie";
    }else if(player === "rock"){

        if(npc === "scissors"){
            return "Gon Wins";
        }

        if(npc === "paper"){
            return "Pitou Wins";
        }

    }else if(player === "paper"){
        if(npc === "rock"){
            return "Gon Wins";
        }
        
        if(npc === "scissors"){
            return "Pitou Wins";
        }
    }else if(player === "scissors"){
        if(npc === "paper"){
            return "Gon Wins";
        }
        
        if(npc === "rock"){
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






