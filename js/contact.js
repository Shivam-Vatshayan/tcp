/* ============================================
   CONTACT.JS — FAQ accordion + form handling
   ============================================ */

(function () {
  "use strict";

  // FAQ accordion
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      faqItems.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Contact form — client-side validation + friendly confirmation
  var form = document.getElementById("contact-form");
  var successBox = document.getElementById("form-success");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.querySelector("#name");
      var phone = form.querySelector("#phone");
      var message = form.querySelector("#message");
      var valid = true;

      [name, phone, message].forEach(function (field) {
        if (field && !field.value.trim()) {
          field.style.borderColor = "#C41E24";
          valid = false;
        } else if (field) {
          field.style.borderColor = "";
        }
      });

      if (!valid) return;

      if (successBox) {
        successBox.classList.add("visible");
        successBox.textContent = "Thanks, " + name.value.trim() + " — we've received your message and will get back to you shortly. For a faster reply, message us on WhatsApp.";
      }

      form.reset();
    });
  }
})();
