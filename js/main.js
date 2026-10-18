/* ==========================================================
   Arjun Rana — Portfolio interactions
   ========================================================== */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Tech stack data ---------- */
  const STACK = [
    {
      title: "iOS & Apple Platforms",
      items: [
        ["", "Swift", "Modern language for iOS & macOS"],
        ["UI", "SwiftUI", "Declarative Apple UI framework"],
        ["⧉", "UIKit / Storyboard", "Traditional iOS development"],
        ["⛁", "SwiftData / Core Data", "Local data persistence"],
        ["⌖", "MapKit & Core Location", "Maps and GPS tracking"],
        ["▶", "AVFoundation", "Audio and video playback"]
      ]
    },
    {
      title: "Backend & APIs",
      items: [
        ["{}", "REST APIs", "Client-server communication"],
        ["🔥", "Firebase (FCM)", "Push notifications & auth"],
        ["⚡", "FastAPI", "Python-based API framework"],
        ["₹", "Razorpay", "Payment integration"],
        ["◔", "Mixpanel", "Product analytics"]
      ]
    },
    {
      title: "Architecture & Tools",
      items: [
        ["◫", "MVVM Architecture", "Scalable, testable design"],
        ["⬡", "CocoaPods / Swift Package Manager", "Dependency management"],
        ["⎇", "Git & GitHub", "Version control"]
      ]
    },
    {
      title: "Other",
      items: [
        ["Py", "Python", "Scripting and backend"],
        ["◐", "Figma", "UI/UX design reference"],
        ["⚒", "Xcode", "Primary IDE"]
      ]
    }
  ];

  const swiftLogo = '<span style="color:#FC8F5B">Sw</span>';

  const grid = document.getElementById("stack-grid");
  if (grid) {
    grid.innerHTML = STACK.map(function (block) {
      const rows = block.items
        .map(function (item) {
          const icon = item[0] === "" ? swiftLogo : item[0];
          return (
            '<li class="stack-item">' +
            '<span class="stack-item__icon" aria-hidden="true">' + icon + "</span>" +
            "<div>" +
            '<p class="stack-item__name">' + item[1] + "</p>" +
            '<p class="stack-item__desc">' + item[2] + "</p>" +
            "</div></li>"
          );
        })
        .join("");
      return (
        '<div class="stack-block">' +
        '<div class="stack-block__head"><h3 class="stack-block__title">' + block.title + "</h3>" +
        '<span class="stack-block__count">' + String(block.items.length).padStart(2, "0") + "</span></div>" +
        "<ul>" + rows + "</ul></div>"
      );
    }).join("");
  }

  /* ---------- Scroll reveal (staggered children) ---------- */
  const revealEls = document.querySelectorAll(".reveal, .stack-grid");
  revealEls.forEach(function (el) {
    Array.prototype.forEach.call(el.children, function (child, i) {
      child.style.setProperty("--i", i);
    });
  });

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("mobile-menu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768 && menu.classList.contains("is-open")) setMenu(false);
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = document.querySelectorAll(".nav__link");
  const sectionIds = ["works", "about", "contact"];
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sectionIds.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---------- Back-to-top button ---------- */
  const toTop = document.querySelector(".to-top");
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      const y = window.scrollY;
      toTop.classList.toggle("is-visible", y > 400);
      if (y < 200) navLinks.forEach(function (l) { l.classList.remove("is-active"); });
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- Copy to clipboard ---------- */
  const toast = document.querySelector(".toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 1800);
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    const label = btn.querySelector(".copy-btn__text");
    btn.addEventListener("click", function () {
      const text = btn.getAttribute("data-copy");
      const done = function () {
        btn.classList.add("is-copied");
        label.textContent = "Copied";
        showToast("Copied to clipboard");
        setTimeout(function () {
          btn.classList.remove("is-copied");
          label.textContent = "Copy";
        }, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () {
          if (fallbackCopy(text)) done();
        });
      } else if (fallbackCopy(text)) {
        done();
      } else {
        showToast("Select the text to copy");
      }
    });
  });

  /* ---------- Project carousel dots (mobile) ---------- */
  const track = document.querySelector(".projects");
  const dots = document.querySelectorAll(".carousel-dots span");
  if (track && dots.length) {
    track.addEventListener(
      "scroll",
      function () {
        const cards = track.children;
        let idx = 0;
        let best = Infinity;
        for (let i = 0; i < cards.length; i++) {
          const d = Math.abs(cards[i].offsetLeft - track.offsetLeft - track.scrollLeft - 16);
          if (d < best) { best = d; idx = i; }
        }
        dots.forEach(function (dot, i) { dot.classList.toggle("is-active", i === idx); });
      },
      { passive: true }
    );
  }
})();
