import HashMap from "./hashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

test.set("apple", "0");
test.set("banana", "0");
test.set("carrot", "0");
test.set("dog", "0");
test.set("elephant", "0");
test.set("frog", "0");
test.set("grape", "0");
test.set("hat", "0");
test.set("ice cream", "0");
test.set("jacket", "0");
test.set("kite", "0");
test.set("lion", "0");
test.set("moon", "0");

console.log(test.get("lion"));
console.log(test.has("lion"));

console.log(test.remove("yo yo mr white"));

console.log(test.entries());

console.log(test.length());
console.log(test.getCapacity());

console.log(test);
