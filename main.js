function scrollToElement(elementSelector, instance = 0) {
  const elements = document.querySelectorAll(elementSelector);
  if (elements.length > instance) {
    elements[instance].scrollIntoView({ behavior: "smooth" });
  }
}

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

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener("click", () => {
  scrollToElement(".header");
});

link2.addEventListener("click", () => {
  scrollToElement(".header", 1);
});

link3.addEventListener("click", () => {
  scrollToElement(".column");
});
