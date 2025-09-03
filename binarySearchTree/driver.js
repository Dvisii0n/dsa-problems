import { prettyPrint, Tree } from "./bst.js";

function randomArr(length) {
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * (length - 1 + 1) + 1));
    }

    return arr;
}

const tree = new Tree(randomArr(10));

prettyPrint(tree.root);

console.log(tree.isBalanced());

console.log("Level order: ");
tree.levelOrderForEach((node) => console.log(node.data));
console.log("In order: ");
tree.inOrderForEach((node) => console.log(node.data));
console.log("Pre order: ");
tree.preOrderForEach((node) => console.log(node.data));
console.log("Post order: ");
tree.postOrderForEach((node) => console.log(node.data));

//Unbalance the tree
tree.insert(11);
tree.insert(12);
tree.insert(13);
tree.insert(14);
tree.insert(15);

prettyPrint(tree.root);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

prettyPrint(tree.root);

console.log("Level order: ");
tree.levelOrderForEach((node) => console.log(node.data));
console.log("In order: ");
tree.inOrderForEach((node) => console.log(node.data));
console.log("Pre order: ");
tree.preOrderForEach((node) => console.log(node.data));
console.log("Post order: ");
tree.postOrderForEach((node) => console.log(node.data));
