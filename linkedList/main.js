import linkedList from "./linkedList.js";

const list = new linkedList();

list.append("dog");
// list.append("cat");
// list.append("parrot");
// list.append("hamster");
// list.append("snake");
// list.append("turtle");

list.pop();

console.log(list.toString());
