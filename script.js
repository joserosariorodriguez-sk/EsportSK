document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuButton = document.getElementById("menu-button");
  const nav = document.getElementById("nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const form = document.getElementById("registrationForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.setAttribute("aria-invalid", "true");
          isValid = false;
        } else {
          field.setAttribute("aria-invalid", "false");
        }
      });

      const emailField = form.querySelector('input[name="email"]');
      if (emailField && emailField.value && !emailField.value.includes("@")) {
        emailField.setAttribute("aria-invalid", "true");
        isValid = false;
      }

      if (!isValid) {
        status.textContent = "Please fill out all required fields correctly.";
        status.classList.add("error");
        return;
      }

      status.classList.remove("error");
      status.textContent = "Thanks! Your interest has been submitted successfully.";
      form.reset();
    });
  }
});
