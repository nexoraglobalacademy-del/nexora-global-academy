/* ==========================================
   NEXORA GLOBAL ACADEMY V2
========================================== */

// Mobile Navigation

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Close mobile menu when link clicked

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("active");
  });
});

// Smooth Scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Reveal Animation

const revealElements =
  document.querySelectorAll(
    ".reveal, .card, .school-card"
  );

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform =
            "translateY(0)";

        }

      });

    },
    {
      threshold: 0.15
    }
  );

revealElements.forEach(element => {

  element.style.opacity = "0";
  element.style.transform =
    "translateY(30px)";

  element.style.transition =
    "all 0.7s ease";

  revealObserver.observe(element);

});

// Scroll To Top Button

const scrollTopButton =
  document.getElementById("scrollTop");

if (scrollTopButton) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

      scrollTopButton.style.display =
        "flex";

    } else {

      scrollTopButton.style.display =
        "none";

    }

  });

  scrollTopButton.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}

// Dynamic Year

const yearElement =
  document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}

// Membership Form

const membershipForm =
  document.getElementById(
    "membershipForm"
  );

if (membershipForm) {

  membershipForm.addEventListener(
    "submit",
    function (e) {

      e.preventDefault();

      alert(
        "Thank you for your interest in Nexora Global Academy. We will contact you soon."
      );

      membershipForm.reset();

    }
  );

}

// Contact Form

const contactForm =
  document.getElementById(
    "contactForm"
  );

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function (e) {

      e.preventDefault();

      alert(
        "Message sent successfully."
      );

      contactForm.reset();

    }
  );

}

// Navbar Shadow

const header =
  document.querySelector("header");

window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 30) {

      header.style.boxShadow =
        "0 8px 20px rgba(0,0,0,.08)";

    } else {

      header.style.boxShadow =
        "none";

    }

  }
);

// Console Branding

console.log(
  "%cNEXORA GLOBAL ACADEMY",
  "color:#1f6b57;font-size:20px;font-weight:bold;"
);

console.log(
  "Empowering Minds, Transforming Futures"
);
