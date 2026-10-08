
/* =====================================
   iDraw Designs — Interactive Website
===================================== */

// 1. Mouse-follow glow effect

const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", function (event) {
  if (!cursorGlow) return;

  cursorGlow.style.left = event.clientX + "px";
  cursorGlow.style.top = event.clientY + "px";
});


// 2. Scroll reveal animation

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("visible");
  });
}


// 3. Bangla / English language switch

const languageBtn = document.getElementById("languageBtn");

let currentLanguage = "en";

function changeLanguage(language) {
  currentLanguage = language;

  document.documentElement.lang =
    language === "bn" ? "bn" : "en";

  document.querySelectorAll("[data-en][data-bn]")
    .forEach(function (element) {
      const text = element.getAttribute(
        "data-" + language
      );

      if (text !== null) {
        element.textContent = text;
      }
    });

  if (languageBtn) {
    languageBtn.textContent =
      language === "en" ? "বাংলা" : "English";

    languageBtn.setAttribute(
      "aria-label",
      language === "en"
        ? "Switch to Bangla"
        : "Switch to English"
    );
  }

  try {
    localStorage.setItem(
      "idraw-language",
      language
    );
  } catch (error) {
    // The website still works if storage is unavailable.
  }
}

if (languageBtn) {
  languageBtn.addEventListener("click", function () {
    changeLanguage(
      currentLanguage === "en" ? "bn" : "en"
    );
  });
}

try {
  const savedLanguage =
    localStorage.getItem("idraw-language");

  if (savedLanguage === "bn") {
    currentLanguage = "bn";
  }
} catch (error) {
  // Use English by default.
}

changeLanguage(currentLanguage);


// 4. Mobile navigation menu

const menuBtn = document.getElementById("menuBtn");
const navigation = document.querySelector(".desktop-nav");

if (menuBtn && navigation) {
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open menu");

  menuBtn.addEventListener("click", function () {
    const isOpen =
      navigation.classList.toggle("mobile-open");

    menuBtn.textContent = isOpen ? "✕" : "☰";

    menuBtn.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuBtn.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
  });

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("mobile-open");

      menuBtn.textContent = "☰";

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

      menuBtn.setAttribute(
        "aria-label",
        "Open menu"
      );
    });
  });
}


// 5. Project card 3D hover effect

const projectCards =
  document.querySelectorAll(".project");

const supportsFinePointer =
  window.matchMedia("(hover: hover) and (pointer: fine)");

if (supportsFinePointer.matches) {
  projectCards.forEach(function (card) {
    card.addEventListener("pointermove", function (event) {
      const rect = card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width;

      const y =
        (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 5;
      const rotateX = (0.5 - y) * 5;

      card.style.transform =
        "perspective(900px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg)";
    });

    card.addEventListener("pointerleave", function () {
      card.style.transform = "";
    });
  });
}


// 6. Smooth scrolling for internal links

document.querySelectorAll('a[href^="#"]').forEach(
  function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        event.preventDefault();
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        history.replaceState(null, "", targetId);
      }
    });
  }
);


// 7. Console message

console.log(
  "%ciDraw Designs",
  "color:#a9e51b;font-size:24px;font-weight:bold;"
);

console.log(
  "Creative ideas. Distinctive experiences."
);
