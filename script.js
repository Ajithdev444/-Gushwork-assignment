// Desktop dropdown
function toggleDropdown(id) {
  const item = document.getElementById(id);
  item.classList.toggle("open");
}

// Close desktop dropdown on outside click
document.addEventListener("click", (e) => {
  const item = document.getElementById("productsItem");
  if (!item.contains(e.target)) item.classList.remove("open");
});

// Mobile menu
function toggleMobile() {
  const menu = document.getElementById("mobileMenu");
  const burger = document.getElementById("hamburger");
  menu.classList.toggle("open");
  burger.classList.toggle("open");
}

// Mobile products dropdown
function toggleMobDropdown() {
  const dd = document.getElementById("mobProductsDropdown");
  const btn = document.getElementById("mobProductsBtn");
  dd.classList.toggle("open");
  btn.querySelector(".caret").style.transform = dd.classList.contains("open")
    ? "rotate(180deg)"
    : "";
}
// Hero section
const images = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=70",
];
let current = 0;
const mainImg = document.getElementById("mainImg");
const thumbs = document.querySelectorAll(".thumb");

function setImg(idx, el) {
  current = idx;
  mainImg.style.opacity = "0";
  setTimeout(() => {
    mainImg.src = images[idx];
    mainImg.style.opacity = "1";
  }, 150);
  thumbs.forEach((t) => t.classList.remove("active"));
  if (el) el.classList.add("active");
  else thumbs[idx].classList.add("active");
}

mainImg.style.transition = "opacity 0.15s ease";

function nextImg() {
  setImg((current + 1) % images.length);
}
function prevImg() {
  setImg((current - 1 + images.length) % images.length);
}

// FAQ

function toggleItem(trigger) {
  const item = trigger.closest(".accordion-item");
  const isOpen = item.classList.contains("open");
  const icon = trigger.querySelector(".accordion-icon svg");

  // Close all open items
  document.querySelectorAll(".accordion-item.open").forEach((openItem) => {
    openItem.classList.remove("open");
    openItem.querySelector(".accordion-icon svg").innerHTML =
      '<polyline points="6 9 12 15 18 9"/>';
  });

  // Open clicked item if it was closed
  if (!isOpen) {
    item.classList.add("open");
    icon.innerHTML = '<polyline points="18 15 12 9 6 15"/>';
  }
}
