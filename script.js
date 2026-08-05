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

function moveNoButton() {
  const areaWidth = choiceArea.clientWidth;
  const areaHeight = choiceArea.clientHeight;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const maxX = Math.max(0, areaWidth - buttonWidth - 4);
  const maxY = Math.max(0, areaHeight - buttonHeight - 4);
  const x = Math.round(Math.random() * maxX);
  const y = Math.round(Math.random() * maxY);

  noButton.style.transform = `translate(${x - 15}px, ${y - 4}px)`;
  feedback.textContent = noMessages[noAttempts % noMessages.length];
  noAttempts += 1;
}

noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveNoButton();
});

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
