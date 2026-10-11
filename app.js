const timeElement = document.getElementById("current-time");

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  timeElement.textContent = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 1000);

const navButtons = document.querySelectorAll(".nav-btn");
const views = {
  "messages-view": document.getElementById("messages-view"),
  "chat-view": document.getElementById("chat-view"),
  "activity-view": document.getElementById("activity-view"),
  "settings-view": document.getElementById("settings-view")
};

function showView(viewName) {
  Object.keys(views).forEach((key) => {
    views[key].classList.add("hidden");
  });

  if (views[viewName]) {
    views[viewName].classList.remove("hidden");
  }
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const target = button.dataset.view;
    if (target) {
      showView(target);
    }
  });
});

const messageItems = document.querySelectorAll(".message-item");
const chatContact = document.getElementById("chat-contact");
const backBtn = document.getElementById("back-btn");

messageItems.forEach((item) => {
  item.addEventListener("click", () => {
    messageItems.forEach((msg) => msg.classList.remove("active"));
    item.classList.add("active");

    const name = item.dataset.contact;
    chatContact.textContent = name;

    showView("chat-view");
  });
});

backBtn.addEventListener("click", () => {
  showView("messages-view");
  navButtons.forEach((btn) => btn.classList.remove("active"));
  navButtons[0].classList.add("active");
});
