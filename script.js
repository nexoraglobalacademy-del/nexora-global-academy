/* =========================================================
   NEXORA GLOBAL ACADEMY
   SCRIPT.JS — VERSION 2.0
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. PAGE LOAD
     ======================================================= */

  document.body.classList.add("page-loaded");


  /* =======================================================
     2. MOBILE NAVIGATION
     ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        navigation.classList.toggle("active");

      menuToggle.classList.toggle(
        "active",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    /* Close menu when navigation link is clicked */

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

      });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

      const clickedInsideNavigation =
        navigation.contains(event.target);

      const clickedMenuButton =
        menuToggle.contains(event.target);

      if (
        !clickedInsideNavigation &&
        !clickedMenuButton
      ) {

        navigation.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /* =======================================================
     3. STICKY HEADER EFFECT
     ======================================================= */

  const header =
    document.querySelector("#header");

  const handleHeaderScroll = () => {

    if (!header) return;

    if (window.scrollY > 20) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  };

  handleHeaderScroll();

  window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
  );


  /* =======================================================
     4. ACTIVE NAVIGATION LINK
     ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll(
      '#main-navigation a[href^="#"]'
    );

  const updateActiveNavigation = () => {

    if (!sections.length || !navLinks.length) {
      return;
    }

    const scrollPosition =
      window.scrollY + 130;

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop;

      const sectionHeight =
        section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
          sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });

    navLinks.forEach((link) => {

      const href =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === `#${currentSection}`
      );

    });

  };

  updateActiveNavigation();

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );


  /* =======================================================
     5. SMOOTH SCROLLING
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

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

          if (!target) {
            return;
          }

          event.preventDefault();

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

          /*
           * Update URL without jumping.
           */

          if (
            history.pushState &&
            targetId
          ) {

            history.pushState(
              null,
              "",
              targetId
            );

          }

        }
      );

    });


  /* =======================================================
     6. FAQ ACCORDION
     ======================================================= */

  const faqItems =
    document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {

    const question =
      item.querySelector(".faq-question");

    const answer =
      item.querySelector(".faq-answer");

    if (!question || !answer) {
      return;
    }

    question.setAttribute(
      "aria-expanded",
      "false"
    );

    question.addEventListener(
      "click",
      () => {

        const isActive =
          item.classList.contains("active");


        /*
         * Close every other FAQ item.
         */

        faqItems.forEach((otherItem) => {

          if (otherItem !== item) {

            otherItem.classList.remove(
              "active"
            );

            const otherQuestion =
              otherItem.querySelector(
                ".faq-question"
              );

            const otherAnswer =
              otherItem.querySelector(
                ".faq-answer"
              );

            if (otherQuestion) {

              otherQuestion.setAttribute(
                "aria-expanded",
                "false"
              );

            }

            if (otherAnswer) {

              otherAnswer.style.maxHeight =
                null;

            }

          }

        });


        /*
         * Toggle selected FAQ.
         */

        if (isActive) {

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

      }
    );

  });


  /* =======================================================
     7. SCROLL REVEAL ANIMATION
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "show"
              );

              observer.unobserve(
                entry.target
              );

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

    /*
     * Fallback for older browsers.
     */

    revealElements.forEach((element) => {

      element.classList.add("show");

    });

  }


  /* =======================================================
     8. CARD STAGGER ANIMATION
     ======================================================= */

  const cardGroups = [
    ".programme-card",
    ".value-card",
    ".benefit-item",
    ".contact-card"
  ];

  cardGroups.forEach((selector) => {

    const cards =
      document.querySelectorAll(selector);

    cards.forEach((card, index) => {

      card.style.transitionDelay =
        `${index * 70}ms`;

    });

  });


  /* =======================================================
     9. ESC KEY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }

      /*
       * Close mobile navigation.
       */

      if (
        navigation &&
        menuToggle
      ) {

        navigation.classList.remove(
          "active"
        );

        menuToggle.classList.remove(
          "active"
        );

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }


      /*
       * Close FAQ items.
       */

      faqItems.forEach((item) => {

        item.classList.remove("active");

        const question =
          item.querySelector(
            ".faq-question"
          );

        const answer =
          item.querySelector(
            ".faq-answer"
          );

        if (question) {

          question.setAttribute(
            "aria-expanded",
            "false"
          );

        }

        if (answer) {

          answer.style.maxHeight =
            null;

        }

      });

    }
  );


  /* =======================================================
     10. RESIZE HANDLER
     ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(() => {

          /*
           * Reset FAQ heights after resize.
           */

          faqItems.forEach((item) => {

            const answer =
              item.querySelector(
                ".faq-answer"
              );

            if (
              answer &&
              item.classList.contains(
                "active"
              )
            ) {

              answer.style.maxHeight =
                answer.scrollHeight + "px";

            }

          });

        }, 150);

    }
  );


  /* =======================================================
     11. WHATSAPP BUTTON TRACKING
     ======================================================= */

  const whatsappLinks =
    document.querySelectorAll(
      'a[href*="wa.me"], a[href*="whatsapp"]'
    );

  whatsappLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        console.log(
          "Nexora WhatsApp contact clicked."
        );

      }
    );

  });


  /* =======================================================
     12. CURRENT YEAR
     ======================================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-current-year]"
    );

  const currentYear =
    new Date().getFullYear();

  yearElements.forEach((element) => {

    element.textContent =
      currentYear;

  });


  /* =======================================================
     13. BACK TO TOP
     ======================================================= */

  const backToTop =
    document.querySelector(
      "#back-to-top"
    );

  if (backToTop) {

    const toggleBackToTop = () => {

      if (window.scrollY > 500) {

        backToTop.classList.add(
          "visible"
        );

      } else {

        backToTop.classList.remove(
          "visible"
        );

      }

    };

    toggleBackToTop();

    window.addEventListener(
      "scroll",
      toggleBackToTop,
      { passive: true }
    );


    backToTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =======================================================
     14. CONSOLE MESSAGE
     ======================================================= */

  console.log(
    "Nexora Global Academy website loaded successfully."
  );

});
