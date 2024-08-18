export default function bfs(
    graph: WeightedAdjacencyMatrix, // The graph represented as a weighted adjacency matrix
    source: number,                 // The starting node for the BFS search
    needle: number                  // The target node we are searching for
): number[] | null {                // Returns the path from source to needle, or null if not found

    // Initialize an array to keep track of seen (visited) nodes. Initially, no node has been visited.
    const seen = new Array(graph.length).fill(false);

    // Initialize an array to keep track of the previous node for each visited node.
    // This will help in reconstructing the path once the target node is found.
    const prev = new Array(graph.length).fill(-1);

    // Mark the source node as seen and enqueue it for processing.
    seen[source] = true;
    const q: number[] = [source];

    // Perform the BFS loop until the queue is empty.
    do {
        // Dequeue the first node in the queue to process it.
        const curr = q.shift() as number;

        // If the current node is the target node, break out of the loop.
        if (curr === needle) {
            break;
        }

        // Get the list of adjacent nodes (neighbors) for the current node.
        const adjs = graph[curr];

        // Iterate over all possible neighbors of the current node.
        for (let i = 0; i < adjs.length; ++i) {
            // If the neighbor is not connected (represented by 0), skip it.
            if (adjs[i] === 0) {
                continue;
            }

            // If the neighbor has already been seen, skip it.
            if (seen[i]) {
                continue;
            }

            // Mark the neighbor as seen.
            seen[i] = true;

            // Set the current node as the previous node for this neighbor.
            prev[i] = curr;

            // Enqueue the neighbor for processing in subsequent iterations.
            q.push(i);
        }

        // Ensure the current node is marked as seen (this is redundant here because it's done earlier).
        seen[curr] = true;
    } while (q.length) // Continue processing until the queue is empty.

    // If the target node (needle) has no previous node, it means it wasn't reached, return null.
    if (prev[needle] === -1) {
        return null;
    }

    // To reconstruct the path, start from the target node and backtrack using the prev array.
    let curr = needle;
    const out: number[] = [];

    // Continue backtracking until you reach the source node.
    while (prev[curr] !== -1) {
        out.push(curr);  // Add the current node to the path.
        curr = prev[curr]; // Move to the previous node.
    }

    // Add the source node to the beginning of the path and reverse it to get the correct order.
    return [source].concat(out.reverse());
}
