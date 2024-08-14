export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    // Initialize a queue with the head node. This queue will be used to explore nodes level by level.
    const que: (BinaryNode<number> | null)[] = [head];

    // Continue processing as long as there are nodes in the queue
    while (que.length) {
        // Dequeue the first node in the queue for processing
        const curr = que.shift() as BinaryNode<number> | null;

        // If the dequeued node is null, skip to the next iteration
        if (curr === null) {
            continue;
        }

        // Check if the current node's value matches the target value (needle)
        if (curr.value === needle) {
            return true; // If found, return true
        }

        // If the current node has a left child, enqueue it for further exploration
        if (curr.left) {
            que.push(curr.left);
        }

        // If the current node has a right child, enqueue it for further exploration
        if (curr.right) {
            que.push(curr.right);
        }
    }

    // If the loop completes without finding the needle, return false
    return false;
}
