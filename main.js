import "./style.css";

class Game {
  constructor() {
    this.userGuess = document.getElementById("your-guess");
    this.guessResult = document.getElementById("guess-result");
    this.myscore = document.getElementById("myscore");
    this.schem = document.getElementById("your-try-schem");
    this.restartButton = document.getElementById("restart");
    this.attemptCount = 0;
    this.score = 0;
    this.guessMarkers = [];
    this.targetNumber = null;
  }

  startGame() {
    this.targetNumber = this.getRandomNumber(0, 500);
    this.playGuessing(this.targetNumber);
  }

  // Generate a random number within a range
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Validate the user's input
  isValidNumber(number) {
    return !Number.isNaN(number) && number >= 0 && number <= 500;
  }

  playGuessing(targetNumber) {
    const userChoiceSubmit = document.getElementById("user-choice-submit");

    // Gestionnaire d'événements pour la touche "Enter" dans l'input
    this.userGuess.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.submitGuess(this.targetNumber);
      }
    });

    userChoiceSubmit?.addEventListener("click", () => {
      this.submitGuess(this.targetNumber);
      // @ts-ignore
    });
  }
  submitGuess(targetNumber) {
    let userGuessValue = this.userGuess.value;

    // Valider la saisie de l'utilisateur
    if (!this.isValidNumber(userGuessValue)) {
      this.guessResult.innerText =
        "🛑 The entered number is invalid. It must be between 0 and 500.\n\n";
      return;
    }
    if (userGuessValue > targetNumber) {
      this.guessResult.innerText = `🔴 The entered number is **too big** than ${userGuessValue}.\n\n`;
      this.attemptCount += 1;
      this.score = this.attemptCount;
      this.myscore.innerText = this.score;
      this.schem.innerText = "🔸";
      this.addMyGuessToShem(false);

      // return playGuessing();
    }

    if (userGuessValue < targetNumber) {
      this.guessResult.innerText = `🔴 The entered number is **too small** than ${userGuessValue}.\n\n`;
      this.attemptCount += 1;
      this.score = this.attemptCount;
      this.myscore.innerText = this.score;
      this.addMyGuessToShem(false);
      console.log(targetNumber);
      // return playGuessing();
    }
    if (userGuessValue == targetNumber) {
      this.attemptCount += 1;
      this.score = this.attemptCount;
      this.myscore.innerText = this.score;
      this.guessResult.innerText = `🟢 Well done! The random number was indeed ${userGuessValue}. 
        ✨ You succeeded in ${this.attemptCount} attempts.`;
      this.addMyGuessToShem(true);
      this.restartButton.addEventListener("click", () => {
        this.restartGame();
      });
      this.restartButton?.classList.remove("hidden");
      // Désactiver l'input et le bouton submit
      this.userGuess.disabled = true;
      document.getElementById("user-choice-submit").disabled = true;
    }
    this.userGuess.value = "";
    // Remettre input vide
  }

  addMyGuessToShem(boolean) {
    const widthSchem = this.schem?.getBoundingClientRect().width;
    // Position de la supposition sur le schéma en fonction de la largeur du schéma
    const positionOnSchem = (this.userGuess.value / 500) * (widthSchem - 25);

    // Créer un élément span pour représenter la supposition sur le schéma
    const guessMarker = document.createElement("span");
    guessMarker.style.position = "absolute";
    guessMarker.style.bottom = "40%";
    guessMarker.style.left = `${positionOnSchem}px`;

    // Utiliser ✅ pour une réponse correcte et 🔸 pour une réponse incorrecte
    guessMarker.innerText = boolean === true ? "✅" : "🔸";

    // Ajouter l'élément au schéma
    this.schem?.appendChild(guessMarker);
    this.guessMarkers.push(guessMarker); // Ajouter le marqueur à la liste

    this.renderGuesses();
  }
  renderGuesses() {
    // Effacer le contenu actuel du schéma
    this.schem.innerHTML = "";

    // Ajouter tous les marqueurs de supposition au schéma
    this.guessMarkers.forEach((guessMarker) => {
      this.schem?.appendChild(guessMarker);
    });
  }

  restartGame() {
    this.startGame();
    // Résactiver l'input et le bouton submit
    this.userGuess.disabled = false;
    document.getElementById("user-choice-submit").disabled = false;
    this.attemptCount = 0;
    this.score = 0;
    this.guessMarkers = [];
    this.myscore.innerText = this.score;
    this.guessResult.innerText = ``;
    this.renderGuesses();
    this.restartButton?.classList.add("hidden");
  }
}

// Démarrer une partie page load game
const startButton = document.getElementById("button-start");
const starterPage = document.getElementById("starter-page");
const gamePage = document.getElementById("game-page");
startButton?.addEventListener("click", () => {
  starterPage?.classList.add("hidden");
  gamePage?.classList.remove("hidden");
  const game = new Game();
  game.startGame();
});
