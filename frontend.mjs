import { convertHandsAndRespond } from './machine.mjs';
let selectedHand = null;
let playerturn = true;
let player2 = {L: 1, R: 1};
let player1 = {L: 1, R: 1};
function selectHand(handId) {
    if(document.getElementById(handId).innerText != 0 && playerturn) {
        if (!selectedHand) {
            if (handId.startsWith('player1')) {
                selectedHand = handId;
                document.getElementById(handId).style.backgroundColor = 'yellow';
            }
        } else {
            if (handId.startsWith('player2')) {
                
                document.getElementById(handId).style.backgroundColor = 'yellow';
                player2[handId.split('-')[1]] = Math.min(player2[handId.split('-')[1]] + player1[selectedHand.split('-')[1]],5)%5;
                document.getElementById(handId).innerText = player2[handId.split('-')[1]];
                playerturn = false;
                let [p1L,p1R,p2L,p2R] = convertHandsAndRespond(player1,player2);
                setTimeout(() => {
                    document.getElementById(handId).style.backgroundColor = 'lightgray';
                    document.getElementById(selectedHand).style.backgroundColor = 'lightgray';
                    document.getElementById("player").style.color = "black";
                    document.getElementById("computer").style.color = "blue";
                    document.getElementById("player").style.backgroundColor = "white";
                    document.getElementById("computer").style.backgroundColor = "lightgray";
                    selectedHand = null;
                }, 300);

                setTimeout(() => {
                    document.getElementById("player").style.color = "blue";
                    document.getElementById("computer").style.color = "black";
                    document.getElementById("player").style.backgroundColor = "lightgray";
                    document.getElementById("computer").style.backgroundColor = "white";
                    playerturn = true;
                    player1 = {L: p1L, R: p1R};
                    player2 = {L: p2L, R: p2R};
                    document.getElementById('player2-L').innerText = player2.L;
                    document.getElementById('player2-R').innerText = player2.R;
                    document.getElementById('player1-L').innerText = player1.L;
                    document.getElementById('player1-R').innerText = player1.R;
                }, 1300);
                // Add your game logic here to handle the interaction between selectedHand and handId
                
            } else {
                document.getElementById(selectedHand).style.backgroundColor = 'lightgray';
                selectedHand = handId;
                document.getElementById(handId).style.backgroundColor = 'yellow';
            }
        }
    }
}

function splitHands() {
    let split = false;
    if(playerturn){
        
        if((player1.L==0 && player1.R==2)||((player1.L==2 && player1.R==0))){
            split = true;
            player1.L = 1;
            player1.R = 1;
        } else if((player1.L==0 && player1.R==3)||(player1.L==3 && player1.R==0)){
            split = true;
            player1.L = 1;
            player1.R = 2;
        } else if((player1.L==0 && player1.R==4)||(player1.L==4 && player1.R==0)){
            split = true;
            let choice = confirm("Do you want to split into 2 2? Click 'OK' for 2 2 or 'Cancel' for 1 3.");
            if (choice) {
                player1.L = 2;
                player1.R = 2;
            } else {
                player1.L = 1;
                player1.R = 3;
            }
        } else if((player1.L==1 && player1.R==3)||(player1.L==3 && player1.R==1)){
            split = true;
            player1.L = 2;
            player1.R = 2;
        } else if((player1.L==1 && player1.R==4)||(player1.L==4 && player1.R==1)){
            split = true;
            player1.L = 2;
            player1.R = 3;
        } else if((player1.L==2 && player1.R==2)||(player1.L==2 && player1.R==2)){
            split = true;
            player1.L = 1;
            player1.R = 3;
        } else if((player1.L==2 && player1.R==3)||(player1.L==3 && player1.R==2)){
            split = true;
            player1.L = 1;
            player1.R = 4;
        } else if((player1.L==2 && player1.R==4)||(player1.L==4 && player1.R==2)){
            split = true;
            player1.L = 3;
            player1.R = 3;
        } else if((player1.L==3 && player1.R==3)||(player1.L==3 && player1.R==3)){
            split = true;
            player1.L = 2;
            player1.R = 4;
        }
        if(split){
            document.getElementById("player1-L").style.backgroundColor = 'yellow';
            document.getElementById("player1-R").style.backgroundColor = 'yellow';
            document.getElementById("player1-L").innerText = player1.L;
            document.getElementById("player1-R").innerText = player1.R;
            playerturn = false;
            let [p1L,p1R,p2L,p2R] = convertHandsAndRespond(player1,player2);
            setTimeout(() => {
                document.getElementById("player1-L").style.backgroundColor = 'lightgray';
                document.getElementById("player1-R").style.backgroundColor = 'lightgray';
                document.getElementById("player").style.color = "black";
                document.getElementById("player").style.backgroundColor = "white";
                document.getElementById("computer").style.backgroundColor = "lightgray";
                document.getElementById("computer").style.color = "blue";
                selectedHand = null;
            }, 300);

            setTimeout(() => {
                document.getElementById("player").style.color = "blue";
                document.getElementById("computer").style.color = "black";
                document.getElementById("player").style.backgroundColor = "lightgray";
                document.getElementById("computer").style.backgroundColor = "white";
                playerturn = true;
                player1 = {L: p1L, R: p1R};
                player2 = {L: p2L, R: p2R};
                document.getElementById('player2-L').innerText = player2.L;
                document.getElementById('player2-R').innerText = player2.R;
                document.getElementById('player1-L').innerText = player1.L;
                document.getElementById('player1-R').innerText = player1.R;
            }, 1300);
        }
    }
}

function Reset() {
    player2 = {L: 1, R: 1};
    player1 = {L: 1, R: 1};
    document.getElementById('player2-L').innerText = player2.L;
    document.getElementById('player2-R').innerText = player2.R;
    document.getElementById('player1-L').innerText = player1.L;
    document.getElementById('player1-R').innerText = player1.R;
    document.getElementById('player2-L').style.backgroundColor = 'lightgray';
    document.getElementById('player2-R').style.backgroundColor = 'lightgray';
    document.getElementById('player1-L').style.backgroundColor = 'lightgray';
    document.getElementById('player1-R').style.backgroundColor = 'lightgray';
}

export { selectHand, Reset, splitHands };