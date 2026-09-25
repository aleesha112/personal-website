// 1) Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// 2) Dark / light theme toggle
const themeBtn = document.getElementById("theme-btn");
const root = document.documentElement;
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

// 3) Rotating role text (fade effect, no typing/cursor)
const roles = [
  "Remote Sensing Student",
  "GIS Enthusiast",
  "Aspiring Web GIS Developer",
  "Freelancer in the Making"
];
const typingEl = document.getElementById("typing");
let roleIndex = 0;
function showRole() {
  typingEl.classList.add("fade-out");
  setTimeout(() => {
    typingEl.textContent = roles[roleIndex];
    typingEl.classList.remove("fade-out");
    roleIndex = (roleIndex + 1) % roles.length;
  }, 400);
}
showRole();
setInterval(showRole, 2600);

// 4) Reveal elements as they scroll into view
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// 5) Scroll features: progress bar, active nav link, back-to-top button
const progress = document.getElementById("progress");
const toTop = document.getElementById("to-top");
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrollTop / height) * 100 + "%";
  toTop.classList.toggle("show", scrollTop > 500);

  let current = "";
  sections.forEach((sec) => {
    if (scrollTop >= sec.offsetTop - 160) current = sec.id;
  });
  links.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));