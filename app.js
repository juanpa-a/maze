const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

const set_visited = (seen, cell, coords) => {
    seen[coords] = true;

    const img = new Image();
    img.src = `assets/visited.png`;
    img.style.width = "33%";    
    img.style.height = "30%";
    img.style.margin = "auto";

    const clone = img.cloneNode();
    cell.appendChild(clone);
};

const find_path = async (maze, start, end) => {
    const q = [start];
    const seen = {};
    const prev = {};

    const step = setInterval(() => {
        const [curr_x, curr_y] = q.shift();
        const coords = `${curr_x},${curr_y}`;
        const cell = document.getElementById(coords);

        directions.forEach(([x, y]) => {
            x = curr_x + x;
            y = curr_y + y;

            if (x === end[0] && y === end[1]) {
                let current  = `${x},${y}`;
                const target = `${start[0]},${start[1]}`;
                prev[`${x},${y}`] = coords;

                while (current !== target) {
                    document.getElementById(current).classList.add("found");
                    current = prev[current];
                }
                document.getElementById(current).classList.add("found");

                return clearInterval(step);
            }

            const inBoundsX = x < 0 || x <= maze[0].length;
            const inBoundsY = y < 0 || y <= maze.length;
            const inBounds  = inBoundsX && inBoundsY;
            const isPath    = maze[x][y] === "P";

            if (inBounds && isPath && !seen[`${x},${y}`]) {
                prev[`${x},${y}`] = coords;
                q.push([x, y]);
            }
        });

        if (!seen[coords]) {
            set_visited(seen, cell, coords);
        }

        if (q.length === 0) {
            clearInterval(step);
        }

    }, 50 / q.length);
};

find_path(maze, [1, 0], [18, 19]);
