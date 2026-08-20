/* =========================================================
   NEXORA GLOBAL ACADEMY
   Main JavaScript
   Version 1.0
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. MOBILE NAVIGATION
     ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");

  if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      document.body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen);

      menuToggle.classList.toggle("active", isOpen);

    });

    /* Close menu when a navigation link is clicked */

    navLinks.forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

      });

    });

    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        nav.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

      }

    });

  }


  /* =======================================================
     2. ACTIVE NAVIGATION LINK
     ======================================================= */

  const sections = document.querySelectorAll("section[id]");

  const updateActiveNav = () => {

    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {

      const sectionTop = section.offsetTop;

      const sectionHeight = section.offsetHeight;

      const sectionId = section.getAttribute("id");

      const link = document.querySelector(
        `nav a[href="#${sectionId}"]`
      );

      if (!link) return;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {

        navLinks.forEach(navLink => {
          navLink.classList.remove("active");
        });

        link.classList.add("active");

      }

    });

  };

  window.addEventListener("scroll", updateActiveNav);

  updateActiveNav();


  /* =======================================================
     3. BACK TO TOP BUTTON
     ======================================================= */

  const backToTop = document.querySelector("#back-to-top");

  if (backToTop) {

    const toggleBackToTop = () => {

      if (window.scrollY > 500) {

        backToTop.classList.add("show");

      } else {

        backToTop.classList.remove("show");

      }

    };

    window.addEventListener("scroll", toggleBackToTop);

    toggleBackToTop();

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* =======================================================
     4. FAQ ACCORDION
     ======================================================= */

  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

      const answer = question.nextElementSibling;

      const isExpanded =
        question.getAttribute("aria-expanded") === "true";

      /* Close all other FAQ items */

      faqQuestions.forEach(otherQuestion => {

        if (otherQuestion !== question) {

          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );

          const otherAnswer =
            otherQuestion.nextElementSibling;

          if (otherAnswer) {

            otherAnswer.style.maxHeight = null;

          }

        }

      });

      /* Toggle current FAQ */

      question.setAttribute(
        "aria-expanded",
        String(!isExpanded)
      );

      if (!isExpanded) {

        answer.style.maxHeight =
          answer.scrollHeight + "px";

      } else {

        answer.style.maxHeight = null;

      }

    });

  });


  /* =======================================================
     5. SCROLL REVEAL ANIMATION
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

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

    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  }


  /* =======================================================
     6. MEMBERSHIP FORM
     ======================================================= */

  const membershipForm =
    document.querySelector("#membership-form");

  const membershipStatus =
    document.querySelector("#membership-status");

  if (membershipForm) {

    membershipForm.addEventListener("submit", event => {

      event.preventDefault();

      const formData =
        new FormData(membershipForm);

      const name =
        formData.get("name");

      const email =
        formData.get("email");

      const phone =
        formData.get("phone");

      const country =
        formData.get("country");

      const interest =
        formData.get("interest");

      if (!name || !email || !phone) {

        if (membershipStatus) {

          membershipStatus.textContent =
            "Please complete all required fields.";

          membershipStatus.className =
            "form-status error";

        }

        return;

      }

      /*
       * Nexora currently has no backend/database.
       *
       * For now we prepare the membership information
       * and open WhatsApp so the application can be
       * completed manually.
       */

      const message =
        `NEXORA GLOBAL ACADEMY MEMBERSHIP APPLICATION\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Country: ${country || "Not provided"}\n` +
        `Area of Interest: ${interest || "Not provided"}\n\n` +
        `I would like to become a member of Nexora Global Academy.`;

      const whatsappNumber =
        "2348167193341";

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      if (membershipStatus) {

        membershipStatus.textContent =
          "Application prepared. Redirecting you to WhatsApp...";

        membershipStatus.className =
          "form-status success";

      }

      setTimeout(() => {

        window.open(
          whatsappURL,
          "_blank",
          "noopener,noreferrer"
        );

      }, 700);

    });

  }


  /* =======================================================
     7. CONTACT FORM
     ======================================================= */

  const contactForm =
    document.querySelector("#contact-form");

  const contactStatus =
    document.querySelector("#contact-status");

  if (contactForm) {

    contactForm.addEventListener("submit", event => {

      event.preventDefault();

      const formData =
        new FormData(contactForm);

      const name =
        formData.get("name");

      const email =
        formData.get("email");

      const subject =
        formData.get("subject");

      const message =
        formData.get("message");

      if (!name || !email || !message) {

        if (contactStatus) {

          contactStatus.textContent =
            "Please complete the required fields.";

          contactStatus.className =
            "form-status error";

        }

        return;

      }

      /*
       * Since Nexora does not yet have a backend,
       * we use the user's email application.
       */

      const emailAddress =
        "nexoraglobalacademy@gmail.com";

      const emailSubject =
        subject
          ? `Nexora Website: ${subject}`
          : "Nexora Global Academy Website Enquiry";

      const emailBody =
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `${message}`;

      const mailtoURL =
        `mailto:${emailAddress}` +
        `?subject=${encodeURIComponent(emailSubject)}` +
        `&body=${encodeURIComponent(emailBody)}`;

      if (contactStatus) {

        contactStatus.textContent =
          "Opening your email application...";

        contactStatus.className =
          "form-status success";

      }

      window.location.href = mailtoURL;

    });

  }


  /* =======================================================
     8. WHATSAPP LINKS
     ======================================================= */

  const whatsappLinks =
    document.querySelectorAll("[data-whatsapp]");

  whatsappLinks.forEach(link => {

    link.addEventListener("click", () => {

      const message =
        link.getAttribute("data-whatsapp") ||
        "Hello Nexora Global Academy. I would like to make an enquiry.";

      const number =
        "2348167193341";

      const url =
        `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

      link.href = url;

    });

  });


  /* =======================================================
     9. SMOOTH SCROLL
     ======================================================= */

  const anchorLinks =
    document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId.length < 2
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     10. CURRENT YEAR
     ======================================================= */

  const yearElements =
    document.querySelectorAll("[data-current-year]");

  yearElements.forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });


  /* =======================================================
     11. HEADER SHADOW ON SCROLL
     ======================================================= */

  const header =
    document.querySelector("#header");

  if (header) {

    const updateHeader =
      () => {

        if (window.scrollY > 20) {

          header.classList.add("scrolled");

        } else {

          header.classList.remove("scrolled");

        }

      };

    window.addEventListener(
      "scroll",
      updateHeader
    );

    updateHeader();

  }


  /* =======================================================
     12. PREVENT MULTIPLE FORM SUBMISSIONS
     ======================================================= */

  const forms =
    document.querySelectorAll("form");

  forms.forEach(form => {

    form.addEventListener("submit", () => {

      const submitButton =
        form.querySelector(
          'button[type="submit"], input[type="submit"]'
        );

      if (!submitButton) return;

      setTimeout(() => {

        submitButton.blur();

      }, 300);

    });

  });


  /* =======================================================
     13. ESCAPE KEY
     Close mobile menu
     ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    if (
      nav &&
      nav.classList.contains("open")
    ) {

      nav.classList.remove("open");

      document.body.classList.remove("menu-open");

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
     14. IMAGE ERROR HANDLING
     ======================================================= */

  const images =
    document.querySelectorAll("img");

  images.forEach(image => {

    image.addEventListener("error", () => {

      image.classList.add("image-error");

    });

  });


  /* =======================================================
     15. CONSOLE MESSAGE
     ======================================================= */

  console.log(
    "Nexora Global Academy website loaded successfully."
  );

});
