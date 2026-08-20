/* =========================================================
   NEXORA GLOBAL ACADEMY
   script.js
   Version 1.0
   ========================================================= */


/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");

if (menuToggle && navigation) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );

  });


  /* Close menu when a navigation link is clicked */

  const navigationLinks =
    navigation.querySelectorAll("a");

  navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

      navigation.classList.remove("active");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

    });

  });


  /* Close menu when clicking outside */

  document.addEventListener("click", (event) => {

    const clickedInsideMenu =
      navigation.contains(event.target);

    const clickedMenuButton =
      menuToggle.contains(event.target);

    if (
      !clickedInsideMenu &&
      !clickedMenuButton &&
      navigation.classList.contains("active")
    ) {

      navigation.classList.remove("active");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

    }

  });

}


/* =========================================================
   2. STICKY HEADER EFFECT
   ========================================================= */

const header = document.querySelector("#header");

function handleHeaderScroll() {

  if (!header) return;

  if (window.scrollY > 20) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}

window.addEventListener(
  "scroll",
  handleHeaderScroll,
  { passive: true }
);

handleHeaderScroll();


/* =========================================================
   3. FAQ ACCORDION
   ========================================================= */

const faqItems =
  document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const question =
    item.querySelector(".faq-question");

  const answer =
    item.querySelector(".faq-answer");

  if (!question || !answer) return;


  question.addEventListener("click", () => {

    const isCurrentlyOpen =
      item.classList.contains("active");


    /* Close every other FAQ */

    faqItems.forEach((otherItem) => {

      if (otherItem !== item) {

        otherItem.classList.remove("active");

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        if (otherQuestion) {

          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );

        }

        if (otherAnswer) {

          otherAnswer.style.maxHeight = null;

        }

      }

    });


    /* Toggle selected FAQ */

    if (isCurrentlyOpen) {

      item.classList.remove("active");

      question.setAttribute(
        "aria-expanded",
        "false"
      );

      answer.style.maxHeight = null;

    } else {

      item.classList.add("active");

      question.setAttribute(
        "aria-expanded",
        "true"
      );

      answer.style.maxHeight =
        answer.scrollHeight + "px";

    }

  });

});


/* =========================================================
   4. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

} else {

  /* Fallback for older browsers */

  revealElements.forEach((element) => {

    element.classList.add("show");

  });

}


/* =========================================================
   5. SMOOTH SCROLL
   ========================================================= */

const internalLinks =
  document.querySelectorAll(
    'a[href^="#"]'
  );

internalLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId =
      link.getAttribute("href");


    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(targetId);

    if (!target) return;


    event.preventDefault();


    const headerHeight =
      header
        ? header.offsetHeight
        : 0;


    const targetPosition =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight;


    window.scrollTo({

      top: targetPosition,

      behavior: "smooth"

    });

  });

});


/* =========================================================
   6. CLOSE MOBILE MENU ON RESIZE
   ========================================================= */

window.addEventListener("resize", () => {

  if (
    window.innerWidth > 800 &&
    navigation &&
    menuToggle
  ) {

    navigation.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

  }

});


/* =========================================================
   7. CURRENT YEAR
   ========================================================= */

const currentYear =
  new Date().getFullYear();

const footerYear =
  document.querySelector(
    ".footer-bottom p"
  );

if (footerYear) {

  footerYear.innerHTML =
    footerYear.innerHTML.replace(
      "2026",
      currentYear
    );

}


/* =========================================================
   8. KEYBOARD ACCESSIBILITY FOR FAQ
   ========================================================= */

faqItems.forEach((item) => {

  const question =
    item.querySelector(".faq-question");

  if (!question) return;


  question.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        question.click();

      }

    }
  );

});


/* =========================================================
   9. PAGE READY
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    console.log(
      "Nexora Global Academy website loaded successfully."
    );

  }
);
