let cellsContainer = document.getElementById("container")
let cells = []
let msgEL = document.getElementById("msg-el")
let playerOneTurn = true
let gameIsInPlay = true
let winProbabilities = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

function createCells() {
    let cellElements = ""
    for (let i = 0; i < 9; i++) {
        cellElements += ` <div class="cell"></div> `       
    }
    cellsContainer.innerHTML = cellElements
    cells = document.querySelectorAll(".cell")
}

function swapTurn() {
    checkForOutcome(playerOneTurn ? "x" : "o")
    playerOneTurn = !playerOneTurn
} 

function checkForOutcome(player) {
    let win = winProbabilities.some(prob => {
        return prob.every(p => {
            return cells[p - 1].classList.contains(player)
        });
    });
    if (win) {
        gameIsInPlay = false
        let msg =   `       
                        <p>Congrats, <span>${player.toUpperCase()}</span> is the winner</p>
                        <button type="button">Restart Game</button>
                    `
        announceMsg(msg)
    }
    checkForDraw(win)
}

function checkForDraw(win) {
    let noEmptyCell = [...cells].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("o")
    })
    if (!win && noEmptyCell) {
        gameIsInPlay = false
        let msg =   `   
                        <p>The game ended in a draw</p>                        
                        <button type="button">Restart Game</button>
                    `
        announceMsg(msg)
    }
}

function reset() {
    playerOneTurn = true
    gameIsInPlay = true
    cells.forEach(cell => {
        if (cell.classList.contains("x")) {
            cell.classList.remove("x")
        } else {
            cell.classList.remove("o")
        }
    })
    msgEL.style.transform = "scale(0)"
}

function announceMsg(msg) {
    msgEL.style.transform = "scale(1)"
    msgEL.innerHTML = msg
}

createCells()

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!cell.classList.contains("x") && !cell.classList.contains("o") && gameIsInPlay) {
            cell.classList.add(playerOneTurn ? "x" : "o")
            cell.classList.remove(playerOneTurn ? "xhover" : "ohover")
            swapTurn()
        }
    })
    cell.addEventListener("mouseover", () => {
        if (!cell.classList.contains("x") && !cell.classList.contains("o") && gameIsInPlay) {
            cell.classList.add(playerOneTurn ? "xhover" : "ohover")
        }
    })
    cell.addEventListener("mouseout", () => {
        if (cell.classList.contains(playerOneTurn ? "xhover" : "ohover")) {
            cell.classList.remove(playerOneTurn ? "xhover" : "ohover")
        }
    })
})

msgEL.addEventListener("click", (e) => {
    if (e.target.innerText.toLowerCase() === "restart game") reset()
})