const recipient = "ferferru2002@gmail.com";
const form = document.querySelector("#date-form");
const dateInput = document.querySelector("#date");
const noButton = document.querySelector("#no-button");
const actions = document.querySelector("#actions");
const formMessage = document.querySelector("#form-message");

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

dateInput.min = localToday;

const noMessages = [
  "no is feeling a little shy",
  "that button has commitment issues",
  "try the other one — it is nicer",
  "the no button is running its own algorithm",
];

let noAttempts = 0;

function moveNoButton() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const maxX = Math.max(12, Math.min(120, actions.clientWidth * 0.42));
  const maxY = 30;
  const x = Math.round((Math.random() * 2 - 1) * maxX);
  const y = Math.round((Math.random() * 2 - 1) * maxY);

  noButton.style.transform = `translate(${x}px, ${y}px)`;
  formMessage.textContent = noMessages[noAttempts % noMessages.length];
  noAttempts += 1;
}

noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveNoButton();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const date = new Date(`${data.get("date")}T${data.get("time")}`);
  const readableDate = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  const readableTime = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
  const plan = data.get("plan");

  const subject = "date_request.exe says: it’s a date 💌";
  const body = [
    "Hi!",
    "",
    "I’m saying yes 💌",
    `Date: ${readableDate}`,
    `Time: ${readableTime}`,
    `Plan: ${plan}`,
    "",
    "See you then?",
  ].join("\n");

  formMessage.textContent = "opening your email app… see you on the date 💌";
  formMessage.classList.add("is-success");
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
