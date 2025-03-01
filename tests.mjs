import { DirectedGraph, Vertex } from "./DirectedGraph.mjs";
import fs from "fs";

function generateChildren(vertex) {
    let children = [];
    let positions = new Set();
    let [a1, a2, a3, a4] = vertex.position.toString().split("").map(Number);
    if (a3 != 0 && a1 != 0) {
        positions.add(
            String([Math.min(a3 + a1, 5) % 5, a4].sort().concat([a1, a2]))
                .split(",")
                .slice(0, 4)
                .join("")
        );
    }
    if (a3 != 0 && a2 != 0) {
        positions.add(
            String([Math.min(a3 + a2, 5) % 5, a4].sort().concat([a1, a2]))
                .split(",")
                .slice(0, 4)
                .join("")
        );
    }
    if (a4 != 0 && a1 != 0) {
        positions.add(
            String([Math.min(a4 + a1, 5) % 5, a3].sort().concat([a1, a2]))
                .split(",")
                .slice(0, 4)
                .join("")
        );
    }
    if (a4 != 0 && a2 != 0) {
        positions.add(
            String([Math.min(a4 + a2, 5) % 5, a3].sort().concat([a1, a2]))
                .split(",")
                .slice(0, 4)
                .join("")
        );
    }
    if (a1 == 0 && a2 == 2) {
        positions.add(String(a3) + String(a4) + String(1) + String(1));
    }
    if (a1 == 0 && a2 == 3) {
        positions.add(String(a3) + String(a4) + String(1) + String(2));
    }
    if (a1 == 0 && a2 == 4) {
        positions.add(String(a3) + String(a4) + String(2) + String(2));
        positions.add(String(a3) + String(a4) + String(1) + String(3));
    }
    if (a1 == 1 && a2 == 3) {
        positions.add(String(a3) + String(a4) + String(2) + String(2));
    }
    if (a1 == 1 && a2 == 4) {
        positions.add(String(a3) + String(a4) + String(2) + String(3));
    }
    if (a1 == 2 && a2 == 2) {
        positions.add(String(a3) + String(a4) + String(1) + String(3));
    }
    if (a1 == 2 && a2 == 3) {
        positions.add(String(a3) + String(a4) + String(1) + String(4));
    }
    if (a1 == 2 && a2 == 4) {
        positions.add(String(a3) + String(a4) + String(3) + String(3));
    }
    if (a1 == 3 && a2 == 3) {
        positions.add(String(a3) + String(a4) + String(2) + String(4));
    }
    for (let position of positions) {
        let value;
        let computerturn = !vertex.computerturn;
        if (position.startsWith("00")) {
            if (computerturn) {
                value = -1;
            } else {
                value = 1;
            }
        } else {
            value = 0;
        }
        let child = new Vertex(position, value, computerturn);
        vertex.children.push(child);
        children.push(child);
    }
    return children;
}

function generateGraph() {
    let startingVertex = new Vertex(1111, 0, false);
    let graph = new DirectedGraph(startingVertex);
    let reachedAllPositions = false;
    let frontier = [graph.getRoot()];
    while (!reachedAllPositions) {
        let newFrontier = [];
        for (let vertex of frontier) {
            let children = generateChildren(vertex);
            for (let child of children) {
                if (
                    !graph.vertices[child.position + String(child.computerturn)]
                ) {
                    graph.addVertex(child);
                    if (child.value === 0) {
                        newFrontier.push(child);
                    }
                }
            }
        }
        frontier = newFrontier;
        reachedAllPositions = frontier.length === 0;
    }
    return graph;
}

function calculateValue(graph) {
    let changed = 1;
    let count = 0;
    while (changed != 0) {
        changed = 0;
        count = 0;
        for (let vertex of Object.values(graph.vertices)) {
            count++;
            if (vertex.computerturn) {
                let max = -1;
                for (let child of vertex.children) {
                    max = Math.max(
                        max,
                        graph.vertices[
                            child.position + String(child.computerturn)
                        ].value
                    );
                }

                if (max != vertex.value) {
                    changed += Math.abs(max - vertex.value);
                    vertex.value = max;
                }
            } else {
                let min = 1;
                let winningComputer = 0;
                for (let child of vertex.children) {
                    min = Math.min(
                        min,
                        graph.vertices[
                            child.position + String(child.computerturn)
                        ].value
                    );
                    if (child.value > 0) {
                        winningComputer +=
                            graph.vertices[
                                child.position + String(child.computerturn)
                            ].value;
                    }
                }
                if (min >= 0 && vertex.children.length > 0) {
                    min = winningComputer / vertex.children.length;
                }
                if (min != vertex.value) {
                    changed += Math.abs(min - vertex.value);
                    vertex.value = min;
                }
            }
        }
        console.log(changed, count);
    }
    let positionResponse = {};
    // for (let vertex of Object.values(graph.vertices)) {
    //     console.log(
    //         vertex.position,
    //         vertex.computerturn,
    //         vertex.value,
    //         [...vertex.children].map((child) => child.value)
    //     );
    //     if (vertex.children.length > 0) {
    //         let maxChild = vertex.children.reduce(
    //             (max, child) => (child.value > max.value ? child : max),
    //             vertex.children[0]
    //         );
    //         positionResponse[vertex.position + String(vertex.computerturn)] =
    //             maxChild.position + String(maxChild.computerturn);
    //     } else {
    //         positionResponse[vertex.position + String(vertex.computerturn)] =
    //             null;
    //     }
    // }
    for (let vertex of Object.values(graph.vertices)) {
        for (let child of vertex.children) {
            if (positionResponse[vertex.position + String(vertex.computerturn)]) {
                positionResponse[
                    vertex.position + String(vertex.computerturn)
                ].push([child.position + String(child.computerturn), graph.vertices[child.position + String(child.computerturn)].value]);
            } else {
                positionResponse[
                    vertex.position + String(vertex.computerturn)
                ] = [[child.position + String(child.computerturn), graph.vertices[child.position + String(child.computerturn)].value]];
            }
        }
        console.log(positionResponse[vertex.position + String(vertex.computerturn)]);
    }
    return positionResponse;
}

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

// let graph = generateGraph();
// let responsedict = calculateValue(graph);
// fs.writeFileSync("response.json", JSON.stringify(responsedict));
fs.readFile("response.json", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let responsedict = JSON.parse(data);
    console.log(response("0122", false, responsedict));
});
