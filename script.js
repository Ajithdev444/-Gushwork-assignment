// ═══════════════════════════════
// Header
// ═══════════════════════════════
(() => {
  const desktopItem = document.getElementById("desktopProducts");
  const desktopBtn = desktopItem.querySelector("button");

  window.toggleDesktopDropdown = () => {
    const isOpen = desktopItem.classList.toggle("open");
    desktopBtn.setAttribute("aria-expanded", isOpen);
  };

  document.addEventListener("click", (e) => {
    if (!desktopItem.contains(e.target)) {
      desktopItem.classList.remove("open");
      desktopBtn.setAttribute("aria-expanded", "false");
    }
  });

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  window.toggleMobile = () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  };

  const mobBtn = document.getElementById("mobProductsBtn");
  const mobDd = document.getElementById("mobProductsDropdown");

  window.toggleMobDropdown = () => {
    const isOpen = mobDd.classList.toggle("open");
    mobBtn.classList.toggle("open", isOpen);
    mobBtn.setAttribute("aria-expanded", isOpen);
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      desktopItem.classList.remove("open");
      desktopBtn.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
})();

// ═══════════════════════════════
// Hero Section Carousel
// HTML uses: id="heroImg", onclick="heroSet(idx, this)"
// ═══════════════════════════════
(() => {
  const images = [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
    "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=60",
  ];
  let current = 0;

  // HTML uses id="heroImg"
  const mainImg = document.getElementById("heroImg");
  const thumbs = document.querySelectorAll(".hero-thumb");

  if (!mainImg) return; // guard if section not on page

  mainImg.style.transition = "opacity 0.18s ease";

  function setImg(idx, el) {
    current = idx;
    mainImg.style.opacity = "0";
    setTimeout(() => {
      mainImg.src = images[idx];
      mainImg.style.opacity = "1";
    }, 140);
    thumbs.forEach((t) => t.classList.remove("active"));
    if (el) el.classList.add("active");
    else thumbs[idx]?.classList.add("active");
  }

  // HTML calls heroSet(idx, this)
  window.heroSet = function (idx, el) {
    setImg(idx, el);
  };

  // Also expose heroSetImg in case used elsewhere
  window.heroSetImg = window.heroSet;

  window.heroNext = function () {
    setImg((current + 1) % images.length);
  };
  window.heroPrev = function () {
    setImg((current - 1 + images.length) % images.length);
  };
})();

// ═══════════════════════════════
// Technical Datasheet Modal
// HTML uses: openSpecModal, closeSpecModal, handleOverlayClick,
//            checkModalReady, submitModal
//            id="specModal", id="modalEmail", id="modalSubmitBtn"
// ═══════════════════════════════
(() => {
  window.openSpecModal = function () {
    const modal = document.getElementById("specModal");
    if (!modal) return;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => document.getElementById("modalEmail")?.focus(), 100);
  };

  window.closeSpecModal = function () {
    const modal = document.getElementById("specModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  window.handleOverlayClick = function (e) {
    if (e.target === document.getElementById("specModal")) closeSpecModal();
  };

  window.checkModalReady = function () {
    const email = document.getElementById("modalEmail")?.value.trim() || "";
    const btn = document.getElementById("modalSubmitBtn");
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    btn?.classList.toggle("ready", valid);
  };

  window.submitModal = function () {
    const email = document.getElementById("modalEmail")?.value.trim() || "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    closeSpecModal();
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSpecModal();
  });
})();

// ═══════════════════════════════
// Built to Last – Request a Quote Modal
// HTML uses: btlOpenModal, btlCloseModal, btlOverlayClick, btlSubmitModal
//            id="btlModal"
// ═══════════════════════════════
(() => {
  window.btlOpenModal = function () {
    // HTML has duplicate btlModal ids — get the first valid one
    const modal = document.getElementById("btlModal");
    if (!modal) return;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.btlCloseModal = function () {
    const modal = document.getElementById("btlModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  window.btlOverlayClick = function (e) {
    if (e.target === document.getElementById("btlModal")) btlCloseModal();
  };

  window.btlSubmitModal = function () {
    btlCloseModal();
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") btlCloseModal();
  });
})();

// ═══════════════════════════════
// FAQ Accordion
// HTML uses: onclick="toggleItem(this)"
// ═══════════════════════════════
window.toggleItem = function (trigger) {
  const item = trigger.closest(".accordion-item");
  const isOpen = item.classList.contains("open");
  const icon = trigger.querySelector(".accordion-icon svg");

  document.querySelectorAll(".accordion-item.open").forEach((openItem) => {
    openItem.classList.remove("open");
    openItem.querySelector(".accordion-icon svg").innerHTML =
      '<polyline points="6 9 12 15 18 9"/>';
  });

  if (!isOpen) {
    item.classList.add("open");
    icon.innerHTML = '<polyline points="18 15 12 9 6 15"/>';
  }
};

// ═══════════════════════════════
// Across Industries Slider
// HTML uses: id="vaiSection", id="vaiTrack", id="prevBtn", id="nextBtn"
//            onclick="slide(-1)", onclick="slide(1)"
// ═══════════════════════════════
(() => {
  const track = document.getElementById("vaiTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const section = document.getElementById("vaiSection");

  if (!track || !section) return;

  let currentIndex = 0;

  function getConfig() {
    const w = window.innerWidth;
    if (w <= 767) return { visible: 1, peek: 30, gap: 12 };
    if (w <= 1024) return { visible: 2, peek: 50, gap: 16 };
    return { visible: 4, peek: 80, gap: 20 };
  }

  function setCardWidths() {
    const { visible, peek, gap } = getConfig();
    const sectionW = section.offsetWidth;
    const cardW = (sectionW - 2 * peek - (visible + 1) * gap) / visible;
    document.querySelectorAll(".vai-card").forEach((c) => {
      c.style.flex = `0 0 ${cardW}px`;
    });
    return { cardW, gap, peek };
  }

  function updateSlider() {
    const { cardW, gap } = setCardWidths();
    const total = track.querySelectorAll(".vai-card").length;
    const { visible } = getConfig();
    const maxIndex = Math.max(0, total - visible);

    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    track.style.transform = `translateX(-${currentIndex * (cardW + gap)}px)`;

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
  }

  // HTML calls slide(-1) and slide(1)
  window.slide = function (dir) {
    const total = track.querySelectorAll(".vai-card").length;
    const { visible } = getConfig();
    const maxIndex = Math.max(0, total - visible);
    currentIndex = Math.max(0, Math.min(currentIndex + dir, maxIndex));
    updateSlider();
  };

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      currentIndex = 0;
      updateSlider();
    }, 120);
  });

  window.addEventListener("load", updateSlider);
  updateSlider();
})();

// ═══════════════════════════════
// Manufacturing Process
// HTML uses: onclick="goToStep(idx)", onclick="prevStep()", onclick="nextStep()"
//            onclick="prevImg()", onclick="nextImg()"
//            id="stepImg", id="stepTitle", id="stepDesc", id="stepBullets"
//            id="stepBadge", id="prevStepBtn", id="nextStepBtn"
// ═══════════════════════════════
(() => {
  if (!document.getElementById("stepImg")) return;

  const steps = [
    {
      label: "Raw Material",
      title: "High-Grade Raw Material Selection",
      desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
      bullets: [
        "PE100 grade material",
        "Optimal molecular weight distribution",
      ],
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
      bullets: [
        "UV-protective wrapping",
        "Bundle strapping for safe transport",
      ],
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=70",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=65",
      ],
    },
  ];

  let currentStep = 0;
  let currentImg = 0;

  const stepImg = document.getElementById("stepImg");
  stepImg.style.transition = "opacity 0.14s ease";

  function renderStep() {
    const s = steps[currentStep];

    document.querySelectorAll(".mfg-tab-btn").forEach((btn, i) => {
      btn.classList.toggle("active", i === currentStep);
    });

    const activeTab = document.querySelectorAll(".mfg-tab-btn")[currentStep];
    if (activeTab)
      activeTab.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });

    const badge = document.getElementById("stepBadge");
    if (badge)
      badge.textContent = `Step ${currentStep + 1}/${steps.length}: ${s.label}`;

    const titleEl = document.getElementById("stepTitle");
    const descEl = document.getElementById("stepDesc");
    const ulEl = document.getElementById("stepBullets");
    if (titleEl) titleEl.textContent = s.title;
    if (descEl) descEl.textContent = s.desc;
    if (ulEl) ulEl.innerHTML = s.bullets.map((b) => `<li>${b}</li>`).join("");

    stepImg.style.opacity = "0";
    setTimeout(() => {
      stepImg.src = s.images[0];
      stepImg.style.opacity = "1";
    }, 140);

    const prevStepBtn = document.getElementById("prevStepBtn");
    const nextStepBtn = document.getElementById("nextStepBtn");
    if (prevStepBtn) prevStepBtn.disabled = currentStep === 0;
    if (nextStepBtn) nextStepBtn.disabled = currentStep === steps.length - 1;
  }

  window.goToStep = function (idx) {
    currentStep = idx;
    currentImg = 0;
    renderStep();
  };

  window.prevStep = function () {
    if (currentStep > 0) goToStep(currentStep - 1);
  };

  window.nextStep = function () {
    if (currentStep < steps.length - 1) goToStep(currentStep + 1);
  };

  window.prevImg = function () {
    const imgs = steps[currentStep].images;
    currentImg = (currentImg - 1 + imgs.length) % imgs.length;
    stepImg.src = imgs[currentImg];
  };

  window.nextImg = function () {
    const imgs = steps[currentStep].images;
    currentImg = (currentImg + 1) % imgs.length;
    stepImg.src = imgs[currentImg];
  };

  renderStep();
})();

// ═══════════════════════════════
// Proven Results – Drag Slider
// HTML uses: id="tprTrack", id="tprSection"
// ═══════════════════════════════
(() => {
  const tprTrack = document.getElementById("tprTrack");
  const tprSection = document.getElementById("tprSection");
  if (!tprTrack || !tprSection) return;

  let tprOffset = 0;
  let tprIsDown = false;
  let tprStartX = 0;
  let tprScrollLeft = 0;

  function tprGetConfig() {
    const w = window.innerWidth;
    if (w <= 767) return { visible: 1.15, gap: 14, padding: 20 };
    if (w <= 1024) return { visible: 2.15, gap: 16, padding: 40 };
    return { visible: 3.85, gap: 20, padding: 100 };
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

  function tprGetMaxOffset() {
    const { cardW, gap } = tprSetCardWidths();
    const total = document.querySelectorAll(".tpr-card").length;
    const { visible } = tprGetConfig();
    return Math.max(0, (total - Math.floor(visible)) * (cardW + gap));
  }

  function tprApplyOffset(val) {
    tprOffset = Math.max(0, Math.min(val, tprGetMaxOffset()));
    tprTrack.style.transform = `translateX(-${tprOffset}px)`;
    tprTrack.style.transition = "transform 0.35s cubic-bezier(0.4,0,0.2,1)";
  }

  function tprSnapToCard() {
    const { cardW, gap } = tprSetCardWidths();
    const step = cardW + gap;
    tprApplyOffset(Math.round(tprOffset / step) * step);
  }

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
    tprOffset = Math.max(
      0,
      Math.min(tprScrollLeft - (e.pageX - tprStartX), tprGetMaxOffset()),
    );
    tprTrack.style.transform = `translateX(-${tprOffset}px)`;
  });

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
      tprOffset = Math.max(
        0,
        Math.min(
          tprScrollLeft - (e.touches[0].pageX - tprStartX),
          tprGetMaxOffset(),
        ),
      );
      tprTrack.style.transform = `translateX(-${tprOffset}px)`;
    },
    { passive: true },
  );
  tprTrack.addEventListener("touchend", tprSnapToCard);

  let tprResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(tprResizeTimer);
    tprResizeTimer = setTimeout(() => {
      tprOffset = 0;
      tprSetCardWidths();
      tprTrack.style.transform = "translateX(0)";
    }, 120);
  });

  window.addEventListener("load", () => tprSetCardWidths());
  tprSetCardWidths();
})();
