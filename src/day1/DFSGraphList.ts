// This function performs a depth-first search (DFS) traversal on the graph.
function walk(
    graph: WeightedAdjacencyList,
    curr: number,        // The current node being visited
    needle: number,      // The target node we're searching for
    seen: boolean[],     // An array to keep track of visited nodes
    path: number[]):     // The current path taken from the source to the current node
    boolean {            // Returns true if the needle is found, false otherwise

    // If the current node has already been visited, skip it to avoid cycles
    if (seen[curr]) {
        return false;
    }

    // Mark the current node as visited
    seen[curr] = true;

    // Add the current node to the path
    // PRE Recursion
    path.push(curr);
    // Check if the current node is the target node (needle)
    if (curr === needle) {
        return true;  // If it is, we've found the path and can return true
    }

    // Recurse through all adjacent nodes (neighbors)
    const list = graph[curr];
    for (let i = 0; i < list.length; ++i) {
        const edge = list[i];

        // Recursively attempt to find the needle from the adjacent node
        if (walk(graph, edge.to, needle, seen, path)) {
            return true;  // If the recursive call returns true, the needle is found, and we propagate this back up the call stack
        }
    }

    // Post recursion
    // If no adjacent node leads to the needle, backtrack by removing the current node from the path
    path.pop();

    return false;  // Return false as the needle was not found in this path
}

// This is the main DFS function that initializes the search
export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,  // The starting node of the search
    needle: number): // The target node we're searching for
    number[] | null  // Returns the path to the needle if found, otherwise null
{
    // Create an array to keep track of visited nodes (initialized to false)
    const seen: boolean[] = new Array(graph.length).fill(false);

    // Initialize an empty array to store the path from source to needle
    const path: number[] = [];

    // Start the DFS traversal from the source node
    walk(graph, source, needle, seen, path);

    // If the path array is still empty, it means the needle wasn't found
    if (path.length === 0) {
        return null;
    }

    // Return the path to the needle
    return path;
}
