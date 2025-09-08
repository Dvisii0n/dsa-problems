function knightMoves(start, end) {
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

    queue.push(start);

    const enqueueMoves = (start, end, queue) => {
        console.log(queue);
        if (queue[0].toString() === end.toString()) {
            return;
        }

        queue.shift();

        for (let move of moves) {
            const validMove = [start[0] + move[0], start[1] + move[1]];
            const x = validMove[0];
            const y = validMove[1];
            if (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
                queue.push(validMove);
            }
        }

        return enqueueMoves(queue[0], end, queue);
    };

    return enqueueMoves(start, end, queue);
}

knightMoves([0, 0], [3, 3]);
