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
    form.addEventListener("submit", async (event) => {
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

      const submitButton = form.querySelector("button[type='submit']");
      submitButton.disabled = true;
      status.textContent = "Submitting...";
      status.classList.remove("error");

      try {
        const response = await fetch("https://formspree.io/f/simple-sequoia-119", {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(form)
        });

        if (response.ok) {
          status.classList.remove("error");
          status.textContent = "🎮 Thanks! Your interest has been submitted. We'll review and be in touch soon.";
          form.reset();
          submitButton.disabled = false;
        } else {
          status.textContent = "There was a problem sending your form. Please try again.";
          status.classList.add("error");
          submitButton.disabled = false;
        }
      } catch (error) {
        status.textContent = "Connection error. Please check your internet and try again.";
        status.classList.add("error");
        submitButton.disabled = false;
      }
    });
  }
});
