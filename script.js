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

// Across industries
let currentIndex = 0;

const track = document.getElementById("vaiTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function getConfig() {
  const w = window.innerWidth;
  // visible full cards (not counting the half-peeks on each side)
  let visible, peek, gap;
  if (w <= 767) {
    visible = 1;
    peek = 30;
    gap = 12;
  } else if (w <= 1024) {
    visible = 2;
    peek = 50;
    gap = 16;
  } else {
    visible = 4;
    peek = 80;
    gap = 20;
  }
  return { visible, peek, gap };
}

function setCardWidths() {
  const { visible, peek, gap } = getConfig();
  const sectionW = document.getElementById("vaiSection").offsetWidth;
  // total width available for full cards = section width - 2*peek - gaps between all visible+partial cards
  const cardW = (sectionW - 2 * peek - (visible + 1) * gap) / visible;
  document.querySelectorAll(".vai-card").forEach((c) => {
    c.style.flex = `0 0 ${cardW}px`;
  });
  return { cardW, gap, peek };
}

function updateSlider() {
  const { cardW, gap, peek } = setCardWidths();
  const total = track.querySelectorAll(".vai-card").length;
  const { visible } = getConfig();
  const maxIndex = Math.max(0, total - visible);

  currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

  // offset: each step moves one card width + gap
  // initial padding is peek, so offset starts from 0
  const offset = currentIndex * (cardW + gap);
  track.style.transform = `translateX(-${offset}px)`;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= maxIndex;
}

function slide(dir) {
  const total = track.querySelectorAll(".vai-card").length;
  const { visible } = getConfig();
  const maxIndex = Math.max(0, total - visible);
  currentIndex = Math.max(0, Math.min(currentIndex + dir, maxIndex));
  updateSlider();
}

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    currentIndex = 0;
    updateSlider();
  }, 120);
});

// Wait for fonts/layout then init
window.addEventListener("load", updateSlider);
updateSlider();

// manufacturering process
const steps = [
  {
    label: "Raw Material",
    title: "High-Grade Raw Material Selection",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    bullets: ["PE100 grade material", "Optimal molecular weight distribution"],
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    ],
  },
  {
    label: "Extrusion",
    title: "High-Precision Extrusion Process",
    desc: "The HDPE compound is melted and forced through a precision die to form a continuous pipe profile with consistent wall thickness.",
    bullets: [
      "Temperature-controlled barrel zones",
      "Consistent melt pressure monitoring",
    ],
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80",
    ],
  },
  {
    label: "Cooling",
    title: "Controlled Cooling & Calibration",
    desc: "Rapid controlled cooling locks in the pipe dimensions and crystalline structure for maximum strength and durability.",
    bullets: [
      "Water bath cooling system",
      "Controlled cooling rate for stress relief",
    ],
    images: [
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
  },
  {
    label: "Sizing",
    title: "Precise Diameter Sizing",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    bullets: ["Vacuum tank pressure control", "Laser diameter measurement"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=70",
    ],
  },
  {
    label: "Quality Control",
    title: "Rigorous Quality Inspection",
    desc: "Every pipe undergoes comprehensive testing including hydrostatic pressure tests, dimensional checks, and material verification.",
    bullets: [
      "Hydrostatic pressure testing",
      "Dimensional accuracy verification",
    ],
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=70",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=70",
    ],
  },
  {
    label: "Marking",
    title: "Permanent Product Marking",
    desc: "Each pipe is permanently marked with product specifications, manufacturing date, certifications, and traceability codes.",
    bullets: ["Inkjet printing system", "ISO-compliant marking standards"],
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=70",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=70",
    ],
  },
  {
    label: "Cutting",
    title: "Precision Length Cutting",
    desc: "Automated cutting systems ensure each pipe is cut to exact specified lengths with clean, square ends ready for installation.",
    bullets: ["Automated length measurement", "Burr-free cutting technology"],
    images: [
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=70",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=70",
    ],
  },
  {
    label: "Packaging",
    title: "Safe & Efficient Packaging",
    desc: "Finished pipes are bundled, wrapped, and labelled for safe transport and storage, ensuring they arrive in perfect condition.",
    bullets: ["UV-protective wrapping", "Bundle strapping for safe transport"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=70",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=65",
    ],
  },
];

let currentStep = 0;
let currentImg = 0;

function goToStep(idx) {
  currentStep = idx;
  currentImg = 0;
  renderStep();
}

function prevStep() {
  if (currentStep > 0) goToStep(currentStep - 1);
}

function nextStep() {
  if (currentStep < steps.length - 1) goToStep(currentStep + 1);
}

function prevImg() {
  const imgs = steps[currentStep].images;
  currentImg = (currentImg - 1 + imgs.length) % imgs.length;
  document.getElementById("stepImg").src = imgs[currentImg];
}

function nextImg() {
  const imgs = steps[currentStep].images;
  currentImg = (currentImg + 1) % imgs.length;
  document.getElementById("stepImg").src = imgs[currentImg];
}

function renderStep() {
  const s = steps[currentStep];

  // Update tab buttons
  document.querySelectorAll(".mfg-tab-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === currentStep);
  });

  // Scroll active tab into view
  const activeTab = document.querySelectorAll(".mfg-tab-btn")[currentStep];
  if (activeTab)
    activeTab.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

  // Update badge
  document.getElementById("stepBadge").textContent =
    `Step ${currentStep + 1}/${steps.length}: ${s.label}`;

  // Update text
  document.getElementById("stepTitle").textContent = s.title;
  document.getElementById("stepDesc").textContent = s.desc;

  // Update bullets
  const ul = document.getElementById("stepBullets");
  ul.innerHTML = s.bullets.map((b) => `<li>${b}</li>`).join("");

  // Update image
  const img = document.getElementById("stepImg");
  img.style.opacity = "0";
  setTimeout(() => {
    img.src = s.images[0];
    img.style.opacity = "1";
  }, 140);

  // Update bottom nav buttons
  document.getElementById("prevStepBtn").disabled = currentStep === 0;
  document.getElementById("nextStepBtn").disabled =
    currentStep === steps.length - 1;
}

document.getElementById("stepImg").style.transition = "opacity 0.14s ease";

// Init
renderStep();

// proven Results

(() => {
  let tprOffset = 0;
  let tprIsDown = false;
  let tprStartX = 0;
  let tprScrollLeft = 0;

  const tprTrack = document.getElementById("tprTrack");
  const tprSection = document.getElementById("tprSection");

  /* ── Calculate card width dynamically ── */
  function tprGetConfig() {
    const w = window.innerWidth;
    let visible, gap, padding;
    if (w <= 767) {
      visible = 1.15;
      gap = 14;
      padding = 20;
    } else if (w <= 1024) {
      visible = 2.15;
      gap = 16;
      padding = 40;
    } else {
      visible = 3.85;
      gap = 20;
      padding = 100;
    }
    return { visible, gap, padding };
  }

  function tprSetCardWidths() {
    const { visible, gap, padding } = tprGetConfig();
    const sectionW = tprSection.offsetWidth;
    const cardW =
      (sectionW - 2 * padding - Math.floor(visible) * gap) / visible;
    document.querySelectorAll(".tpr-card").forEach((c) => {
      c.style.flex = `0 0 ${cardW}px`;
    });
    return { cardW, gap, padding };
  }

  function tprGetCards() {
    return document.querySelectorAll(".tpr-card");
  }

  function tprGetMaxOffset() {
    const { cardW, gap } = tprSetCardWidths();
    const total = tprGetCards().length;
    const { visible } = tprGetConfig();
    return Math.max(0, (total - Math.floor(visible)) * (cardW + gap));
  }

  function tprApplyOffset(val) {
    tprOffset = Math.max(0, Math.min(val, tprGetMaxOffset()));
    tprTrack.style.transform = `translateX(-${tprOffset}px)`;
    tprTrack.style.transition = "transform 0.35s cubic-bezier(0.4,0,0.2,1)";
  }

  /* Mouse drag */
  tprTrack.addEventListener("mousedown", (e) => {
    tprIsDown = true;
    tprStartX = e.pageX;
    tprScrollLeft = tprOffset;
    tprTrack.style.cursor = "grabbing";
    tprTrack.style.transition = "none";
  });
  document.addEventListener("mouseup", () => {
    if (!tprIsDown) return;
    tprIsDown = false;
    tprTrack.style.cursor = "";
    tprSnapToCard();
  });
  document.addEventListener("mousemove", (e) => {
    if (!tprIsDown) return;
    const dx = e.pageX - tprStartX;
    tprOffset = tprScrollLeft - dx;
    tprOffset = Math.max(0, Math.min(tprOffset, tprGetMaxOffset()));
    tprTrack.style.transform = `translateX(-${tprOffset}px)`;
  });

  /* Touch drag */
  tprTrack.addEventListener(
    "touchstart",
    (e) => {
      tprStartX = e.touches[0].pageX;
      tprScrollLeft = tprOffset;
      tprTrack.style.transition = "none";
    },
    { passive: true },
  );
  tprTrack.addEventListener(
    "touchmove",
    (e) => {
      const dx = e.touches[0].pageX - tprStartX;
      tprOffset = tprScrollLeft - dx;
      tprOffset = Math.max(0, Math.min(tprOffset, tprGetMaxOffset()));
      tprTrack.style.transform = `translateX(-${tprOffset}px)`;
    },
    { passive: true },
  );
  tprTrack.addEventListener("touchend", tprSnapToCard);

  function tprSnapToCard() {
    const { cardW, gap } = tprSetCardWidths();
    const step = cardW + gap;
    const nearest = Math.round(tprOffset / step) * step;
    tprApplyOffset(nearest);
  }

  /* Resize */
  let tprResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(tprResizeTimer);
    tprResizeTimer = setTimeout(() => {
      tprOffset = 0;
      tprSetCardWidths();
      tprTrack.style.transform = "translateX(0)";
    }, 120);
  });

  /* Init */
  window.addEventListener("load", () => {
    tprSetCardWidths();
  });
  tprSetCardWidths();
})();
