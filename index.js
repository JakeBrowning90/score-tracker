const drawSetupView = () => {
  const main = document.querySelector("main");
  const setupForm = document.createElement("form");
  setupForm.setAttribute("id", "setupForm");

  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("id", "buttonDiv");

  const instructionSpan = document.createElement("span");
  instructionSpan.setAttribute("id", "instructionSpan");
  instructionSpan.textContent = "Choose player count and names";

  const addPlayerButton = document.createElement("button");
  addPlayerButton.setAttribute("id", "addPlayerButton");
  addPlayerButton.textContent = "Add Player";
  addPlayerButton.addEventListener("click", (event) => {
    event.preventDefault();
    addPlayerForm();
  });

  const removePlayerButton = document.createElement("button");
  removePlayerButton.setAttribute("id", "removePlayerButton");
  removePlayerButton.textContent = "Remove Player";
  removePlayerButton.addEventListener("click", (event) => {
    event.preventDefault();
    removePlayerForm();
  });

  const startButton = document.createElement("button");
  startButton.setAttribute("id", "startButton");
  startButton.textContent = "Start Game";
  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (checkAllPlayerNames()) {
      // Render Play view
      populatePlayerList();
      clearView();
      drawPlayView();
    } else {
      // Display error message
      instructionSpan.textContent = "Enter all names or remove non-players";
      instructionSpan.setAttribute("class", "errorMessage");
    }
  });

  main.appendChild(setupForm);
  main.appendChild(buttonDiv);

  buttonDiv.appendChild(instructionSpan);
  buttonDiv.appendChild(addPlayerButton);
  buttonDiv.appendChild(removePlayerButton);
  buttonDiv.appendChild(startButton);
  addPlayerForm();
};

const drawPlayView = () => {
  const main = document.querySelector("main");
  const playDiv = document.createElement("div");
  playDiv.setAttribute("id", "playDiv");
  main.appendChild(playDiv);

  playerList.forEach((player) => {
    playDiv.appendChild(drawPlayerCard(player));
  });
};

const drawPlayerCard = (player) => {
  let playerCard = document.createElement("section");
  playerCard.setAttribute("class", "playerCard");
  playerCard.setAttribute("style", `background-color: ${player.color}`);

  let score = 0;

  let nameHeading = document.createElement("h2");
  nameHeading.textContent = player.name;
  nameHeading.setAttribute("class", "nameDisplay");

  let playerScoreDisplay = document.createElement("h2");
  playerScoreDisplay.setAttribute("class", "scoreDisplay");
  playerScoreDisplay.textContent = 0;

  let increaseScoreButton = document.createElement("button");
  increaseScoreButton.setAttribute("class", "cardButton");
  increaseScoreButton.textContent = "+";

  let decreaseScoreButton = document.createElement("button");
  decreaseScoreButton.setAttribute("class", "cardButton");
  decreaseScoreButton.textContent = "-";

  increaseScoreButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (score < 999) {
      increaseScore();
    }
  });
  decreaseScoreButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (score > -999) {
      decreaseScore();
    }
  });

  const increaseScore = () => {
    score++;
    playerScoreDisplay.textContent = score;
  };
  const decreaseScore = () => {
    score--;
    playerScoreDisplay.textContent = score;
  };

  playerCard.appendChild(decreaseScoreButton);
  playerCard.appendChild(nameHeading);
  playerCard.appendChild(playerScoreDisplay);
  playerCard.appendChild(increaseScoreButton);

  return playerCard;
};

const drawPlayerForm = () => {
  const setupForm = document.getElementById("setupForm");
  let playerNumber = setupForm.childElementCount + 1;
  const playerDiv = document.createElement("div");
  playerDiv.setAttribute("class", "playerDiv");
  const playerLabel = document.createElement("label");
  playerLabel.textContent = `Player ${playerNumber} name: `;
  const playerInput = document.createElement("input");
  playerInput.setAttribute("class", "playerInput");
  playerInput.setAttribute("maxlength", "10");

  const colorLabel = document.createElement("label");
  colorLabel.textContent = `Player color: `;

  const colorInput = document.createElement("input");
  colorInput.setAttribute("type", "color");
  colorInput.setAttribute("class", "colorInput");

  playerDiv.appendChild(playerLabel);
  playerDiv.appendChild(playerInput);
  playerDiv.appendChild(colorLabel);
  playerDiv.appendChild(colorInput);

  return playerDiv;
};

const addPlayerForm = () => {
  const setupForm = document.getElementById("setupForm");
  // Cap at 8
  if (setupForm.childElementCount < 8) {
    setupForm.appendChild(drawPlayerForm());
  }
};

const removePlayerForm = () => {
  const setupForm = document.getElementById("setupForm");
  // Floor is 1
  if (setupForm.childElementCount > 1) {
    setupForm.lastElementChild.remove();
  }
};

const checkAllPlayerNames = () => {
  const players = document.querySelectorAll("input.playerInput");
  let errCount = 0;
  players.forEach((player) => {
    if (player.value == "") {
      errCount++;
    }
  });
  if (errCount == 0) {
    return true;
  } else {
    return false;
  }
};

const populatePlayerList = () => {
  const players = document.querySelectorAll("input.playerInput");
  const colors = document.querySelectorAll("input.colorInput");
  players.forEach((player, index) => {
    playerList.push({ name: player.value, color: colors[index].value });
  });
};

const clearView = () => {
  const main = document.querySelector("main");
  while (main.firstChild) {
    main.removeChild(main.lastChild);
  }
};

const clearPlayerList = () => {
  playerList = [];
};

const resetButtonBehavior = () => {
  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearView();
    clearPlayerList();
    drawSetupView();
  });
};

let playerList = [];
resetButtonBehavior();
drawSetupView();
