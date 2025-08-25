import LinkedList from "../linkedList/linkedList.js";

export default class HashMap {
    constructor() {
        this.loadFactor = 0.8;
        this.capacity = Array.from({ length: 16 });
    }

    hash(key) {
        let hashcode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashcode =
                (primeNumber * hashcode + key.charCodeAt(i)) %
                this.capacity.length;
        }

        return hashcode;
    }
}
