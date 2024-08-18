// Function to check if there are any unvisited nodes with finite distance
function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    // This checks if there's any node that hasn't been visited yet (seen[i] is false)
    // and has a distance less than Infinity (meaning it's reachable).
    // return seen.some((s, i) => !s && dists[i] < Infinity);

    for (let i = 0; i < seen.length; i++) {
        const isVisited = seen[i];
        const distance = dists[i];

        if (!isVisited && distance < Infinity) {
            return true;
        }
    }

    return false;
}

// Function to find the unvisited node with the lowest distance
function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1; // Initialize index for the node with the lowest distance
    let lowestDistance = Infinity; // Initialize the lowest distance found

    // Loop through all nodes
    for (let i = 0; i < seen.length; ++i) {
        // Skip nodes that have already been visited
        if (seen[i]) {
            continue;
        }

        // If the current node has a lower distance, update the index and lowest distance
        if (lowestDistance > dists[i]) {
            lowestDistance = dists[i];
            idx = i;
        }
    }

    // Return the index of the unvisited node with the lowest distance
    return idx;
}

// Main function to perform Dijkstra's algorithm using an adjacency list
export default function dijkstra_list(source: number, sink: number, arr: WeightedAdjacencyList): number[] {
    // Initialize arrays to keep track of seen nodes, previous nodes, and distances
    const seen = new Array(arr.length).fill(false); // Track whether each node has been visited
    const prev = new Array(arr.length).fill(-1); // Track the previous node in the shortest path
    const dists = new Array(arr.length).fill(Infinity); // Track the shortest distance to each node

    // Set the distance to the source node as 0
    dists[source] = 0;

    // Continue the algorithm until there are no more unvisited nodes with finite distances
    while (hasUnvisited(seen, dists)) {
        // Get the unvisited node with the lowest distance
        const curr = getLowestUnvisited(seen, dists);
        seen[curr] = true; // Mark this node as visited

        // Get the adjacent nodes (edges) of the current node
        const adjs = arr[curr];
        for (let i = 0; i < adjs.length; ++i) {
            const edge = adjs[i]; // Get each adjacent node (neighbor)

            // Skip this neighbor if it has already been visited
            if (seen[edge.to]) {
                continue;
            }

            // Calculate the distance to this neighbor through the current node
            const dist = dists[curr] + edge.weight;

            // If this distance is shorter than the previously known distance, update it
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist; // Update the shortest distance to this neighbor
                prev[edge.to] = curr; // Set the previous node for this neighbor to the current node
            }
        }
    }

    // Reconstruct the shortest path from the source to the sink
    const out: number[] = [];
    let curr = sink;

    // Follow the previous nodes from the sink back to the source
    while (prev[curr] !== -1) {
        out.push(curr); // Add each node to the path
        curr = prev[curr]; // Move to the previous node in the path
    }

    // Add the source to the path
    out.push(source);
    return out.reverse(); // Reverse the path to get it from source to sink
}
