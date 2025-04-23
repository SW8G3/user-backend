import { aStarRoute } from '../controller/graph';

describe('A* Algorithm', () => {
  const heuristic = (nodeA: any, nodeB: any) => {
    const dx = (nodeA.position?.[0] || 0) - (nodeB.position?.[0] || 0);
    const dy = (nodeA.position?.[1] || 0) - (nodeB.position?.[1] || 0);
    return Math.sqrt(dx * dx + dy * dy);
  };

  it('should find the shortest path in a simple graph', () => {
    const edges = [
      { nodeA: 1, nodeB: 2, distance: 1 },
      { nodeA: 2, nodeB: 3, distance: 1 },
      { nodeA: 3, nodeB: 4, distance: 1 },
    ];

    const start = { id: 1, position: [0, 0] };
    const goal = { id: 4, position: [3, 0] };

    const path = aStarRoute(start, goal, edges, heuristic);

    expect(path).toEqual([1, 2, 3, 4]);
  });

  it('should return an empty path if no path exists', () => {
    const edges = [
      { nodeA: 1, nodeB: 2, distance: 1 },
      { nodeA: 3, nodeB: 4, distance: 1 },
    ];

    const start = { id: 1, position: [0, 0] };
    const goal = { id: 4, position: [3, 0] };

    const path = aStarRoute(start, goal, edges, heuristic);

    expect(path).toEqual([]); // No path exists
  });

  it('should handle the case where start equals goal', () => {
    const edges = [
      { nodeA: 1, nodeB: 2, distance: 1 },
      { nodeA: 2, nodeB: 3, distance: 1 },
    ];

    const start = { id: 1, position: [0, 0] };
    const goal = { id: 1, position: [0, 0] };

    const path = aStarRoute(start, goal, edges, heuristic);

    expect(path).toEqual([1]); // Start equals goal
  });

  it('should handle an empty graph', () => {
    const edges: any[] = []; // No edges

    const start = { id: 1, position: [0, 0] };
    const goal = { id: 2, position: [1, 0] };

    const path = aStarRoute(start, goal, edges, heuristic);

    expect(path).toEqual([]); // No path exists in an empty graph
  });
});