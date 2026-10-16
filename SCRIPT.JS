
document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // 1. ELEMENTS
  // ========================================
  const typingText = document.getElementById("typingText");
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("progressBar");
  const year = document.getElementById("year");

  // ========================================
  // 2. AUTOMATIC CURRENT YEAR
  // ========================================
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ========================================
  // 3. TYPING ANIMATION
  // ========================================
  if (typingText) {
    const roles = [
      "Graphic Designer",
      "Video Editor",
      "Photo Editor",
      "Web Developer",
      "Content Creator"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeRole() {
      if (!typingText.isConnected) return;

      const currentRole = roles[roleIndex];
      typingText.textContent =
        currentRole.substring(0, charIndex);

      let delay = deleting ? 45 : 85;

      if (!deleting && charIndex < currentRole.length) {
        charIndex++;
      } else if (deleting && charIndex > 0) {
        charIndex--;
      } else if (!deleting) {
        deleting = true;
        delay = 1300;
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
      }

      window.setTimeout(typeRole, delay);
    }

    typeRole();
  }

  // ========================================
  // 4. MOBILE NAVIGATION
  // ========================================
  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navbar.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // ========================================
  // 5. SCROLL REVEAL
  // ========================================
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // ========================================
  // 6. SCROLL PROGRESS + ACTIVE NAVIGATION
  // ========================================
  function updateScrollUI() {
    if (progressBar) {
      const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

      progressBar.style.width = `${progress}%`;
    }

    const sections = document.querySelectorAll("main section[id]");
    let activeSection = "home";

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 180) {
        activeSection = section.id;
      }
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      const isActive =
        link.getAttribute("href") === `#${activeSection}`;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateScrollUI, {
    passive: true
  });

  updateScrollUI();

  // ========================================
  // 7. CONTACT FORM
  // ========================================
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form && status) {
    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const subjectInput = document.getElementById("contactSubject");
    const messageInput = document.getElementById("contactMessage");

    // Your email address
    const recipient = "sarbajitsahoo24983@gmail.com";

    form.addEventListener("submit", event => {
      event.preventDefault();

      status.textContent = "";
      status.className = "form-status";

      if (!form.reportValidity()) return;

      if (!nameInput || !emailInput ||
          !subjectInput || !messageInput) {
        status.textContent = "Contact form fields are missing.";
        status.classList.add("error");
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !email || !subject || !message) {
        status.textContent = "Please fill in all fields.";
        status.classList.add("error");
        return;
      }

      const emailSubject = encodeURIComponent(subject);

      const emailBody = encodeURIComponent(
        `Hello Sarbajit,\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`
      );

      const mailtoURL =
        `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

      status.textContent =
        "Opening your email app. Please review and send your message.";

      status.classList.add("success");

      window.location.href = mailtoURL;
    });

    form.addEventListener("input", () => {
      if (status.classList.contains("error")) {
        status.textContent = "";
        status.className = "form-status";
      }
    });
  }

  // ========================================
  // 8. INSTAGRAM ACCOUNT POPUP
  // ========================================
  const instagramToggle =
    document.getElementById("instagramToggle");

  const instaOverlay =
    document.getElementById("instaOverlay");

  const instaClose =
    document.getElementById("instaClose");

  function openInstagramPopup() {
    if (!instaOverlay) return;

    instaOverlay.classList.add("active");
    instaOverlay.setAttribute("aria-hidden", "false");

    if (instagramToggle) {
      instagramToggle.setAttribute("aria-expanded", "true");
    }

    if (instaClose) {
      instaClose.focus();
    }
  }

  function closeInstagramPopup() {
    if (!instaOverlay) return;

    instaOverlay.classList.remove("active");
    instaOverlay.setAttribute("aria-hidden", "true");

    if (instagramToggle) {
      instagramToggle.setAttribute("aria-expanded", "false");
      instagramToggle.focus();
    }
  }

  if (instagramToggle && instaOverlay && instaClose) {

    instagramToggle.addEventListener(
      "click",
      openInstagramPopup
    );

    instaClose.addEventListener(
      "click",
      closeInstagramPopup
    );

    instaOverlay.addEventListener("click", event => {
      if (event.target === instaOverlay) {
        closeInstagramPopup();
      }
    });

    document.addEventListener("keydown", event => {
      if (
        event.key === "Escape" &&
        instaOverlay.classList.contains("active")
      ) {
        closeInstagramPopup();
      }
    });

    console.log("Instagram popup initialized successfully.");

  } else {
    console.error(
      "Instagram popup setup failed. Check these HTML IDs:",
      {
        instagramToggle: Boolean(instagramToggle),
        instaOverlay: Boolean(instaOverlay),
        instaClose: Boolean(instaClose)
      }
    );
  }

  console.log("Portfolio JavaScript loaded successfully.");

});

const scriptURL = "https://script.google.com/macros/s/AKfycby_hspdFZBs5RGU51wkZu2c4K6xm6rzo-DSFNsPTi-DdghpHcCdpKIuFaix7JiwiA6HGg/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("Contact form #contactForm not found.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name =
      form.querySelector('[name="name"]')?.value.trim() || "";

    const email =
      form.querySelector('[name="email"]')?.value.trim() || "";

    const subject =
      form.querySelector('[name="subject"]')?.value.trim() || "";

    const message =
      form.querySelector('[name="message"]')?.value.trim() || "";

    if (!name || !email || !message) {
      alert("Please fill in your name, email and message.");
      return;
    }

    if (!scriptURL.startsWith("https://script.google.com/macros/s/AKfycby_hspdFZBs5RGU51wkZu2c4K6xm6rzo-DSFNsPTi-DdghpHcCdpKIuFaix7JiwiA6HGg/exec") ||
        !scriptURL.endsWith("/exec")) {
      alert("Please add your correct deployed Apps Script URL.");
      return;
    }

    const button = form.querySelector('[type="submit"]');
    const oldText = button ? button.textContent : "";

    try {
      if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
      }

      const body = new URLSearchParams({
        name,
        email,
        subject,
        message
      });

      // Google Apps Script cross-origin request
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body
      });

      alert(
        "Request sent. Please verify the Messages sheet and email."
      );

      form.reset();

    } catch (error) {
      console.error("Contact form error:", error);
      alert("Request failed. Please check your internet and Apps Script URL.");

    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = oldText;
      }
    }
  });
});
