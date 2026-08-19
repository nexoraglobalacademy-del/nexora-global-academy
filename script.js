/* =========================================================
   NEXORA GLOBAL ACADEMY
   Main JavaScript - Step 1
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* ================= ELEMENTS ================= */

    const header = document.getElementById("site-header");

    const mobileMenuBtn =
        document.getElementById("mobile-menu-btn");

    const navWrapper =
        document.getElementById("nav-wrapper");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const themeToggle =
        document.getElementById("theme-toggle");

    const backToTop =
        document.getElementById("back-to-top");

    const membershipForm =
        document.getElementById("membershipForm");

    const message =
        document.getElementById("message");

    const currentYear =
        document.getElementById("current-year");


    /* ================= CURRENT YEAR ================= */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* ================= MOBILE MENU ================= */

    if (mobileMenuBtn && navWrapper) {

        mobileMenuBtn.addEventListener("click", () => {

            const isOpen =
                navWrapper.classList.toggle("open");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

            const icon =
                mobileMenuBtn.querySelector("i");

            if (icon) {

                icon.classList.toggle(
                    "fa-bars",
                    !isOpen
                );

                icon.classList.toggle(
                    "fa-xmark",
                    isOpen
                );

            }

        });


        /*
         * Close mobile navigation after
         * clicking a navigation link.
         */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navWrapper.classList.remove("open");

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    mobileMenuBtn.querySelector("i");

                if (icon) {

                    icon.classList.add("fa-bars");

                    icon.classList.remove("fa-xmark");

                }

            });

        });

    }


    /* ================= HEADER SCROLL ================= */

    const handleScroll = () => {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        /*
         * Back to top button
         */

        if (backToTop) {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        }

    };


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    handleScroll();


    /* ================= BACK TO TOP ================= */

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ================= ACTIVE NAVIGATION ================= */

    const sections =
        document.querySelectorAll("main section[id]");


    const updateActiveNav = () => {

        const scrollPosition =
            window.scrollY + 140;

        let currentSection = "home";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    updateActiveNav();


    /* ================= DARK MODE ================= */

    const savedTheme =
        localStorage.getItem("nexora-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }


    const updateThemeIcon = () => {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;


        const darkMode =
            document.body.classList.contains("dark-mode");


        icon.classList.toggle(
            "fa-moon",
            !darkMode
        );

        icon.classList.toggle(
            "fa-sun",
            darkMode
        );

    };


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


    updateThemeIcon();


    /* ================= MEMBERSHIP FORM ================= */

    if (membershipForm) {

        membershipForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const fullName =
                    document.getElementById("fullName");

                const email =
                    document.getElementById("email");

                const country =
                    document.getElementById("country");

                const interest =
                    document.getElementById("interest");


                /*
                 * Basic validation
                 */

                if (
                    !fullName ||
                    !email ||
                    !country ||
                    !interest
                ) {

                    return;

                }


                if (
                    !fullName.value.trim() ||
                    !email.value.trim() ||
                    !country.value.trim() ||
                    !interest.value
                ) {

                    showFormMessage(
                        "Please complete all required fields.",
                        "error"
                    );

                    return;

                }


                /*
                 * Basic email validation
                 */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email.value.trim())) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    email.focus();

                    return;

                }


                /*
                 * Current Step 1 behaviour:
                 *
                 * This confirms the registration on the
                 * browser. It does NOT store the data online.
                 *
                 * A real backend / Google Form / Formspree /
                 * database will be connected in a later step.
                 */

                showFormMessage(
                    `Thank you, ${fullName.value.trim()}! Your interest in Nexora Global Academy has been received.`,
                    "success"
                );


                membershipForm.reset();


                /*
                 * Keep the success message visible
                 * for several seconds.
                 */

                setTimeout(() => {

                    if (message) {

                        message.classList.remove(
                            "success"
                        );

                        message.style.display =
                            "none";

                    }

                }, 7000);

            }
        );

    }


    /* ================= FORM MESSAGE ================= */

    function showFormMessage(text, type) {

        if (!message) return;


        message.textContent = text;

        message.className =
            `form-message ${type}`;

        message.style.display =
            "block";

    }


    /* ================= SMOOTH INTERNAL LINKS ================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

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


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ================= ESCAPE KEY ================= */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;


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

                    icon.classList.add("fa-bars");

                    icon.classList.remove("fa-xmark");

                }

            }

        }

    });

});
