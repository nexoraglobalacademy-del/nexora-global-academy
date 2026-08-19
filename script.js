//* =========================================================
   NEXORA GLOBAL ACADEMY
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTS ================= */

    const header = document.getElementById("site-header");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navWrapper = document.getElementById("nav-wrapper");
    const navLinks = document.querySelectorAll(".nav-link");
    const themeToggle = document.getElementById("theme-toggle");
    const membershipForm = document.getElementById("membershipForm");
    const message = document.getElementById("message");
    const backToTop = document.getElementById("back-to-top");
    const currentYear = document.getElementById("current-year");


    /* ================= CURRENT YEAR ================= */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ================= HEADER SCROLL ================= */

    const handleScroll = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if (backToTop) {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        }

        updateActiveNavigation();
    };

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();


    /* ================= MOBILE MENU ================= */

    if (mobileMenuBtn && navWrapper) {

        mobileMenuBtn.addEventListener("click", () => {

            const isOpen = navWrapper.classList.toggle("open");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            const icon = mobileMenuBtn.querySelector("i");

            if (icon) {

                if (isOpen) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    }


    /* ================= CLOSE MOBILE MENU ================= */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (!navWrapper || !mobileMenuBtn) return;

            navWrapper.classList.remove("open");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = mobileMenuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });


    /* ================= ACTIVE NAVIGATION ================= */

    function updateActiveNavigation() {

        const sections = document.querySelectorAll(
            "main section[id]"
        );

        const scrollPosition =
            window.scrollY +
            (window.innerHeight * 0.3);

        let currentSection = "home";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach((link) => {

            const target = link.getAttribute("href");

            if (target === `#${currentSection}`) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }

        });

    }


    /* ================= DARK MODE ================= */

    const savedTheme =
        localStorage.getItem("nexora-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "nexora-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

        });

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;

        const isDark =
            document.body.classList.contains("dark-mode");

        if (isDark) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );

        }

    }


    /* ================= MEMBERSHIP FORM ================= */

    if (membershipForm) {

        membershipForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const fullName =
                    document.getElementById("fullName");

                const email =
                    document.getElementById("email");

                const country =
                    document.getElementById("country");

                const interest =
                    document.getElementById("interest");


                if (
                    !fullName ||
                    !email ||
                    !country ||
                    !interest ||
                    !message
                ) {
                    return;
                }


                const name =
                    fullName.value.trim();

                const emailValue =
                    email.value.trim();

                const countryValue =
                    country.value.trim();

                const interestValue =
                    interest.value;


                if (
                    !name ||
                    !emailValue ||
                    !countryValue ||
                    !interestValue
                ) {

                    message.textContent =
                        "Please complete all required fields.";

                    message.className =
                        "form-message error";

                    return;
                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(emailValue)) {

                    message.textContent =
                        "Please enter a valid email address.";

                    message.className =
                        "form-message error";

                    return;
                }


                /*
                 * The website currently does not have a backend.
                 * Therefore, this confirms the submission locally
                 * instead of pretending that data was sent to a server.
                 */

                message.textContent =
                    `Thank you, ${name}! Your interest in Nexora Global Academy has been recorded on this device.`;

                message.className =
                    "form-message success";


                membershipForm.reset();

            }
        );

    }


    /* ================= BACK TO TOP ================= */

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ================= SMOOTH ANCHOR LINKS ================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

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
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });


    /* ================= ESCAPE KEY ================= */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (
            navWrapper &&
            navWrapper.classList.contains("open")
        ) {

            navWrapper.classList.remove("open");

            if (mobileMenuBtn) {
                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    mobileMenuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }

        }

    });

});
