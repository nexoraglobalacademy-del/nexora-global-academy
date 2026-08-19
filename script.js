const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

const form = document.getElementById("membershipForm");
const message = document.getElementById("message");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        message.innerHTML =
            "Registration submitted successfully. Welcome to Nexora Global Academy!";

        message.style.color = "green";

        form.reset();
    });
}
