import mergeSort from "../recursion/mergeSort.js";

function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}

function buildTree(arr) {
    if (!arr.length) {
        return null;
    }

    const mid = Math.floor(arr.length / 2);

    const root = new Node(arr[mid]);

    root.left = buildTree(arr.slice(0, mid));
    root.right = buildTree(arr.slice(mid + 1));

    return root;
}

function sortAndRemoveDuplicates(arr) {
    const sortedArr = mergeSort(arr);
    const set = new Set(sortedArr);
    return Array.from(set);
}

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr);
    }

    insert(value) {}
}

const arr = sortAndRemoveDuplicates([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

const tree = new Tree(arr);

prettyPrint(tree.root);
