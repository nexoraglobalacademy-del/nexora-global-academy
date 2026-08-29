/* =========================================================
   NEXORA GLOBAL ACADEMY
   Main JavaScript
   Version 2.0
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     1. ELEMENTS
     ======================================================= */

  const body = document.body;

  const header = document.querySelector("#header");

  const menuToggle =
    document.querySelector(".menu-toggle");

  const nav =
    document.querySelector("#main-navigation");

  const navLinks =
    document.querySelectorAll("#main-navigation a");

  const sections =
    document.querySelectorAll("main section[id]");

  const backToTop =
    document.querySelector("#back-to-top");


  /* =======================================================
     2. MOBILE NAVIGATION
     ======================================================= */

  const closeMobileMenu = () => {

    if (!nav || !menuToggle) return;

    nav.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    body.classList.remove("menu-open");

  };


  const openMobileMenu = () => {

    if (!nav || !menuToggle) return;

    nav.classList.add("open");

    menuToggle.classList.add("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    body.classList.add("menu-open");

  };


  if (menuToggle && nav) {

    menuToggle.addEventListener("click", event => {

      event.stopPropagation();

      const isOpen =
        nav.classList.contains("open");

      if (isOpen) {

        closeMobileMenu();

      } else {

        openMobileMenu();

      }

    });


    navLinks.forEach(link => {

      link.addEventListener("click", () => {

        closeMobileMenu();

      });

    });


    document.addEventListener("click", event => {

      if (!nav.classList.contains("open")) {
        return;
      }

      if (
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        closeMobileMenu();

      }

    });


    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {

        closeMobileMenu();

        menuToggle.focus();

      }

    });

  }


  /* =======================================================
     3. ACTIVE NAVIGATION LINK
     ======================================================= */

  const updateActiveNav = () => {

    if (!sections.length || !navLinks.length) {
      return;
    }

    const scrollPosition =
      window.scrollY + 180;

    let currentSection = "";

    sections.forEach(section => {

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


    navLinks.forEach(link => {

      const href =
        link.getAttribute("href");

      const isActive =
        href === `#${currentSection}`;

      link.classList.toggle(
        "active",
        isActive
      );

    });

  };


  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateActiveNav
  );

  updateActiveNav();


  /* =======================================================
     4. HEADER SCROLL EFFECT
     ======================================================= */

  const updateHeader = () => {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );

  };


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =======================================================
     5. BACK TO TOP
     ======================================================= */

  if (backToTop) {

    const updateBackToTop = () => {

      backToTop.classList.toggle(
        "show",
        window.scrollY > 500
      );

    };


    window.addEventListener(
      "scroll",
      updateBackToTop,
      { passive: true }
    );

    updateBackToTop();


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
     6. FAQ ACCORDION
     ======================================================= */

  const faqQuestions =
    document.querySelectorAll(
      ".faq-question"
    );


  const closeFaq = question => {

    const answer =
      question.nextElementSibling;

    question.setAttribute(
      "aria-expanded",
      "false"
    );

    if (answer) {

      answer.style.maxHeight = null;

    }

  };


  const openFaq = question => {

    const answer =
      question.nextElementSibling;

    question.setAttribute(
      "aria-expanded",
      "true"
    );

    if (answer) {

      answer.style.maxHeight =
        `${answer.scrollHeight}px`;

    }

  };


  faqQuestions.forEach(question => {

    question.addEventListener(
      "click",
      () => {

        const isExpanded =
          question.getAttribute(
            "aria-expanded"
          ) === "true";


        faqQuestions.forEach(
          otherQuestion => {

            if (
              otherQuestion !== question
            ) {

              closeFaq(otherQuestion);

            }

          }
        );


        if (isExpanded) {

          closeFaq(question);

        } else {

          openFaq(question);

        }

      }
    );

  });


  /* Recalculate open FAQ height on resize */

  window.addEventListener(
    "resize",
    () => {

      faqQuestions.forEach(question => {

        const isExpanded =
          question.getAttribute(
            "aria-expanded"
          ) === "true";

        const answer =
          question.nextElementSibling;

        if (
          isExpanded &&
          answer
        ) {

          answer.style.maxHeight =
            `${answer.scrollHeight}px`;

        }

      });

    }
  );


  /* =======================================================
     7. SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver" in window &&
    revealElements.length
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  }


  /* =======================================================
     8. SMOOTH SCROLL
     ======================================================= */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        let target = null;

        try {

          target =
            document.querySelector(
              targetId
            );

        } catch (error) {

          return;

        }


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

          top:
            Math.max(
              targetPosition,
              0
            ),

          behavior: "smooth"

        });


        /* Update URL without jumping */

        if (
          window.history &&
          window.history.pushState
        ) {

          window.history.pushState(
            null,
            "",
            targetId
          );

        }

      }
    );

  });


  /* =======================================================
     9. MEMBERSHIP FORM
     ======================================================= */

  const membershipForm =
    document.querySelector(
      "#membership-form"
    );

  const membershipStatus =
    document.querySelector(
      "#membership-status"
    );


  const setFormStatus = (
    element,
    message,
    type
  ) => {

    if (!element) return;

    element.textContent =
      message;

    element.className =
      `form-status ${type}`;

  };


  const setButtonLoading = (
    button,
    loading,
    originalText
  ) => {

    if (!button) return;

    if (loading) {

      button.disabled = true;

      button.dataset.originalText =
        originalText ||
        button.textContent.trim();

      button.innerHTML =
        `Processing... <i class="fa-solid fa-spinner fa-spin"></i>`;

    } else {

      button.disabled = false;

      button.innerHTML =
        button.dataset.originalText ||
        originalText ||
        "Submit";

    }

  };


  if (membershipForm) {

    membershipForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        if (
          !membershipForm.checkValidity()
        ) {

          membershipForm.reportValidity();

          setFormStatus(
            membershipStatus,
            "Please complete all required fields.",
            "error"
          );

          return;

        }


        const formData =
          new FormData(
            membershipForm
          );


        const name =
          String(
            formData.get("name") || ""
          ).trim();

        const email =
          String(
            formData.get("email") || ""
          ).trim();

        const phone =
          String(
            formData.get("phone") || ""
          ).trim();

        const country =
          String(
            formData.get("country") || ""
          ).trim();

        const interest =
          String(
            formData.get("interest") || ""
          ).trim();

        const message =
          String(
            formData.get("message") || ""
          ).trim();


        if (
          !name ||
          !email ||
          !phone ||
          !country ||
          !interest ||
          !message
        ) {

          setFormStatus(
            membershipStatus,
            "Please complete all required fields.",
            "error"
          );

          return;

        }


        const submitButton =
          membershipForm.querySelector(
            'button[type="submit"]'
          );


        const whatsappMessage =
          `NEXORA GLOBAL ACADEMY MEMBERSHIP APPLICATION\n\n` +
          `Full Name: ${name}\n` +
          `Email: ${email}\n` +
          `WhatsApp Number: ${phone}\n` +
          `Country: ${country}\n` +
          `Area of Interest: ${interest}\n` +
          `Why I want to join: ${message}`;


        const whatsappNumber =
          "2348167193341";


        const whatsappURL =
          `https://wa.me/${whatsappNumber}?text=` +
          encodeURIComponent(
            whatsappMessage
          );


        setFormStatus(
          membershipStatus,
          "Your application is ready. Opening WhatsApp...",
          "success"
        );


        setButtonLoading(
          submitButton,
          true,
          "Submit Interest"
        );


        setTimeout(() => {

          window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
          );


          setButtonLoading(
            submitButton,
            false,
            "Submit Interest"
          );

        }, 600);

      }
    );

  }


  /* =======================================================
     10. CONTACT FORM
     ======================================================= */

  const contactForm =
    document.querySelector(
      "#contact-form"
    );

  const contactStatus =
    document.querySelector(
      "#contact-status"
    );


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        if (
          !contactForm.checkValidity()
        ) {

          contactForm.reportValidity();

          setFormStatus(
            contactStatus,
            "Please complete all required fields.",
            "error"
          );

          return;

        }


        const formData =
          new FormData(
            contactForm
          );


        const name =
          String(
            formData.get("name") || ""
          ).trim();

        const email =
          String(
            formData.get("email") || ""
          ).trim();

        const subject =
          String(
            formData.get("subject") || ""
          ).trim();

        const message =
          String(
            formData.get("message") || ""
          ).trim();


        if (
          !name ||
          !email ||
          !subject ||
          !message
        ) {

          setFormStatus(
            contactStatus,
            "Please complete all required fields.",
            "error"
          );

          return;

        }


        const emailAddress =
          "nexoraglobalacademy@gmail.com";


        const emailSubject =
          `Nexora Website: ${subject}`;


        const emailBody =
          `Name: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${message}`;


        const mailtoURL =
          `mailto:${emailAddress}` +
          `?subject=${encodeURIComponent(
            emailSubject
          )}` +
          `&body=${encodeURIComponent(
            emailBody
          )}`;


        setFormStatus(
          contactStatus,
          "Opening your email application...",
          "success"
        );


        const submitButton =
          contactForm.querySelector(
            'button[type="submit"]'
          );


        setButtonLoading(
          submitButton,
          true,
          "Send Message"
        );


        setTimeout(() => {

          window.location.href =
            mailtoURL;

          setButtonLoading(
            submitButton,
            false,
            "Send Message"
          );

        }, 400);

      }
    );

  }


  /* =======================================================
     11. WHATSAPP DATA LINKS
     ======================================================= */

  const whatsappLinks =
    document.querySelectorAll(
      "[data-whatsapp]"
    );


  whatsappLinks.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        const message =
          link.getAttribute(
            "data-whatsapp"
          );


        if (!message) {
          return;
        }


        const number =
          "2348167193341";


        link.href =
          `https://wa.me/${number}?text=` +
          encodeURIComponent(
            message
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


  yearElements.forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });


  /* =======================================================
     13. IMAGE ERROR HANDLING
     ======================================================= */

  const images =
    document.querySelectorAll("img");


  images.forEach(image => {

    image.addEventListener(
      "error",
      () => {

        image.classList.add(
          "image-error"
        );

        image.setAttribute(
          "aria-hidden",
          "true"
        );

      }
    );


    image.addEventListener(
      "load",
      () => {

        image.classList.remove(
          "image-error"
        );

      }
    );

  });


  /* =======================================================
     14. REDUCE MOTION SUPPORT
     ======================================================= */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (prefersReducedMotion.matches) {

    document.documentElement.style
      .scrollBehavior = "auto";

  }


  /* =======================================================
     15. CLOSE MENU ON RESIZE
     ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900
      ) {

        closeMobileMenu();

      }

    }
  );


  /* =======================================================
     16. CONSOLE MESSAGE
     ======================================================= */

  console.log(
    "Nexora Global Academy website loaded successfully."
  );

});
