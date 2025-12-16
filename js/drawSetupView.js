export function drawSetupView() {
  const main = document.querySelector("main");
  const setupForm = document.createElement("form");

  const addPlayerButton = document.createElement("button");
  addPlayerButton.textContent = "Add Player";

  const removePlayerButton = document.createElement("button");
  removePlayerButton.textContent = "Remove Player";

  const startButton = document.createElement("button");
  startButton.textContent = "Start Game";

  main.appendChild(setupForm);
  main.appendChild(addPlayerButton);
  main.appendChild(removePlayerButton);
  main.appendChild(startButton);
}

// export { drawSetupView };
