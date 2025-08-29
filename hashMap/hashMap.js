import LinkedList from "../linkedList/linkedList.js";

export default class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.initialCapacity = 16;
        this.buckets = Array.from(
            { length: this.initialCapacity },
            (v, k) => null
        );
    }

    getCapacity() {
        return this.buckets.length;
    }

    #grow() {
        const entries = this.entries();

        this.buckets = Array.from(
            { length: this.getCapacity() * 2 },
            (v, k) => null
        );

        entries.forEach((entry) => {
            const key = entry[0];
            const value = entry[1];

            this.set(key, value);
        });
    }

    #checkLoadFactor() {
        const capacity = this.getCapacity();
        const growFactor = Math.ceil(capacity * this.loadFactor);

        if (this.length() > growFactor) {
            this.#grow();
        }
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

    #getBucket(key) {
        const hashCode = this.hash(key);
        return this.buckets[hashCode];
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
        this.#checkLoadFactor();
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
        const selectedBucket = this.#getBucket(key);
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
        const selectedBucket = this.#getBucket(key);

        if (selectedBucket) {
            return this.#getValueFromKey(selectedBucket.head(), key)
                ? true
                : false;
        }

        return false;
    }

    #getNodeWithKey(node, key) {
        if (!node) {
            return null;
        }

        const storedKey = node.value[0];

        if (key === storedKey) {
            return node;
        }

        if (!node.nextNode) {
            return null;
        }

        return this.#getNodeWithKey(node.nextNode, key);
    }

    remove(key) {
        const selectedBucket = this.#getBucket(key);

        const node = this.#getNodeWithKey(selectedBucket.head(), key);

        if (node) {
            const index = selectedBucket.find(node.value);
            selectedBucket.removeAt(index);
            return true;
        }

        return false;
    }

    length() {
        let count = 0;
        for (let bucket of this.buckets) {
            if (bucket) {
                count += bucket.size();
            }
        }
        return count;
    }

    clear() {
        this.buckets = Array.from(
            { length: this.initialCapacity },
            (v, k) => null
        );
    }

    #getKeys(node) {
        const arr = [];
        if (!node) {
            return arr;
        }

        const storedKey = node.value[0];
        arr.push(storedKey);

        return arr.concat(this.#getKeys(node.nextNode));
    }

    keys() {
        let arr = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                arr.push(...this.#getKeys(bucket.head()));
            }
        }
        return arr;
    }

    #getValues(node) {
        const arr = [];
        if (!node) {
            return arr;
        }

        const storedValue = node.value[1];
        arr.push(storedValue);

        return arr.concat(this.#getValues(node.nextNode));
    }

    values() {
        let arr = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                arr.push(...this.#getValues(bucket.head()));
            }
        }
        return arr;
    }

    #getKeyValPair(node) {
        const arr = [];
        if (!node) {
            return arr;
        }

        const keyValPair = node.value;
        arr.push(keyValPair);

        return arr.concat(this.#getKeyValPair(node.nextNode));
    }

    entries() {
        let arr = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                arr.push(...this.#getKeyValPair(bucket.head()));
            }
        }
        return arr;
    }
}
