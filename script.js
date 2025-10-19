// Configuration centralisée
const WHATSAPP_NUMBER = "33612345678"; // remplacer par le numéro de Lola en format international sans + ni espaces

// Utilitaires
function buildWhatsAppUrl(dateStr, timeStr) {
  const message = `Bonjour Lola, je souhaite réserver le créneau du ${dateStr} ${timeStr} ZCPS 💫`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function el(id) { return document.getElementById(id); }

// Initialisation Flatpickr
document.addEventListener("DOMContentLoaded", function () {
  const dateInput = el("datePicker");
  const timeInput = el("timePicker");
  const btn = el("whatsappBtn");
  const summary = el("summary");

  // Flatpickr mobile-friendly
  if (window.flatpickr) {
    flatpickr(dateInput, {
      dateFormat: "d/m/Y",
      minDate: "today",
      defaultDate: null,
      allowInput: false,
      onChange: updateButtonState
    });
  }

  // Clocklet init if available
  if (window.clocklet && typeof clocklet.init === "function") {
    // Clocklet expects an element; adapt if your Clocklet build differs
    clocklet.init({
      element: timeInput,
      format: "HH:mm",
      minuteStep: 1,
      onChange: updateButtonState
    });
  } else {
    // Fallback simple time picker for mobile browsers using input type time
    const fallback = document.createElement("input");
    fallback.type = "time";
    fallback.id = "timePickerFallback";
    fallback.className = "input picker";
    fallback.style.display = "block";
    fallback.style.width = "100%";
    timeInput.parentNode.replaceChild(fallback, timeInput);
    fallback.addEventListener("change", updateButtonState);
  }

  // Update button state logic
  function getDateValue() {
    return dateInput.value && dateInput.value.trim() !== "" ? dateInput.value.trim() : "";
  }
  function getTimeValue() {
    const t = (el("timePicker") || el("timePickerFallback"));
    return t && t.value && t.value.trim() !== "" ? t.value.trim() : "";
  }

  function updateButtonState() {
    const date = getDateValue();
    const time = getTimeValue();
    const ok = Boolean(date && time);
    btn.classList.toggle("enabled", ok);
    btn.disabled = !ok;
    btn.setAttribute("aria-disabled", (!ok).toString());
    summary.textContent = ok ? `Créneau choisi : ${date} ${time} 💫` : "";
  }

  // Initial state
  updateButtonState();

  // Click handler
  btn.addEventListener("click", function () {
    const date = getDateValue();
    const time = getTimeValue();
    if (!date || !time) {
      alert("Veuillez choisir une date et une heure pour votre réservation 💫");
      return;
    }
    const url = buildWhatsAppUrl(date, time);
    window.location.href = url;
  });

  // Lightweight touch optimization: ensure inputs are easily tappable
  document.querySelectorAll(".input, .picker, #whatsappBtn").forEach(node => {
    node.style.touchAction = "manipulation";
  });
});
