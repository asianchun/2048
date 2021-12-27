//Variables
const reset = document.querySelector("[data-reset]")
const playArea = document.querySelectorAll(".play-area")
const score = document.querySelector(".score")
const progression = [
  "two",
  "four",
  "eight",
  "sixteen",
  "thirty-two",
  "sixty-four",
  "one-two-eight",
  "two-five-six",
  "five-one-two",
  "one-thousand-two-four",
  "two-thousand-four-eight",
]
const numericProgression = [
  "2", //0
  "4", //1
  "8", //2
  "16", //3
  "32", //4
  "64", //5
  "128", //6
  "256", //7
  "512", //8
  "1024", //9
  "2048", //10
]
const right = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const left = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const down = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15]
const up = [15, 11, 7, 3, 14, 10, 6, 2, 13, 9, 5, 1, 12, 8, 4, 0]
let takenTiles = []
let gameOver = []
let success = false
let iteration = 0

//Functions
let start = () => {
  for (let i = 0; i < 2; i++) {
    createBlock()
  }
}

function checkGameOver(direction) {
  let count = true

  if (takenTiles.length == playArea.length) {
    gameOver.forEach((item) => {
      if (item == direction) count = false
    })

    if (count) gameOver.push(direction)

    if (gameOver.length == 4) score.innerText = "You done out here!"
  }
}

function clearCanvas() {
  takenTiles = []
  gameOver = []
  lose = false
  score.innerText = "Good luck!"

  for (let area of playArea) {
    let block = area.children

    if (block.length != 0) block[0].remove()
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

    for (let tile of takenTiles) {
      if (tile == randomNumber) exit = false
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

//TODO: DEBUGGGGG
function combineBlock(direction) {
  /*
   * Left will use right, up will use down and vice versa
   * This is the only way to combine properly
   */
  switch (direction) {
    case "right":
      console.log("blocks combined right")
      break
    case "left":
      for (let i = 0; i < right.length; i++) {
        if (i == right.length - 1) break

        let block = playArea[right[i]].children
        let nextBlock = playArea[right[i + 1]].children
        let index = 0

        if (block.length != 0 && nextBlock.length != 0) {
          if (block[0].classList.item(2) == nextBlock[0].classList.item(2)) {
            for (let i = 0; i < progression.length; i++) {
              if (progression[i] == block[0].classList.item(2)) index = i
            }

            block[0].innerText = numericProgression[index + 1]
            block[0].classList.replace(
              progression[index],
              progression[index + 1]
            )
            nextBlock[0].remove()
          }
        }
      }

      // * Need this -> ar[3] || ar[7] || ar[11] || ar[15]
      break
    case "down":
      console.log("blocks combined down")
      break
    case "up":
      console.log("blocks combined up")
      break
    default:
      console.log("Something went wrong")
  }
}

function countIterations(ar, i, n, spread, operator) {
  /*
   * Because up & down movements are 4 apart, it created
   * an issue where all the blocks would get put in the top row
   * i.e. (0,4,7,8) -> iteration 2; expected 0
   * Hence, success attribute was created to prevent it
   */
  //Count the left and up movement
  if (operator == "-") {
    if (
      takenTiles[i] - 3 * spread == takenTiles[n] ||
      takenTiles[i] == ar[1] ||
      takenTiles[i] == ar[5] ||
      takenTiles[i] == ar[9] ||
      takenTiles[i] == ar[13]
    ) {
      if (spread == 1) {
        iteration = 2
      } else if (spread == 4) {
        if (takenTiles[i] - 3 * spread == takenTiles[n]) {
          iteration = 2
          success = true
        } else if (!success) {
          iteration = 2
        }
      }
    }

    if (
      takenTiles[i] - 2 * spread == takenTiles[n] ||
      takenTiles[i] == ar[2] ||
      takenTiles[i] == ar[6] ||
      takenTiles[i] == ar[10] ||
      takenTiles[i] == ar[14]
    ) {
      if (spread == 1) {
        iteration = 1
      } else if (spread == 4) {
        if (takenTiles[i] - 2 * spread == takenTiles[n]) {
          iteration = 1
          success = true
        } else if (!success) {
          iteration = 1
        }
      }
    }

    if (
      takenTiles[i] - 1 * spread == takenTiles[n] ||
      takenTiles[i] == ar[3] ||
      takenTiles[i] == ar[7] ||
      takenTiles[i] == ar[11] ||
      takenTiles[i] == ar[15]
    ) {
      if (spread == 1) {
        iteration = 0
      } else if (spread == 4) {
        if (takenTiles[i] - 1 * spread == takenTiles[n]) {
          iteration = 0
          success = true
        } else if (!success) {
          iteration = 0
        }
      }
    }
  }
  //Count the right and down movement
  else if (operator == "+") {
    if (
      takenTiles[i] + 3 * spread == takenTiles[n] ||
      takenTiles[i] == ar[1] ||
      takenTiles[i] == ar[5] ||
      takenTiles[i] == ar[9] ||
      takenTiles[i] == ar[13]
    ) {
      if (spread == 1) {
        iteration = 2
      } else if (spread == 4) {
        if (takenTiles[i] + 3 * spread == takenTiles[n]) {
          iteration = 2
          success = true
        } else if (!success) {
          iteration = 2
        }
      }
    }

    if (
      takenTiles[i] + 2 * spread == takenTiles[n] ||
      takenTiles[i] == ar[2] ||
      takenTiles[i] == ar[6] ||
      takenTiles[i] == ar[10] ||
      takenTiles[i] == ar[14]
    ) {
      if (spread == 1) {
        iteration = 1
      } else if (spread == 4) {
        if (takenTiles[i] + 2 * spread == takenTiles[n]) {
          iteration = 1
          success = true
        } else if (!success) {
          iteration = 1
        }
      }
    }

    if (
      takenTiles[i] + 1 * spread == takenTiles[n] ||
      takenTiles[i] == ar[3] ||
      takenTiles[i] == ar[7] ||
      takenTiles[i] == ar[11] ||
      takenTiles[i] == ar[15]
    ) {
      if (spread == 1) {
        iteration = 0
      } else if (spread == 4) {
        if (takenTiles[i] + 1 * spread == takenTiles[n]) {
          iteration = 0
          success = true
        } else if (!success) {
          iteration = 0
        }
      }
    }
  }
}

function moveBlock(direction) {
  //Control whether new block gets created or not
  let previousState = []
  let equal = true

  //Sort the array in order to have proper movement
  if (direction == "right" || direction == "down") {
    takenTiles.sort(function (x, y) {
      return y - x
    })
  } else if (direction == "left" || direction == "up") {
    takenTiles.sort(function (x, y) {
      return x - y
    })
  }

  //Load the previous state
  for (let tile of takenTiles) {
    previousState.push(tile)
  }

  //Move each block accordingly
  for (let i in takenTiles) {
    let tile = playArea[takenTiles[i]].children
    iteration = 3
    success = false

    //Check by how much to move each block
    for (let n in takenTiles) {
      switch (direction) {
        case "right":
          if (takenTiles[i] < takenTiles[n] || i == 0)
            countIterations(right, i, n, 1, "+")
          break
        case "left":
          if (takenTiles[i] > takenTiles[n] || i == 0)
            countIterations(left, i, n, 1, "-")
          break
        case "down":
          if (takenTiles[i] < takenTiles[n] || i == 0)
            countIterations(down, i, n, 4, "+")
          break
        case "up":
          if (takenTiles[i] > takenTiles[n] || i == 0)
            countIterations(up, i, n, 4, "-")
          break
        default:
          console.log("Something went wrong")
      }
    }

    //Make the movement
    switch (direction) {
      case "right":
        playArea[takenTiles[i] + iteration].append(tile[0])
        takenTiles[i] += iteration
        break
      case "left":
        playArea[takenTiles[i] - iteration].append(tile[0])
        takenTiles[i] -= iteration
        break
      case "down":
        playArea[takenTiles[i] + 4 * iteration].append(tile[0])
        takenTiles[i] += 4 * iteration
        break
      case "up":
        playArea[takenTiles[i] - 4 * iteration].append(tile[0])
        takenTiles[i] -= 4 * iteration
        break
      default:
        console.log("Something went wrong")
    }
  }

  //TODO: Move this after combineBlock()
  //Check whether the game is over / play area is full
  checkGameOver(direction)

  //Check whether to place a new block
  takenTiles.forEach((tile, index) => {
    if (tile != previousState[index]) equal = false
  })

  if (!equal) createBlock()
}

//New game
reset.onclick = () => {
  console.clear()
  clearCanvas()
  start()
}

//On keyboard
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    moveBlock("left")
    combineBlock("left")
  } else if (event.key == "ArrowRight") {
    moveBlock("right")
  } else if (event.key == "ArrowDown") {
    moveBlock("down")
  } else if (event.key == "ArrowUp") {
    moveBlock("up")
  }
})

//Game start
start()
