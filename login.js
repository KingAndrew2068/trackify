const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.addEventListener("keydown", function (event) {
  if (event.key === "F12") {
    event.preventDefault();
  }

  if (event.ctrlKey && event.shiftKey && event.key === "I") {
    event.preventDefault();
  }

  if (event.ctrlKey && event.shiftKey && event.key === "C") {
    event.preventDefault();
  }

  if (event.ctrlKey && event.shiftKey && event.key === "J") {
    event.preventDefault();
  }

  if (event.ctrlKey && event.key === "U") {
    event.preventDefault();
  }
});

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});
