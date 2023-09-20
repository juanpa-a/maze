const maze_container = document.getElementById("maze");

const classMap = {
    W: "wall",
    S: "flag",
    E: "flag",
    P: "path",
};


const mazeContainer = document.getElementById("maze");

maze.forEach((row, x) => {
    row.forEach((cell, y) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("maze-cell", classMap[cell]);
        cellElement.setAttribute("id", `${x},${y}`);
        mazeContainer.appendChild(cellElement);
    });
});


document.querySelectorAll(".wall").forEach((element) => {
    const backgroundImage = new Image();
    backgroundImage.src = `assets/bush.png`;
    element.appendChild(backgroundImage);
});


