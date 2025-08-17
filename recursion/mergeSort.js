function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);

    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    if (left.length === 0) return right;
    if (right.length === 0) return left;

    if (left[0] < right[0]) {
        return [left[0], ...merge(left.slice(1), right)];
    } else {
        return [right[0], ...merge(left, right.slice(1))];
    }
}

// Merge Sort Test Cases

// 1. Empty and small lists
const testCaseEmpty = [];
const testCaseSingle = [5];
const testCaseTwo = [2, 1];

// 2. Already sorted
const testCaseSortedSmall = [1, 2, 3, 4, 5];
const testCaseSortedLarge = [10, 20, 30, 40, 50];

// 3. Reverse sorted
const testCaseReverseSmall = [5, 4, 3, 2, 1];
const testCaseReverseLarge = [100, 50, 20, 10, 5];

// 4. Lists with duplicates
const testCaseDuplicatesSmall = [3, 1, 2, 3, 3, 0];
const testCaseDuplicatesAll = [5, 5, 5, 5];

// 5. Negative numbers
const testCaseNegatives = [-1, -3, -2, 0, 2];
const testCaseNegativesLarge = [-10, -50, -20, -1];

// 6. Mixed integers
const testCaseMixedSmall = [10, -1, 3, 0, -7, 2];
const testCaseMixedLarge = [100, 1, 50, -20, 75];

// 7. Larger random-like lists
const testCaseMedium = [9, 4, 7, 2, 8, 5, 1, 3, 6];
const testCaseCustom = [15, 3, 27, 9, 12, 6, 30];

// 8. Edge performance cases
const testCaseLargeRandom = Array.from({ length: 10000 }, (_, i) => 10000 - i); // 10k numbers descending
const testCaseManyDuplicates = Array(5000).fill(1).concat(Array(5000).fill(2));

console.log(mergeSort([5, 2, 1, 3, 6, 4]));
