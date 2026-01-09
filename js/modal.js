(function () {

  function openModal() {
    const modal = document.getElementById("request-modal");
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const modal = document.getElementById("request-modal");
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // 🔥 OPEN (delegated — mobile safe)
  document.addEventListener("click", function (e) {
    if (e.target.closest(".js-open-request-form")) {
      e.preventDefault();
      openModal();
    }
  });

  // 🔥 CLOSE
  document.addEventListener("click", function (e) {
    if (
      e.target.closest(".request-modal__overlay") ||
      e.target.closest(".request-modal__close")
    ) {
      closeModal();
    }
  });

  // ESC close
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

})();


document.addEventListener("click", e => {
  if (e.target.closest(".js-open-request-form")) {
    console.log("BUTTON CLICK DETECTED");
  }
});

// WhatsApp Integration for Request Form
(function () {
  const form = document.getElementById("request-online-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form
    if (!form.checkValidity()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Collect form data
    const name = document.getElementById("ro-name").value;
    const company = document.getElementById("ro-company").value;
    const email = document.getElementById("ro-email").value;
    const phone = document.getElementById("ro-phone").value;
    const service = document.getElementById("ro-service").value;
    const location = document.getElementById("ro-location").value;
    const message = document.getElementById("ro-message").value;
    const budget = document.getElementById("ro-budget").value;
    const contactPref = document.getElementById("ro-contact-pref").value;

    // Create WhatsApp message
    const whatsappMessage = `Hi Cartospatial Technologies,

I would like to request a quote for your services.

*Personal Details:*
Name: ${name}
${company ? `Company: ${company}` : ""}
Email: ${email}
Phone: ${phone}

*Project Details:*
Required Service: ${service}
Site Location: ${location}
Project Details: ${message}
${budget ? `Estimated Budget: ${budget}` : ""}

Preferred Contact Method: ${contactPref}

Please get back to me with a quote at your earliest convenience.

Thank you!`;

    // WhatsApp number with country code (India: +91)
    const whatsappNumber = "919843500114"; // +91 country code + number
    
    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Close the modal
    const modal = document.getElementById("request-modal");
    if (modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    // Show confirmation and open WhatsApp
    setTimeout(() => {
      alert("Thank you for your enquiry! Opening WhatsApp for direct communication...");
      window.open(whatsappUrl, "_blank");
    }, 300);

    // Reset form
    form.reset();
  });
})();
