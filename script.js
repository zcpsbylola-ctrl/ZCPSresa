// Configuration centralisée
// Le numéro WhatsApp est maintenant récupéré dynamiquement depuis l'attribut data-whatsapp-number du bouton.
// Fallback au cas où l'attribut ne serait pas défini.
const FALLBACK_WHATSAPP_NUMBER = "33612345678";

// Utilitaires
function buildWhatsAppUrl(dateStr, timeStr) {
  const btn = el("whatsappBtn");
  const whatsappNumber = btn.dataset.whatsappNumber || FALLBACK_WHATSAPP_NUMBER;
  const message = `Bonjour Lola, je souhaite réserver le créneau du ${dateStr} ${timeStr} ZCPS 💫`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encoded}`;
}

function el(id) { return document.getElementById(id); }

// Initialisation Flatpickr
document.addEventListener("DOMContentLoaded", function () {
  const dateInput = el("datePicker");
  const timeInput = el("timePicker");
  const btn = el("whatsappBtn");
  const summary = el("summary");
  const errorMsg = el("error-message");

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
    
    let isAvailable = false;
    if (ok) {
        isAvailable = window.isSlotAvailable(date, time);
    }

    const finalOk = ok && isAvailable;

    btn.classList.toggle("enabled", finalOk);
    btn.disabled = !finalOk;
    btn.setAttribute("aria-disabled", (!finalOk).toString());
    
    if (finalOk) {
        summary.textContent = `Créneau choisi : ${date} ${time} 💫`;
        errorMsg.textContent = ""; // Clear error message on successful selection
    } else if (ok && !isAvailable) {
        summary.textContent = `Créneau choisi : ${date} ${time} ❌`;
        errorMsg.textContent = "Ce créneau ou le battement de 30 minutes autour est déjà réservé. Veuillez choisir une autre heure. 💫";
    } else {
        summary.textContent = "";
        errorMsg.textContent = "";
    }
  }

  // Initial state
  updateButtonState();

  // Click handler
  btn.addEventListener("click", function () {
    const date = getDateValue();
    const time = getTimeValue();
    
    if (!date || !time) {
      errorMsg.textContent = "Veuillez choisir une date et une heure pour votre réservation 💫";
      return;
    }

    // Double-check availability before redirect
    if (!window.isSlotAvailable(date, time)) {
        errorMsg.textContent = "Ce créneau n'est plus disponible. Veuillez choisir une autre heure. 💫";
        // Mettre à jour l'état du bouton pour être sûr qu'il est désactivé
        updateButtonState(); 
        return;
    }

    errorMsg.textContent = ""; // Clear error message before redirect
    const url = buildWhatsAppUrl(date, time);
    window.location.href = url;
  });

  // Lightweight touch optimization: ensure inputs are easily tappable
  document.querySelectorAll(".input, .picker, #whatsappBtn").forEach(node => {
    node.style.touchAction = "manipulation";
  });
});
