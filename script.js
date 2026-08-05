const recipient = "ferferru2002@gmail.com";
const choiceArea = document.querySelector("#choice-area");
const noButton = document.querySelector("#no-button");
const yesButton = document.querySelector("#yes-button");
const feedback = document.querySelector("#feedback");

const noMessages = [
  "ok ya, di que sí 🥰",
  "ese botón no quiere colaborar 😭",
  "el no está en modo difícil",
  "inténtalo otra vez, cobarde xd",
];

let noAttempts = 0;
let lastPosition = { x: -1, y: -1 };

function moveNoButton() {
  const areaWidth = choiceArea.clientWidth;
  const areaHeight = choiceArea.clientHeight;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const baseX = noButton.offsetLeft;
  const baseY = noButton.offsetTop;
  const maxX = Math.max(0, areaWidth - buttonWidth - 8 - baseX);
  const maxY = Math.max(0, areaHeight - buttonHeight - 8 - baseY);
  let x = 0;
  let y = 0;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    x = Math.round(Math.random() * maxX);
    y = Math.round(Math.random() * maxY);
    if (Math.abs(x - lastPosition.x) > 28 || Math.abs(y - lastPosition.y) > 18) break;
  }

  lastPosition = { x, y };

  noButton.style.transform = `translate(${x}px, ${y}px)`;
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

yesButton.addEventListener("click", () => {
  const answeredAt = new Intl.DateTimeFormat("es", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());
  const subject = "dijo que sí 💌";
  const body = [
    "¡Sí! 💌",
    "",
    `Respondido el: ${answeredAt}`,
    "",
    "Ahora solo falta elegir la fecha de la cita. 🗓️",
  ].join("\n");

  feedback.textContent = "abriendo el email… 💌";
  feedback.classList.add("is-success");
  yesButton.textContent = "sí 💌";
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
