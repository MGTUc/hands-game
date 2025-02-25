import { DirectedGraph, Vertex } from "./DirectedGraph.mjs";

let startingVertex = new Vertex(1111, 0, false);
let graph = new DirectedGraph(startingVertex);
let reachedAllPositions = false;
let frontier = [graph.getRoot()];
let count = 0;
while (!reachedAllPositions) {
    let newFrontier = [];
    for (let vertex of frontier) {
        let children = generateChildren(vertex);
        for (let child of children) {
            if (!graph.vertices[child.position + String(child.computerturn)]) {
                graph.addVertex(child);
                if (child.value === 0) {
                    newFrontier.push(child);
                } else {
                    count++;
                    console.log(
                        child.position +
                            String(child.computerturn) +
                            String(child.value)
                    );
                }
            }
        }
    }
    frontier = newFrontier;
    reachedAllPositions = frontier.length === 0;
}
console.log(graph.vertices);
console.log(Object.keys(graph.vertices).length);
console.log(count);

function generateChildren(vertex) {
    let children = [];
    let positions = new Set();
    let [a1, a2, a3, a4] = vertex.position.toString().split("").map(Number);
    positions.add(
        String([Math.min(a3 + a1, 5) % 5, a4].sort().concat([a1, a2]))
            .split(",")
            .slice(0, 4)
            .join("")
    );
    positions.add(
        String([Math.min(a3 + a2, 5) % 5, a4].sort().concat([a1, a2]))
            .split(",")
            .slice(0, 4)
            .join("")
    );
    positions.add(
        String([Math.min(a4 + a1, 5) % 5, a3].sort().concat([a1, a2]))
            .split(",")
            .slice(0, 4)
            .join("")
    );
    positions.add(
        String([Math.min(a4 + a2, 5) % 5, a3].sort().concat([a1, a2]))
            .split(",")
            .slice(0, 4)
            .join("")
    );
    if (a1 == 1 && a2 == 3) {
        positions.add(String(a3) + String(a4) + String(2) + String(2));
    }
    if (a1 == 0 && a2 == 2) {
        positions.add(String(a3) + String(a4) + String(1) + String(1));
    }
    if (a1 == 0 && a2 == 4) {
        positions.add(String(a3) + String(a4) + String(2) + String(2));
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
