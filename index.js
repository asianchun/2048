//Variables
const undo = document.querySelector("[data-undo]")
const reset = document.querySelector("[data-reset]")
const playArea = document.querySelectorAll(".play-area")
let takenTiles = []
let randomNumber = 0

//Functions
let start = () => {
  for (let i = 0; i < 2; i++) {
    randomNumber = Math.floor(Math.random() * 2)
    createBlock(randomNumber)
  }

  console.log("Game started/restarted")
}

function clearCanvas() {
  takenTiles = []

  for (let i in playArea) {
    let block = playArea[i].children

    if (block === undefined) break

    if (block.length != 0) {
      block[0].remove()
    }
  }
}

function createBlock(type) {
  //Make sure both blocks are not in the same area
  let exit = true

  do {
    exit = true
    randomNumber = Math.floor(Math.random() * playArea.length)

    for (let i in takenTiles) {
      if (takenTiles[i] == randomNumber) {
        exit = false
      }
    }
  } while (!exit)

  takenTiles.push(randomNumber)

  //2
  if (type == 0) {
    const two = document.createElement("div")
    two.innerText = "2"
    two.classList.add("play-area")
    two.classList.add("block")
    two.classList.add("two")
    playArea[randomNumber].append(two)
  }
  //4
  if (type == 1) {
    const four = document.createElement("div")
    four.innerText = "4"
    four.classList.add("play-area")
    four.classList.add("block")
    four.classList.add("four")
    playArea[randomNumber].append(four)
  }
}

//Onclick
undo.onclick = () => {
  console.log("Undo the ting")
}

reset.onclick = () => {
  clearCanvas()
  start()
}

//On keyboard
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    console.log("Go left boi")
  } else if (event.key == "ArrowRight") {
    console.log("Go right boi")
  } else if (event.key == "ArrowDown") {
    console.log("Go down boi")
  } else if (event.key == "ArrowUp") {
    console.log("Go up boi")
  }
})

//Game logic
start()
