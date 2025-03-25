const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const searchWithTag = async (req, res) => {
    try {
        const nodes = await prisma.node.findMany(); // Fetch all nodes
        const searchTag = req.body.searchTag.toLowerCase();

        // Filter nodes where any tag in searchTags partially matches the searchTag
        const filteredNodes = nodes.filter(node =>
            node.searchTags.some(tag => tag.toLowerCase().includes(searchTag))
        );

        res.json({ nodes: filteredNodes });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};


/**
 * A* algorithm to find the shortest path between two nodes.
 * @param {Object} start - The starting node.
 * @param {Object} goal - The goal node.
 * @param {Array<Object>} edges - The list of edges in the graph.
 * @param {Function} heuristic - The heuristic function to estimate cost.
 * @returns {Array<Object>} - The shortest path as a list of nodes.
 */
function aStarRoute(start, goal, edges, heuristic) {
    const openSet = new Set([start.id]);
    const cameFrom = new Map();

    const gScore = new Map();
    gScore.set(start.id, 0);

    const fScore = new Map();
    fScore.set(start.id, heuristic(start, goal));

    while (openSet.size > 0) {
        // Get the node in openSet with the lowest fScore
        let current = null;
        let lowestFScore = Infinity;
        for (const nodeId of openSet) {
            const score = fScore.get(nodeId) || Infinity;
            if (score < lowestFScore) {
                lowestFScore = score;
                current = nodeId;
            }
        }

        if (current === goal.id) {
            // Reconstruct the path
            const path = [];
            while (current) {
                path.unshift(current);
                current = cameFrom.get(current);
            }
            return path;
        }

        openSet.delete(current);

        // Get neighbors of the current node
        const neighbors = edges.filter(edge => edge.nodeA === current || edge.nodeB === current);
        for (const edge of neighbors) {
            const neighbor = edge.nodeA === current ? edge.nodeB : edge.nodeA;

            // Ensure gScore for current is initialized
            const tentativeGScore = (gScore.get(current) ?? Infinity) + (edge.distance || 1);

            if (tentativeGScore < (gScore.get(neighbor) ?? Infinity)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                fScore.set(neighbor, tentativeGScore + heuristic({ id: neighbor }, goal));

                if (!openSet.has(neighbor)) {
                    openSet.add(neighbor);
                }
            }
        }
    }

    // If we reach here, no path was found
    return [];
}

// Example heuristic function (Euclidean distance)
function heuristic(nodeA, nodeB) {
    // Replace with actual coordinates if available
    const dx = (nodeA.position?.[0] || 0) - (nodeB.position?.[0] || 0);
    const dy = (nodeA.position?.[1] || 0) - (nodeB.position?.[1] || 0);
    return Math.sqrt(dx * dx + dy * dy);
}

const getRoute = async (req, res) => {
    try {
        const from = await prisma.node.findFirst({
            where: {
                id: req.body.src,
            },
        });
        if (!from) {
            res.status(404).json({ error: "Node not found" });
            return;
        }
        const to = await prisma.node.findFirst({
            where: {
                id: req.body.dst,
            },
        });
        if (!to) {
            res.status(404).json({ error: "Node not found" });
            return;
        }
        const edges = await prisma.edge.findMany();
        const route = aStarRoute(from, to, edges, heuristic);
        res.json({ route });
    } catch (error) {
        res.status(500).json({ error: error });
        console.error(error);
    }
}

const getDirectionPhoto = async (req, res) => {
    try {
        const from = req.body.src;
        const to = req.body.dst;

        const edge = await prisma.edge.findFirst({
            where: {
                OR: [
                    { NodeA: from, nodeB: to },
                    { fromA: to, fromB: from },
                ],
            },
        });
        if (!edge) {
            res.status(404).json({ error: "Edge not found" });
            return;
        }

        // Get fromAImgUrl from edge if node.id is fromA or get fromBImgUrl if node.id is fromB
        const imgUrl = edge.fromA === from.id ? edge.fromAImgUrl : edge.fromBImgUrl;
        res.json({ imgUrl });
    } catch (error) {
        res.status(500).json({ error: error });
        console.error(error);
    }
};

module.exports = {
    getRoute,
    getDirectionPhoto,
    searchWithTag,
};
