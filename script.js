// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Nav: scrolled state + mobile toggle =====
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

const onScroll = () => {
  nav.classList.toggle("nav--scrolled", window.scrollY > 40);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

navToggle.addEventListener("click", () => {
  nav.classList.toggle("nav--open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => nav.classList.remove("nav--open"))
);

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(".reveal");
const revealIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealIO.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);
revealEls.forEach((el) => revealIO.observe(el));

// ===== Animated stat counters =====
const counters = document.querySelectorAll(".stat__num");
const easeOutQuad = (t) => t * (2 - t);

const runCounter = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.round(easeOutQuad(p) * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterIO.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
counters.forEach((c) => counterIO.observe(c));

// ===== Active nav link on scroll =====
const sections = [...document.querySelectorAll("section[id]")];
const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);

const activeIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = linkFor(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => activeIO.observe(s));

// ===== Subtle parallax on hero portrait =====
const portrait = document.querySelector(".hero__portrait-frame");
if (portrait && window.matchMedia("(min-width: 941px)").matches) {
  window.addEventListener(
    "scroll",
    () => {
      const y = Math.min(window.scrollY, 600);
      portrait.style.transform = `translateY(${y * 0.05}px)`;
    },
    { passive: true }
  );
}
