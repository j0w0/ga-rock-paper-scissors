let player = {
  currentChoice: null,
  score: 0
};

let computer = {
  currentChoice: null,
  score: 0
};

const gameOptions = [ "Lapis", "Papyrus", "Scalpellus" ];

function playerChooses(choice) {
  player.currentChoice = gameOptions[choice];
}

function computerChooses() {
  const randomIndex = Math.floor(Math.random() * 3);
  computer.currentChoice = gameOptions[randomIndex];
}

function compareChoices() {
  computerChooses();
  
  if(player.currentChoice === undefined) {
    resultsAlert("NaN");
  } else if(computer.currentChoice === player.currentChoice) { // tie
    resultsAlert("tie");
  } else if(computer.currentChoice === gameOptions[0]) { // rock
    determineWinner(gameOptions[1]); // paper beats rock
  } else if(computer.currentChoice === gameOptions[1]) { // paper
    determineWinner(gameOptions[2]); // scissors beat paper
  } else if(computer.currentChoice === gameOptions[2]) { // scissors
    determineWinner(gameOptions[0]); // rock beats scissors
  }
}

function determineWinner(gameOption) {
  if(player.currentChoice === gameOption) {
    resultsAlert("player");
    player.score++;
    updateScores();
  } else {
    resultsAlert("computer");
    computer.score++;
    updateScores();
  }
}

function wordOfEncouragement() {
  const words = [ "Great job", "Awesome", "Good work", "Amazing" ];
  const random = Math.floor(Math.random() * words.length);
  return words[random];
}

function wordOfDisappointment() {
  const words = [ "Damn", "WTFFF", "Oh no", "Shit" ];
  const random = Math.floor(Math.random() * words.length);
  return words[random];
}

function resultsAlert(winner) {
  let message = null;
  
  if(winner === "player") {
    message = `<h2>${wordOfEncouragement()}, you won!</h2><p>The computer chose <strong>${computer.currentChoice}</strong> and you chose <strong>${player.currentChoice}</strong>.</p>`;
  } else if(winner === "computer") {
    message = `<h2>${wordOfDisappointment()}, the computer won!</h2><p>The computer chose <strong>${computer.currentChoice}</strong> and you chose <strong>${player.currentChoice}</strong>.</p>`;
  } else if(winner === "tie") {
    message = `<h2>It's a tie!</h2><p>Both players chose <strong>${player.currentChoice}</strong>.</p>`;
  } else if(winner === "NaN") {
    const numberOfIndexes = gameOptions.length - 1;
    message = `<p>Select a valid game option value (0-${numberOfIndexes}).</p>`;
  }
  
  const resultsContainer = document.querySelector('.results');
  resultsContainer.innerHTML = message;
  resultsContainer.classList.add('fade-in-up');
  
  setTimeout(function() {
    resultsContainer.classList.remove('fade-in-up');
  }, 500);
  
}

const gameOptionButtons = document.querySelectorAll('.game-option');

for(let i = 0; i < gameOptionButtons.length; i++) {
  let btn = gameOptionButtons[i];
  btn.addEventListener('click', function(e) {
    let choice = e.target.dataset.option;
    playerChooses(choice);
    compareChoices();
  });
}

const resetButton = document.querySelector('.new-game');
resetButton.addEventListener('click', function(e) {
  player.score = 0;
  computer.score = 0;
  updateScores();
  document.querySelector(".results").innerHTML = "<h2>Welcome!</h2><p>Make your choice below.</p>";
});

function updateScores() {
  document.querySelector(".player-score").innerText = player.score;
  document.querySelector(".computer-score").innerText = computer.score;
}
