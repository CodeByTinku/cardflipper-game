// Card values (pairs)
const cardValues = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  matchedCount = 0;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  const shuffled = shuffle([...cardValues]);
  shuffled.forEach((val, idx) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = val;
    card.dataset.flipped = "false";
    card.addEventListener("click", handleCardClick);
    card.textContent = "";
    grid.appendChild(card);
  });
}

function handleCardClick(e) {
  const card = e.currentTarget;
  if (lockBoard || card.dataset.flipped === "true" || card === firstCard)
    return;
  card.textContent = card.dataset.value;
  card.dataset.flipped = "true";
  if (!firstCard) {
    firstCard = card;
    return;
  }
  secondCard = card;
  lockBoard = true;
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedCount += 2;
    resetTurn();
    if (matchedCount === cardValues.length) {
      setTimeout(() => alert("Congratulations! You matched all cards!"), 300);
    }
  } else {
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.dataset.flipped = "false";
      secondCard.dataset.flipped = "false";
      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

window.onload = createBoard;
