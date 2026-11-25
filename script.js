function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Underline the nav link of the section currently on screen
const sectionIds = ["profile", "about", "experience", "tools", "projects", "contact"];

function updateActiveLink() {
  let current = sectionIds[0];
  const offset = 140;
  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= offset) current = id;
  });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
    current = "contact";
  }
  document
    .querySelectorAll("#desktop-nav a, .menu-links a")
    .forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
updateActiveLink();

// Fade sections in when they enter the screen and out when they leave
const animSections = document.querySelectorAll("section");
let lastScrollY = window.scrollY;
let scrollingDown = true;

window.addEventListener(
  "scroll",
  () => {
    scrollingDown = window.scrollY >= lastScrollY;
    lastScrollY = window.scrollY;
  },
  { passive: true }
);

animSections.forEach((section) => {
  Array.from(section.children).forEach((child, i) => {
    child.style.setProperty("--i", i);
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add("visible");
      } else {
        el.classList.remove("visible");
        el.classList.toggle("out-up", scrollingDown);
        el.classList.toggle("out-down", !scrollingDown);
      }
    });
  },
  { threshold: 0.12, rootMargin: "-112px 0px 0px 0px" }
);

animSections.forEach((section) => sectionObserver.observe(section));