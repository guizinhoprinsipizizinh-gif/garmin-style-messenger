const timeElement = document.getElementById("current-time");
const navButtons = document.querySelectorAll(".nav-btn");
const screens = {
  "watchface-screen": document.getElementById("watchface-screen"),
  "messages-screen": document.getElementById("messages-screen"),
  "chat-screen": document.getElementById("chat-screen"),
  "activity-screen": document.getElementById("activity-screen"),
  "settings-screen": document.getElementById("settings-screen")
};

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  timeElement.textContent = `${hours}:${minutes}`;
}

function updateAnalogClock() {
  const now = new Date();
  const second = now.getSeconds();
  const minute = now.getMinutes() + second / 60;
  const hour = (now.getHours() % 12) + minute / 60;

  const secondHand = document.querySelector(".hand.second");
  const minuteHand = document.querySelector(".hand.minute");
  const hourHand = document.querySelector(".hand.hour");

  secondHand.style.transform = `rotate(${second * 6}deg)`;
  minuteHand.style.transform = `rotate(${minute * 6}deg)`;
  hourHand.style.transform = `rotate(${hour * 30}deg)`;
}

function showScreen(screenName) {
  Object.keys(screens).forEach((key) => {
    screens[key].classList.remove("active");
  });

  if (screens[screenName]) {
    screens[screenName].classList.add("active");
  }
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    showScreen(button.dataset.screen);
  });
});

const messageItems = document.querySelectorAll(".message-item");
const chatContact = document.getElementById("chat-contact");
const backButton = document.getElementById("back-btn");

messageItems.forEach((item) => {
  item.addEventListener("click", () => {
    messageItems.forEach((msg) => msg.classList.remove("active"));
    item.classList.add("active");
    chatContact.textContent = item.dataset.contact;
    showScreen("chat-screen");
    navButtons.forEach((btn) => btn.classList.remove("active"));
  });
});

backButton.addEventListener("click", () => {
  showScreen("messages-screen");
  navButtons.forEach((btn) => btn.classList.remove("active"));
  const msgBtn = [...navButtons].find((btn) => btn.dataset.screen === "messages-screen");
  if (msgBtn) msgBtn.classList.add("active");
});

const input = document.querySelector(".chat-input-area input");
const sendButton = document.querySelector(".chat-input-area button");
const chatMessages = document.querySelector(".chat-messages");

sendButton.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const bubble = document.createElement("div");
  bubble.className = "bubble sent";
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  input.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});

updateClock();
updateAnalogClock();
setInterval(updateClock, 1000);
setInterval(updateAnalogClock, 1000);
