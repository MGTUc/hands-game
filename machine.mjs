import { positionResponse } from "./response.mjs";

function response(position, computerturn = true, responseDict) {
    let key = position + String(computerturn);
    if (responseDict[key]) {
        let max = responseDict[key].reduce((max, child) => (child[1] > max[1] ? child : max), responseDict[key][0]);
        if (max[1] <= 0 || responseDict[key].length === 1 || max[1] === 1) {
            return max[0];
        } else{
            let sumPositiveValues = 0;
            let positivePositions = [];
            for (let child of responseDict[key]) {
                if (child[1]>0) {
                    sumPositiveValues += child[1];
                    positivePositions.push(child);
                }
            }
            let random = Math.random();
            let sum = 0;
            for (let i = 0; i < positivePositions.length; i++) {
                sum += positivePositions[i][1] / sumPositiveValues;
                if (random < sum) {
                    return positivePositions[i][0];
                }
            }
        }
        return max[0];
    } else {
        return null;
    }
}

function convertUItoAI(player1, player2, move) {
    switch(move) {
        case "RR":
            return String([Math.min(player1.right + player2.right, 5) % 5, player2.left].sort().concat([player1.right, player1.left]))
            .split(",")
            .slice(0, 4)
            .join("");
        case "RL":
            return String([Math.min(player1.right + player2.left, 5) % 5, player2.rigth].sort().concat([player1.right, player1.left]))
            .split(",")
            .slice(0, 4)
            .join("");
        case "LR":
            return String([Math.min(player1.left + player2.right, 5) % 5, player2.left].sort().concat([player1.right, player1.left]))
            .split(",")
            .slice(0, 4)
            .join("");
        case "LL":
            return String([Math.min(player1.left + player2.left, 5) % 5, player2.rigth].sort().concat([player1.right, player1.left]))
            .split(",")
            .slice(0, 4)
            .join("");
    }
    
}

function convertHandsAndResponde(player1, player2, move) {
    searchPosition = convertUItoAI(player1, player2, move);
    responsePosition = response(searchPosition, true, positionResponse);
    [p11, p12, p21, p22] = responsePosition.split("").map(Number);
    if ((p11 == player1.left || p12 == player1.right)&&(p21 == player2.left || p22 == player2.right)) {
        return [p11, p12, p21, p22];
    } else if((p11 == player1.right || p12 == player1.left)&&(p21 == player2.left || p22 == player12.right)) {
        return [p12, p11, p21, p22];
    } else if((p11 == player1.left || p12 == player1.right)&&(p21 == player2.right || p22 == player2.left)) {
        return [p11, p12, p22, p21];
    } else {
        return [p12, p11, p22, p21];
    }    
}
