let towers = {
    A: [],
    B: [],
    C: []
};

function createDisks(n) {
    let fromTower = document.getElementById('A');
    for (let i = n; i > 0; i--) {
        let disk = document.createElement("div");
        disk.classList.add("disk", `disk-${i}`);
        disk.dataset.size = i;
        towers.A.push(disk);
        fromTower.appendChild(disk);

        disk.style.bottom = `${10 + (n - i) * 20}px`;
    }
}

function moveDisk(from, to) {
    if (towers[from].length === 0) return;

    let disk = towers[from].pop();
    towers[to].push(disk);

    let toTower = document.getElementById(to);
    toTower.appendChild(disk);

    let numDisks = towers[to].length;
    disk.style.bottom = `${10 + (numDisks - 1) * 20}px`;
}


function animateHanoi(n, fromRod, toRod, auxRod, delay = 500, moves = []) {
    if (n === 1) {
        moves.push([fromRod, toRod]);
        return moves;
    }

    animateHanoi(n - 1, fromRod, auxRod, toRod, delay, moves);
    moves.push([fromRod, toRod]);
    animateHanoi(n - 1, auxRod, toRod, fromRod, delay, moves);

    return moves;
}

function executeMoves(moves, index = 0) {
    if (index >= moves.length) return;
    let [from, to] = moves[index];

    setTimeout(() => {
        moveDisk(from, to);
        executeMoves(moves, index + 1);
    }, 500);
}

function startGame() {
    let numDisks = 4; // Change the number of disks here
    towers = { A: [], B: [], C: [] };
    document.getElementById("A").innerHTML = '<div class="rod"></div>';
    document.getElementById("B").innerHTML = '<div class="rod"></div>';
    document.getElementById("C").innerHTML = '<div class="rod"></div>';

    createDisks(numDisks);
    let moves = animateHanoi(numDisks, "A", "C", "B");
    executeMoves(moves);
}
