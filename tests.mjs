import { DirectedGraph,Vertex } from './DirectedGraph.mjs';

let startingVertex = new Vertex(1111,0,false);
let graph = new DirectedGraph(startingVertex);
assert(graph.getRoot().position === 1111);
assert(graph.getRoot().value === 0);
assert(graph.getRoot().computerturn === false);