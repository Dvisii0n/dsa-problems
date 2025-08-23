class Node {
    constructor() {
        this.value = null;
        this.nextNode = null;
    }
}

class LinkedList {
    constructor() {
        this.list = null;
    }

    #listIsEmpty() {
        return this.list === null;
    }

    #findLast(node) {
        if (this.#listIsEmpty()) {
            throw "ERROR: List is empty";
        }

        if (node.nextNode === null) {
            return node;
        }

        return this.#findLast(node.nextNode);
    }

    append(value) {
        const newNode = new Node();
        newNode.value = value;

        if (this.#listIsEmpty()) {
            this.list = newNode;
        } else {
            replaceNull(this.list);
        }

        function replaceNull(node) {
            if (node.nextNode === null) {
                node.nextNode = newNode;
                return;
            }

            return replaceNull(node.nextNode);
        }
    }

    prepend(value) {
        const newNode = new Node();
        newNode.value = value;

        const originalList = this.list;
        this.list = newNode;
        this.list.nextNode = originalList;
    }

    size() {
        function countNodes(node) {
            let count = 0;

            if (node) {
                count += 1;
            } else {
                return count;
            }

            if (node.nextNode === null) {
                return count;
            }

            return count + countNodes(node.nextNode);
        }

        return countNodes(this.list);
    }

    head() {
        return this.list;
    }

    tail() {
        return this.#findLast(this.list);
    }

    at(index) {
        if (this.#listIsEmpty()) {
            throw "ERROR: List is Empty";
        }

        function matchIndex(node, i) {
            let currentIndex = i;

            if (!node) {
                return node;
            }

            if (index === currentIndex) {
                return node;
            }

            currentIndex += 1;

            return matchIndex(node.nextNode, currentIndex);
        }

        return matchIndex(this.list, 0);
    }

    pop() {
        const tail = this.#findLast(this.list);

        if (this.#listIsEmpty()) {
            throw "ERROR: List is empty";
        }

        if (!this.head().nextNode) {
            this.list = null;
            return;
        }

        function removeLast(node) {
            if (node.nextNode === tail) {
                node.nextNode = null;
                return;
            }

            return removeLast(node.nextNode);
        }

        return removeLast(this.list);
    }

    contains(value) {
        function itExists(node) {
            if (!node) {
                return false;
            }

            if (node.value === value) {
                return true;
            }

            return itExists(node.nextNode);
        }

        return itExists(this.list);
    }

    find(value) {
        function matchValue(node, i) {
            let pos = i;
            if (!node) {
                return node;
            }

            if (node.value === value) {
                return i;
            }

            pos += 1;

            return matchValue(node.nextNode, pos);
        }

        return matchValue(this.list, 0);
    }

    toString() {
        function fullString(node) {
            let str = "";

            if (node) {
                str = `(${node.value}) -> `;
            } else {
                return null;
            }

            return str.concat(fullString(node.nextNode));
        }

        return fullString(this.list);
    }

    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
            return;
        }

        const newNode = new Node();
        newNode.value = value;

        function traverseNReplace(node, i) {
            let pos = i;

            if (!node) {
                throw "ERROR: Index out of range, could not link node to previous node.";
            }

            if (pos === index - 1) {
                newNode.nextNode = node.nextNode;
                node.nextNode = newNode;
                return;
            }

            i += 1;

            return traverseNReplace(node.nextNode, i);
        }

        return traverseNReplace(this.list, 0);
    }

    removeAt(index) {
        if (this.#listIsEmpty()) {
            throw "ERROR: List is empty";
        }

        if (index === 0) {
            this.list = this.head().nextNode;
            return;
        }
        function traverseNRemove(node, i) {
            let pos = i;

            if (!node.nextNode) {
                throw "ERROR: Index out of range, could not link node to previous node.";
            }

            if (pos === index - 1) {
                node.nextNode = node.nextNode.nextNode;
                return;
            }

            i += 1;
            return traverseNRemove(node.nextNode, i);
        }

        return traverseNRemove(this.list, 0);
    }
}

export default LinkedList;
