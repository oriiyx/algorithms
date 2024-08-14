// Main Quick Sort function (helper)
function qs(arr: number[], lo: number, hi: number): void {
    // Base case: if the subarray has one or zero elements, it's already sorted
    if (lo >= hi) {
        return;
    }

    // Partition the array around a pivot, and get the index of the pivot after partition
    const pivotIdx = partition(arr, lo, hi);

    // Recursively sort the subarrays to the left and right of the pivot
    qs(arr, lo, pivotIdx - 1); // Sort the left subarray
    qs(arr, pivotIdx + 1, hi); // Sort the right subarray
}

// Partition function: rearranges the elements around the pivot
function partition(arr: number[], lo: number, hi: number): number {
    // Choose the pivot element (in this case, we pick the last element in the array)
    const pivot = arr[hi];
    // Index to place the next element smaller than or equal to the pivot
    let idx = lo - 1;

    // Traverse the array and rearrange elements based on the pivot
    for (let i = lo; i < hi; ++i) {
        // If the current element is smaller than or equal to the pivot
        if (arr[i] <= pivot) {
            idx++; // Move the index of the smaller element
            // Swap the current element with the element at idx
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }

    // Place the pivot in its correct position (all elements before idx are <= pivot)
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;

    // Return the index where the pivot is placed
    return idx;
}

// Main function to kick off the Quick Sort algorithm
export default function quick_sort(arr: number[]): void {
    // Call the helper function with the full array range
    qs(arr, 0, arr.length - 1);
}
