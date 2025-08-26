import HashMap from "./hashMap.js";

const hashMap = new HashMap();

hashMap.set("Rama", "this");

hashMap.set("Sita", "that");

hashMap.set("Sita", "new val");

hashMap.set("Habibi", "hamood");

console.log(hashMap.buckets);
