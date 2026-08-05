const choiceArea = document.querySelector("#choice-area");
const noButton = document.querySelector("#no-button");
const yesButton = document.querySelector("#yes-button");
const feedback = document.querySelector("#feedback");
const confettiLayer = document.querySelector("#confetti-layer");

const noMessages = [
  "ok ya, di que sí 🥰",
  "ese botón no quiere colaborar 😭",
  "el no está en modo difícil",
  "inténtalo otra vez, cobarde xd",
];

let noAttempts = 0;
let lastPosition = { left: -1, top: -1 };
let yesClicks = 0;
const explosionAt = 5;

function moveNoButton() {
  const areaWidth = choiceArea.clientWidth;
  const areaHeight = choiceArea.clientHeight;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const baseLeft = noButton.offsetLeft;
  const baseTop = noButton.offsetTop;
  const maxLeft = Math.max(baseLeft, areaWidth - buttonWidth - 8);
  const maxTop = Math.max(baseTop, areaHeight - buttonHeight - 8);
  let left = baseLeft;
  let top = baseTop;

  for (let attempt = 0; attempt < 20; attempt += 1) {
    left = Math.round(baseLeft + Math.random() * (maxLeft - baseLeft));
    top = Math.round(baseTop + Math.random() * (maxTop - baseTop));
    const movedEnough =
      Math.abs(left - lastPosition.left) > 22 || Math.abs(top - lastPosition.top) > 14;

    if (movedEnough) break;
  }

  lastPosition = { left, top };

  noButton.style.transform = `translate(${left - baseLeft}px, ${top - baseTop}px)`;
  feedback.textContent = noMessages[noAttempts % noMessages.length];
  noAttempts += 1;
}

function dodge(event) {
  event.preventDefault();
  moveNoButton();
}

noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("pointerdown", dodge);
noButton.addEventListener("touchstart", dodge, { passive: false });
noButton.addEventListener("click", dodge);

function launchConfetti(pieceCount = 42) {
  const buttonRect = yesButton.getBoundingClientRect();
  const colors = ["#5d5af1", "#3937b7", "#f5d96f", "#f7f8ee", "#15213e"];
  const originX = buttonRect.left + buttonRect.width / 2;
  const originY = buttonRect.top + buttonRect.height / 2;

  for (let index = 0; index < pieceCount; index += 1) {
    const piece = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 130;
    const isRound = Math.random() > 0.72;

    piece.className = `confetti-piece${isRound ? " is-round" : ""}`;
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    piece.style.setProperty("--rotation", `${Math.round(Math.random() * 720 - 360)}deg`);
    piece.style.setProperty("--duration", `${650 + Math.round(Math.random() * 350)}ms`);
    confettiLayer.append(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

function handleYesClick() {
  yesClicks += 1;

  if (yesClicks < explosionAt) {
    yesButton.style.setProperty("--yes-scale", `${1 + yesClicks * 0.17}`);
    launchConfetti(24 + yesClicks * 4);
    return;
  }

  yesButton.classList.add("is-exploding");
  launchConfetti(90);

  window.setTimeout(() => {
    yesClicks = 0;
    yesButton.classList.remove("is-exploding");
    yesButton.style.setProperty("--yes-scale", "1");
  }, 650);
}

yesButton.addEventListener("click", handleYesClick);
