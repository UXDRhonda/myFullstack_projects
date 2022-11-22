
function showName(){
  let pXname = document.getElementById("p1name").value;
  document.getElementById("display").innerText = pXname;

  let pOname = document.getElementById("p2name").value;
  document.getElementById("display2").innerText = pOname;
}

document.forms("players").addEventListener("submit", function(event) {
  this.style("display") = "none";
  event.preventDefault();
})

function hideForms() {
  let forms = document.getElementById("players");
  if (forms.style.display === "none") {
    forms.style.display = "block";
   }else {
    forms.style.display = "none";
   }
  }






const tiles = document.querySelectorAll(".tile");
const resetBtn = document.querySelector("#resetBtn");
const statusText = document.querySelector("#statusText");

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

initializeGame();

function initializeGame(){
  tiles.forEach(tile => tile.addEventListener("click", tileClicked));

  resetBtn.addEventListener("click", resetGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function tileClicked(){
  const tileIndex = this.getAttribute("tileIndex");

  if(options[tileIndex] != "" || !running){
    return;
  }
  updateTile(this, tileIndex);
  checkWinner();

}

function updateTile(tile, index){
  options[index] = currentPlayer;
  tile.textContent = currentPlayer;
}

function changePlayer(){
  currentPlayer = (currentPlayer == "X")? "O": "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
  let roundWon = false;
  for(let i = 0; i < winningConditions.length; ++i) {const condition = winningConditions[i];
  const tileA = options[condition[0]];
  const tileB = options[condition[1]];
  const tileC = options[condition[2]];
  if(tileA == "" || tileB == "" || tileC == ""){
    continue;
  }
  if(tileA == tileB && tileB == tileC){
    roundWon = true;
    break;
  }
}
if(roundWon){
  statusText.textContent = `${currentPlayer}wins!`;
  document.getElementById(currentPlayer + "-pts").innerText++
  running = false;
}else if(!options.includes("")){
  statusText.textContent = `TIE!`;
  running = false;
}else{changePlayer();}

}

function resetGame(){
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  tiles.forEach(tile => tile.textContent = "");
  running = true;

}

let scoreBoard = {X: 0, O: 0};

function updateScoreBoard(winner) {
  if(++scoreBoard[winner]==3) {
    alert("Game Over!" + winner + "won 3 matches");
  }
}

