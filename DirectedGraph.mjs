export class DirectedGraph {
    vertices;
    rootVertex;
    /**
     * @param {Vertex} root 
     */
    constructor(root) {
        this.vertices={[String(root.position)+String(root.computerturn)]:root};
        this.rootVertex = root;
    }
    getRoot() {
        return this.rootVertex;
    }
    addVertex(vertices) {
        for (let vertex of vertices) {
            this.vertices[(vertex.position,vertex.computerturn)] = vertex;
        }
    }
}

export class Vertex {
    position;
    value;
    computerturn;
    children;
    /**
     * 
     * @param {number} position represents the position eg, 1111 1112
     * @param {number} value represents the value of the position (a value between -1 and 1, 1 being the computer and -1 the player)
     * @param {boolean} computerturn true for computer, false for player
     * @param {Vertex[]} children array of child nodes of type Node
     */
    constructor(position, value, computerturn, children = []) {
        this.position = position;
        this.value = value;
        this.computerturn = computerturn;
        this.children = children;
    }
}