//Variables
const undo = document.querySelector("[data-undo]")
const reset = document.querySelector("[data-reset]")

//Functions

//Onclick
undo.onclick = () => {
  console.log("Undo the ting")
}

reset.onclick = () => {
  console.log("Reset the ting")
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
