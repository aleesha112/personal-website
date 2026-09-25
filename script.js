// ============================================================
// 1) Mobile menu toggle
// ============================================================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

// Show or hide the menu when the button is clicked
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close the mobile menu after a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ============================================================
// 2) Dark / light theme toggle (choice is saved in the browser)
// ============================================================
const themeBtn = document.getElementById("theme-btn");
const root = document.documentElement;

// Show the icon of the theme you can switch TO
function updateThemeIcon() {
  themeBtn.textContent = root.getAttribute("data-theme") === "light" ? "🌙" : "☀️";
}
updateThemeIcon();

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
  updateThemeIcon();
});

// ============================================================
// 3) Typing effect in the hero section
// ============================================================
const roles = [
  "Remote Sensing Student",
  "GIS Enthusiast",
  "Aspiring Web GIS Developer",
  "Freelancer in the Making"
];
const typingEl = document.getElementById("typing");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const word = roles[roleIndex];

  // Add or remove one letter
  charIndex += deleting ? -1 : 1;
  typingEl.textContent = word.substring(0, charIndex);

  let delay = deleting ? 45 : 90;

  if (!deleting && charIndex === word.length) {
    // Finished typing the word: wait, then start deleting
    deleting = true;
    delay = 1400;
  } else if (deleting && charIndex === 0) {
    // Finished deleting: move to the next word
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();

// ============================================================
// 4) Reveal elements and animate skill bars when they appear
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Set the bar width from its data-width attribute
      entry.target.style.width = entry.target.dataset.width;
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll(".fill").forEach((bar) => barObserver.observe(bar));

// ============================================================
// 5) Scroll features: progress bar, active link, back-to-top
// ============================================================
const progress = document.getElementById("progress");
const toTop = document.getElementById("to-top");
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  // Progress bar width = how much of the page has been scrolled
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrollTop / height) * 100 + "%";

  // Show the back-to-top button after scrolling down a bit
  toTop.classList.toggle("show", scrollTop > 500);

  // Find which section is currently at the top of the screen
  let current = "";
  sections.forEach((sec) => {
    if (scrollTop >= sec.offsetTop - 160) current = sec.id;
  });

  // Mark the matching navbar link as active
  links.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

// Scroll smoothly to the top when the button is clicked
toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});