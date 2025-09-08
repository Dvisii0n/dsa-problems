function inRange(x, min, max) {
    return x >= min && x <= max;
}

function knightMoves(start, end) {
    const min = 0;
    const max = 7;
    if (
        !inRange(start[0], min, max) ||
        !inRange(end[0], min, max) ||
        !inRange(start[1], min, max) ||
        !inRange(end[1], min, max)
    ) {
        throw "ERROR: Invalid postion, values must be from 0 to 7";
    }

    const moves = [
        [-1, 2],
        [-2, 1],
        [2, 1],
        [1, 2],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
    ];

    const queue = [];
    const visited = new Set();

    const rootNode = { value: start, parent: null };

    queue.push(rootNode);

    const enqueueMoves = (start, end, queue) => {
        console.log(queue[0].value);
        if (queue[0].value.toString() === end.toString()) {
            return queue[0];
        }

        const first = queue.shift();

        visited.add(first.value.toString());

        for (let move of moves) {
            const validMove = [
                start.value[0] + move[0],
                start.value[1] + move[1],
            ];
            const x = validMove[0];
            const y = validMove[1];
            if (
                inRange(x, min, max) &&
                inRange(y, min, max) &&
                !visited.has(validMove.toString())
            ) {
                queue.push({ value: validMove, parent: start });
            }
        }

        return enqueueMoves(queue[0], end, queue);
    };

    const reconstructPath = (node) => {
        if (node.parent === null) {
            return [node.value];
        }

        return [node.value].concat(reconstructPath(node.parent));
    };

    const reversePath = (path) => {
        let arr = [];
        for (let i = path.length - 1; i >= 0; i--) {
            arr.push(path[i]);
        }

        return arr;
    };

    const endNode = enqueueMoves(rootNode, end, queue);
    const path = reconstructPath(endNode);
    const reversedPath = reversePath(path);

    const nMoves = path.length - 1;

    if (nMoves === 0) {
        console.log(`You are already here!: `);
    } else
        console.log(
            `You made it in ${reversedPath.length - 1} ${
                reversedPath.length === 1 ? "move" : "moves"
            }! Here's your path:`
        );

    reversedPath.forEach((node) => {
        console.log(node);
    });

    console.log(visited);

    return;
}

knightMoves([0, 0], [7, 7]);
