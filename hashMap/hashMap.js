import LinkedList from "../linkedList/linkedList.js";

export default class HashMap {
    constructor() {
        this.loadFactor = 0.8;
        this.capacity = 16;
        this.buckets = Array.from({ length: this.capacity }, (v, k) => null);
    }

    hash(key) {
        let hashcode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashcode =
                (primeNumber * hashcode + key.charCodeAt(i)) %
                this.buckets.length;
        }

        return hashcode;
    }

    set(key, value) {
        const hashCode = this.hash(key);

        const selectedBucket = this.buckets[hashCode];

        if (!selectedBucket) {
            this.buckets[hashCode] = new LinkedList();
            const linkedList = this.buckets[hashCode];
            linkedList.append([key, value]);
        } else {
            this.#replaceOrAppendValue(
                selectedBucket,
                selectedBucket.head(),
                key,
                value
            );
        }
    }

    #replaceOrAppendValue(list, node, key, value) {
        const storedKey = node.value[0];

        if (key === storedKey) {
            return (node.value[1] = value);
        }

        if (!node.nextNode) {
            return list.append([key, value]);
        }

        return this.#replaceOrAppendValue(list, node.nextNode, key, value);
    }

    get(key) {
        const hashCode = this.hash(key);
        const selectedBucket = this.buckets[hashCode];
        if (selectedBucket) {
            return this.#getValueFromKey(selectedBucket.head(), key);
        }

        return selectedBucket;
    }

    #getValueFromKey(node, key) {
        if (!node) {
            return null;
        }

        const storedKey = node.value[0];
        const storedValue = node.value[1];

        if (key === storedKey) {
            return storedValue;
        }

        if (!node.nextNode) {
            return null;
        }

        return this.#getValueFromKey(node.nextNode, key);
    }

    has(key) {
        const hashCode = this.hash(key);
        const selectedBucket = this.buckets[hashCode];

        if (selectedBucket) {
            return this.#getValueFromKey(selectedBucket.head(), key)
                ? true
                : false;
        }

        return false;
    }
}
