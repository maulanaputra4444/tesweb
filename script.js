// 0 = Path, 1 = Wall, 2 = Start, 3 = Goal
const map = [
    [2, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 1, 3]
];

let playerPos = { x: 0, y: 0 };

function drawMaze() {
    const mazeElement = document.getElementById('maze');
    mazeElement.innerHTML = '';
    map.forEach((row, y) => {
        row.forEach((tile, x) => {
            const div = document.createElement('div');
            div.className = 'tile';
            if (tile === 1) div.classList.add('wall');
            if (tile === 3) div.classList.add('goal');
            if (x === playerPos.x && y === playerPos.y) div.classList.add('player');
            mazeElement.appendChild(div);
        });
    });
}

async function runCommands() {
    const input = document.getElementById('commandInput').value.toLowerCase();
    const commands = input.split('\n');

    for (let cmd of commands) {
        cmd = cmd.trim();
        let newX = playerPos.x;
        let newY = playerPos.y;

        if (cmd === 'up') newY--;
        else if (cmd === 'down') newY++;
        else if (cmd === 'left') newX--;
        else if (cmd === 'right') newX++;

        // Collision Check & Boundary Check
        if (map[newY] !== undefined && map[newY][newX] !== undefined && map[newY][newX] !== 1) {
            playerPos.x = newX;
            playerPos.y = newY;
            drawMaze();
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for animation
        }
    }
    
    if (map[playerPos.y][playerPos.x] === 3) {
        alert("You reached the goal!");
    }
}

function resetGame() {
    playerPos = { x: 0, y: 0 };
    drawMaze();
}

drawMaze();
