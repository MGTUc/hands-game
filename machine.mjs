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

function convertHandsAndRespond(player1, player2) {  
    if (player2.L > player2.R) {
        if (player1.L > player1.R) {
            let responsePosition = response([player2.R, player2.L, player1.R, player1.L].join(""), true, positionResponse);
            let [p11, p12, p21, p22] = responsePosition.split("").map(Number);
            if (p11 == player1.L || p12 == player1.R) {
                return [p11, p12, p22, p21];
            } else {
                return [p12, p11, p22, p21];
            }
        } else {
            let responsePosition = response([player2.R, player2.L, player1.L, player1.R].join(""), true, positionResponse);
            let [p11, p12, p21, p22] = responsePosition.split("").map(Number);
            if (p11 == player1.L || p12 == player1.R) {
                return [p11, p12, p22, p21];
            } else {
                return [p12, p11, p22, p21];
            }
        }
    } else {
        if (player1.L > player1.R) {
            let responsePosition = response([player2.L, player2.R, player1.R, player1.L].join(""), true, positionResponse);
            let [p11, p12, p21, p22] = responsePosition.split("").map(Number);
            if (p11 == player1.L || p12 == player1.R) {
                return [p11, p12, p22, p21];
            } else {
                return [p12, p11, p22, p21];
            }
        } else {
            let responsePosition = response([player2.L, player2.R, player1.L, player1.R].join(""), true, positionResponse);
            let [p11, p12, p21, p22] = responsePosition.split("").map(Number);
            if (p11 == player1.L || p12 == player1.R) {
                return [p11, p12, p21, p22];
            } else {
                return [p12, p11, p21, p22];
            }
        }
    }
}
export { convertHandsAndRespond };
// let player1 = {
//     L: 0,
//     R: 1 
// };
// let player2 = {
//     L: 2,
//     R: 1
// };
// let [P1L, P1R, P2L, P2R] = convertHandsAndRespond(player1, player2);
// console.log(P2L, P2R);
// console.log(P1L, P1R);