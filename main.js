const button = document.querySelector(".started");
const main = document.querySelector("main");
console.log(button);
button.addEventListener("click", function () {
  main.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
});
