function fibonacci(n) {
    let arr = [];

    for (let i = 0; i < n; i++) {
        if (i < 2) {
            arr.push(i);
        } else {
            arr.push(arr[i - 1] + arr[i - 2]);
        }
    }
    return arr;
}

function fibonacciRec(n) {
    if (n === 0) {
        return [0];
    } else if (n === 1) {
        return [0, 1];
    }

    let arr = fibonacciRec(n - 1);
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);

    return arr;
}

console.log(fibonacciRec(8));
