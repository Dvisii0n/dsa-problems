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
        this.root = buildTree(sortAndRemoveDuplicates(arr));
    }

    #insertRec(newNode, node) {
        if (newNode.data < node.data) {
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
        this.root = this.#deleteNode(value, this.root);
        return this.root;
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

    levelOrderTraversal(node, queue, callback) {
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

            return this.levelOrderTraversal(queue[0], queue, callback);
        } catch (error) {
            throw "ERROR: Callback function not provided";
        }
    }

    levelOrderForEach(callback) {
        let queue = [];
        queue.push(this.root);

        return this.levelOrderTraversal(this.root, queue, callback);
    }

    #inOrderTraversal(node, callback) {
        if (node === null) {
            return node;
        }

        this.#inOrderTraversal(node.left, callback);
        callback(node);
        this.#inOrderTraversal(node.right, callback);
    }

    #preOrderTraversal(node, callback) {
        if (node === null) {
            return node;
        }

        callback(node);
        this.#preOrderTraversal(node.left, callback);
        this.#preOrderTraversal(node.right, callback);
    }

    #postOrderTraversal(node, callback) {
        if (node === null) {
            return node;
        }

        this.#postOrderTraversal(node.left, callback);
        this.#postOrderTraversal(node.right, callback);
        callback(node);
    }

    inOrderForEach(callback) {
        return this.#inOrderTraversal(this.root, callback);
    }

    preOrderForEach(callback) {
        return this.#preOrderTraversal(this.root, callback);
    }

    postOrderForEach(callback) {
        return this.#postOrderTraversal(this.root, callback);
    }

    #getHeight(node) {
        if (node === null) {
            return -1;
        }

        return (
            Math.max(this.#getHeight(node.left), this.#getHeight(node.right)) +
            1
        );
    }

    height(value) {
        const node = this.find(value);
        return node ? this.#getHeight(node) : null;
    }

    depth(value) {
        const rootHeight = this.#getHeight(this.root);

        const valueHeight = this.height(value);

        if (valueHeight === null) {
            return null;
        }

        return rootHeight - valueHeight;
    }

    isBalanced() {
        let treeIsBalanced = true;

        this.inOrderForEach((node) => {
            const leftHeight = this.#getHeight(node.left);
            const rightHeight = this.#getHeight(node.right);

            const balanced =
                Math.max(leftHeight, rightHeight) -
                    Math.min(leftHeight, rightHeight) <=
                1;

            if (!balanced) {
                treeIsBalanced = false;
            }
        });

        return treeIsBalanced;
    }

    rebalance() {
        let arr = [];
        this.inOrderForEach((node) => {
            arr.push(node.data);
        });

        this.root = buildTree(arr);
        return true;
    }
}

const tree = new Tree([1, 2, 3, 4]);

prettyPrint(tree.root);

console.log(tree.find(1));

export { prettyPrint, Tree };
