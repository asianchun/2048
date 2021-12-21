//Variables
const undo = document.querySelector("[data-undo]")
const reset = document.querySelector("[data-reset]")
const playArea = document.querySelectorAll(".play-area")
const score = document.querySelector(".score")
let takenTiles = []
let lose = false
//0,1,2,3 / 4,5,6,7 / 8,9,10,11 / 12,13,14,15 right
//0,4,8,12 / 1,5,9,13 / 2,6,10,14 / 3,7,11,15 down
//3,2,1,0 / 7,6,5,4 / 11,10,9,8 / 15,14,13,12 left
//12,8,4,0 / 13,9,5,1 / 14,10,6,2 / 15,11,7,3 up

//Functions
let start = () => {
  for (let i = 0; i < 2; i++) {
    createBlock()
  }

  console.log("Game started/restarted")
}

function checkLoss() {
  if (takenTiles.length == playArea.length) {
    lose = true
    score.append(" You lost!")
  }
}

function clearCanvas() {
  takenTiles = []
  lose = false
  score.innerText = "Score: 0"

  for (let i in playArea) {
    let block = playArea[i].children

    if (block === undefined) break

    if (block.length != 0) {
      block[0].remove()
    }
  }
}

function createBlock() {
  let exit = true
  let type = Math.floor(Math.random() * 2)
  let randomNumber = 0

  //Make sure both blocks are not in the same area
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
  checkLoss()

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
  if (lose) return

  if (event.key == "ArrowLeft") {
    createBlock()
    console.log("Go left boi")
  } else if (event.key == "ArrowRight") {
    createBlock()
    console.log("Go right boi")
  } else if (event.key == "ArrowDown") {
    createBlock()
    console.log("Go down boi")
  } else if (event.key == "ArrowUp") {
    createBlock()
    console.log("Go up boi")
  }
})

//Game logic
start()
