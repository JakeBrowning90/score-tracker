// import { drawSetupView } from "./js/drawSetupView";

const drawSetupView = () => {
  const main = document.querySelector("main");
  const setupForm = document.createElement("form");
  setupForm.setAttribute("id", "setupForm");

  const addPlayerButton = document.createElement("button");
  addPlayerButton.textContent = "Add Player";

  addPlayerButton.addEventListener("click", (event) => {
    event.preventDefault();
    addPlayerForm();
  });

  const removePlayerButton = document.createElement("button");
  removePlayerButton.textContent = "Remove Player";

  removePlayerButton.addEventListener("click", (event) => {
    event.preventDefault();
    removePlayerForm();
  });

  const startButton = document.createElement("button");
  startButton.textContent = "Start Game";
  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    // TO-DO: Set list of players for drawing Play View
    if (checkAllPlayerNames()) {
      populatePlayerList();
      clearView();
      drawPlayView();
    }
    // else {
    //     display error message about missing name
    // }
  });

  main.appendChild(setupForm);
  main.appendChild(addPlayerButton);
  main.appendChild(removePlayerButton);
  main.appendChild(startButton);
  addPlayerForm();
};

const drawPlayView = () => {
  const main = document.querySelector("main");
  const playDiv = document.createElement("div");

  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearView();
    clearPlayerList();
    drawSetupView();
  });

  main.appendChild(resetButton);
  main.appendChild(playDiv);

  playerList.forEach((player) => {
    playDiv.appendChild(drawPlayerCard(player));
  });
};

const drawPlayerCard = (player) => {
  let playerCard = document.createElement("section");
  playerCard.setAttribute("class", "playerCard");
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
    increaseScore();
  });
  decreaseScoreButton.addEventListener("click", (event) => {
    event.preventDefault();
    decreaseScore();
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
  const playerLabel = document.createElement("label");
  playerLabel.textContent = `Player ${playerNumber} name: `;

  const playerInput = document.createElement("input");
  playerDiv.appendChild(playerLabel);
  playerDiv.appendChild(playerInput);
  return playerDiv;
};

const clearView = () => {
  const main = document.querySelector("main");
  while (main.firstChild) {
    main.removeChild(main.lastChild);
  }
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
  if (setupForm.childElementCount > 1) {
    setupForm.lastElementChild.remove();
  }
};

const checkAllPlayerNames = () => {
  const players = document.querySelectorAll("input");
  console.log(players);
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
  const players = document.querySelectorAll("input");
  // TO-DO: include color selection
  players.forEach((player) => {
    playerList.push({ name: player.value });
  });
};

const clearPlayerList = () => {
  playerList = [];
};

let playerList = [];
drawSetupView();
