(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  document.querySelectorAll("[data-scroll]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  const spyLinks = Array.from(document.querySelectorAll("[data-spy]"));
  const sections = spyLinks
    .map((link) => {
      const id = link.getAttribute("href");
      const sec = id ? document.querySelector(id) : null;
      return sec ? { link, sec } : null;
    })
    .filter(Boolean);

  function setActiveLink(activeId) {
    spyLinks.forEach((l) => l.classList.remove("is-active"));
    const active = spyLinks.find((l) => l.getAttribute("href") === activeId);
    if (active) active.classList.add("is-active");
  }

  const spyObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((en) => en.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target && visible.target.id) {
        setActiveLink("#" + visible.target.id);
      }
    },
    {
      root: null,
      threshold: [0.2, 0.35, 0.5, 0.65],
      rootMargin: "-20% 0px -55% 0px",
    }
  );

  sections.forEach(({ sec }) => spyObserver.observe(sec));

  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          revealObserver.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  const orb = document.getElementById("githubOrb");
  if (orb) {
    const url = orb.getAttribute("data-url");

    orb.addEventListener("mousedown", () => orb.classList.add("is-press"));
    orb.addEventListener("mouseup", () => orb.classList.remove("is-press"));
    orb.addEventListener("mouseleave", () => orb.classList.remove("is-press"));

    orb.addEventListener("click", () => {
      if (!url) return;
      window.open(url, "_blank", "noopener,noreferrer");
    });

    orb.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!url) return;
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  }
})();
