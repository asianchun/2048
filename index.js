//Variables
const reset = document.querySelector("[data-reset]")
const playArea = document.querySelectorAll(".play-area")
const score = document.querySelector(".score")
const right = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const left = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const down = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15]
const up = [15, 11, 7, 3, 14, 10, 6, 2, 13, 9, 5, 1, 12, 8, 4, 0]
let takenTiles = []

//Functions
let start = () => {
  for (let i = 0; i < 2; i++) {
    createBlock()
  }
}

function clearCanvas() {
  takenTiles = []
  lose = false
  score.innerText = "Good luck!"

  for (let i in playArea) {
    let block = playArea[i].children

    if (block === undefined) break

    if (block.length != 0) block[0].remove()
  }
}

function createBlock() {
  let exit = true
  let type = Math.floor(Math.random() * 2)
  let randomNumber = 0

  //Make sure new blocks can be placed
  if (takenTiles.length == playArea.length) {
    score.innerText = "You done out here!"
    return
  }

  //Make sure both blocks are not in the same area
  do {
    exit = true
    randomNumber = Math.floor(Math.random() * playArea.length)

    for (let i in takenTiles) {
      if (takenTiles[i] == randomNumber) exit = false
    }
  } while (!exit)

  takenTiles.push(randomNumber)
  takenTiles.sort(function (x, y) {
    return x - y
  })

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

function moveBlock(direction, array) {
  for (let i in takenTiles) {
    let skip = false

    //Don't move the block, if the 'road' is blocked (fix down & right)
    for (let n in takenTiles) {
      switch (direction) {
        case "right":
          if (takenTiles[i] + 1 == takenTiles[n]) skip = true
          break
        case "left":
          if (takenTiles[i] - 1 == takenTiles[n]) skip = true
          break
        case "down":
          if (takenTiles[i] + 4 == takenTiles[n]) skip = true
          break
        case "up":
          if (takenTiles[i] - 4 == takenTiles[n]) skip = true
          break
        default:
          console.log("Something went wrong")
      }
    }

    //Don't move the block, if it is on the edge
    if (
      takenTiles[i] != array[3] &&
      takenTiles[i] != array[7] &&
      takenTiles[i] != array[11] &&
      takenTiles[i] != array[15] &&
      !skip
    ) {
      let tile = playArea[takenTiles[i]].childNodes

      //Move the block by 1 (for now) in the correct direction
      switch (direction) {
        case "right":
          playArea[takenTiles[i] + 1].appendChild(tile[0])
          takenTiles[i]++
          break
        case "left":
          playArea[takenTiles[i] - 1].appendChild(tile[0])
          takenTiles[i]--
          break
        case "down":
          playArea[takenTiles[i] + 4].appendChild(tile[0])
          takenTiles[i] += 4
          break
        case "up":
          playArea[takenTiles[i] - 4].appendChild(tile[0])
          takenTiles[i] -= 4
          break
        default:
          console.log("Something went wrong")
      }
    }
  }

  createBlock()
}

//New game
reset.onclick = () => {
  console.clear() //Delete later
  clearCanvas()
  start()
}

//On keyboard
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    moveBlock("left", left)
    console.log("Go left boi")
  } else if (event.key == "ArrowRight") {
    moveBlock("right", right)
    console.log("Go right boi")
  } else if (event.key == "ArrowDown") {
    moveBlock("down", down)
    console.log("Go down boi")
  } else if (event.key == "ArrowUp") {
    moveBlock("up", up)
    console.log("Go up boi")
  }
})

//Game logic
start()
