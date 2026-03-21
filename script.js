const dropdown = document.querySelector(".dropdown");
const button = document.querySelector(".dropbtn");

button.addEventListener("click", function (e) {
  e.stopPropagation();
  dropdown.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", function () {
  dropdown.classList.remove("active");
});
