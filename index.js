//Variables
const reset = document.querySelector("[data-reset]")
const playArea = document.querySelectorAll(".play-area")
const score = document.querySelector(".score")
const progression = [
  ".two",
  ".four",
  ".eight",
  ".sixteen",
  ".thirty-two",
  ".sixty-four",
  ".one-two-eight",
  ".two-five-six",
  ".five-one-two",
  ".one-thousand-two-four",
  ".two-thousand-four-eight",
]
const right = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const left = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
const down = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15]
const up = [15, 11, 7, 3, 14, 10, 6, 2, 13, 9, 5, 1, 12, 8, 4, 0]
let takenTiles = []
let success = false
let iteration = 0

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

//TODO: Create the ability to combine blocks using the progression
function combineBlock() {
  console.log("blocks combined")
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

function moveBlock(direction, array) {
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

  //Move each block accordingly
  for (let i in takenTiles) {
    let tile = playArea[takenTiles[i]].childNodes
    iteration = 3
    success = false

    //Check by how much to move each block
    for (let n in takenTiles) {
      switch (direction) {
        case "right":
          if (takenTiles[i] < takenTiles[n] || i == 0)
            countIterations(array, i, n, 1, "+")
          break
        case "left":
          if (takenTiles[i] > takenTiles[n] || i == 0)
            countIterations(array, i, n, 1, "-")
          break
        case "down":
          if (takenTiles[i] < takenTiles[n] || i == 0)
            countIterations(array, i, n, 4, "+")
          break
        case "up":
          if (takenTiles[i] > takenTiles[n] || i == 0)
            countIterations(array, i, n, 4, "-")
          break
        default:
          console.log("Something went wrong")
      }
    }

    //Make the movement
    switch (direction) {
      case "right":
        playArea[takenTiles[i] + iteration].appendChild(tile[0])
        takenTiles[i] += iteration
        break
      case "left":
        playArea[takenTiles[i] - iteration].appendChild(tile[0])
        takenTiles[i] -= iteration
        break
      case "down":
        playArea[takenTiles[i] + 4 * iteration].appendChild(tile[0])
        takenTiles[i] += 4 * iteration
        break
      case "up":
        playArea[takenTiles[i] - 4 * iteration].appendChild(tile[0])
        takenTiles[i] -= 4 * iteration
        break
      default:
        console.log("Something went wrong")
    }
  }

  //TODO: Don't create block if nothing changed
  createBlock()
}

//New game
//TODO: Remove the clg when the game is completed
reset.onclick = () => {
  console.clear()
  clearCanvas()
  start()
}

//On keyboard
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft") {
    moveBlock("left", left)
  } else if (event.key == "ArrowRight") {
    moveBlock("right", right)
  } else if (event.key == "ArrowDown") {
    moveBlock("down", down)
  } else if (event.key == "ArrowUp") {
    moveBlock("up", up)
  }
})

//Game logic
start()
