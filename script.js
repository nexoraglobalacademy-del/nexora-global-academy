/* =========================================================
   NEXORA GLOBAL ACADEMY
   SCRIPT.JS — VERSION 2.0
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. MOBILE NAVIGATION
     ======================================================= */

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
    });


    // Close menu when a navigation link is clicked

    const navLinks = navigation.querySelectorAll("a");

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        navigation.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =======================================================
     2. HEADER SHADOW ON SCROLL
     ======================================================= */

  const header = document.querySelector("#header");

  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     3. FAQ ACCORDION
     ======================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.setAttribute(
      "aria-expanded",
      "false"
    );

    question.addEventListener("click", () => {

      const isActive = item.classList.contains("active");

      // Close all FAQ items

      faqItems.forEach((otherItem) => {

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        otherItem.classList.remove("active");

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

        if (otherQuestion) {
          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });


      // Open selected item

      if (!isActive) {

        item.classList.add("active");

        answer.style.maxHeight =
          answer.scrollHeight + "px";

        question.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });


  /* =======================================================
     4. SCROLL REVEAL ANIMATION
     ======================================================= */

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
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("show");
    });

  }


  /* =======================================================
     5. CURRENT YEAR
     ======================================================= */

  const yearElements =
    document.querySelectorAll("[data-current-year]");

  const currentYear =
    new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });


  /* =======================================================
     6. SMOOTH SCROLL
     ======================================================= */

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
        header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        10;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     7. UPDATE ACTIVE NAVIGATION LINK
     ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navigationLinks =
    document.querySelectorAll(
      '#main-navigation a[href^="#"]'
    );

  const updateActiveNavigation = () => {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop - 130;

      const sectionHeight =
        section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY <
          sectionTop + sectionHeight
      ) {
        currentSection =
          section.getAttribute("id");
      }

    });


    navigationLinks.forEach((link) => {

      link.classList.remove("active");

      const href =
        link.getAttribute("href");

      if (
        currentSection &&
        href === "#" + currentSection
      ) {
        link.classList.add("active");
      }

    });

  };

  updateActiveNavigation();

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );


  /* =======================================================
     8. ESC KEY CLOSES MOBILE MENU
     ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      navigation &&
      navigation.classList.contains("active")
    ) {

      navigation.classList.remove("active");

      if (menuToggle) {

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }

  });


  /* =======================================================
     9. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
     ======================================================= */

  document.addEventListener("click", (event) => {

    if (
      !navigation ||
      !menuToggle ||
      !navigation.classList.contains("active")
    ) {
      return;
    }

    const clickedInsideMenu =
      navigation.contains(event.target);

    const clickedButton =
      menuToggle.contains(event.target);

    if (
      !clickedInsideMenu &&
      !clickedButton
    ) {

      navigation.classList.remove("active");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  });


  /* =======================================================
     10. PREVENT BROKEN EMPTY LINKS
     ======================================================= */

  const emptyLinks =
    document.querySelectorAll(
      'a[href="#"]'
    );

  emptyLinks.forEach((link) => {

    link.addEventListener("click", (event) => {
      event.preventDefault();
    });

  });


  /* =======================================================
     11. PAGE LOADED
     ======================================================= */

  document.body.classList.add("page-loaded");

  console.log(
    "Nexora Global Academy website loaded successfully."
  );

});
