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

    #insertRec(newNode, node) {
        if (newNode.data <= node.data) {
            if (!node.left) {
                return (node.left = newNode);
            } else {
                return this.#insertRec(newNode, node.left);
            }
        }

        if (!node.right) {
            return (node.right = newNode);
        }
        return this.#insertRec(newNode, node.right);
    }

    insert(value) {
        const newNode = new Node(value);
        return this.#insertRec(newNode, this.root);
    }

    #getSuccesor(node) {
        node = node.right;
        while (node !== null && node.left !== null) {
            node = node.left;
        }
        return node;
    }

    #deleteNode(value, node) {
        if (node === null) {
            return node;
        }

        if (value < node.data) {
            node.left = this.#deleteNode(value, node.left);
        } else if (value > node.data) {
            node.right = this.#deleteNode(value, node.right);
        } else {
            if (node.left === null) {
                return node.right;
            }

            if (node.right === null) {
                return node.left;
            }

            const succesor = this.#getSuccesor(node);
            node.data = succesor.data;
            node.right = this.#deleteNode(succesor.data, node.right);
        }

        return node;
    }

    delete(value) {
        return this.#deleteNode(value, this.root);
    }

    #findRec(value, node) {
        if (node === null) {
            return node;
        }

        if (value < node.data) {
            return this.#findRec(value, node.left);
        }

        if (value > node.data) {
            return this.#findRec(value, node.right);
        }

        return node;
    }

    find(value) {
        return this.#findRec(value, this.root);
    }

    #traverse(node, queue, callback) {
        try {
            if (queue.length === 0) {
                return;
            }

            if (node.left !== null) {
                queue.push(node.left);
            }

            if (node.right !== null) {
                queue.push(node.right);
            }

            callback(node);
            queue.shift();

            return this.#traverse(queue[0], queue, callback);
        } catch (error) {
            throw "ERROR: Callback function not provided";
        }
    }

    levelOrderForEach(callback) {
        let queue = [];
        queue.push(this.root);

        return this.#traverse(this.root, queue, callback);
    }
}

const arr = sortAndRemoveDuplicates([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

const tree = new Tree(arr);

prettyPrint(tree.root);

tree.levelOrderForEach((node) => {
    console.log(node.data);
});
