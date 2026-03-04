// Fichier de simulation pour les créneaux réservés (Base de données simulée)
// Format: "YYYY-MM-DD HH:mm"
// Ces créneaux simulent des réservations déjà prises.
// Le format Date est utilisé pour faciliter les comparaisons en JS.

const RESERVED_SLOTS_RAW = [
    "2025-10-24 10:00", // Exemple de créneau déjà pris
    "2025-10-24 14:30",
    "2025-10-25 11:00",
    "2025-10-25 11:30", // Créneau pris avec un battement de 30 minutes
    "2025-10-26 16:00",
];

// Convertir les chaînes en objets Date pour une manipulation plus aisée
const RESERVED_SLOTS = RESERVED_SLOTS_RAW.map(slot => new Date(slot));

// Fonction pour vérifier si un créneau est disponible
function isSlotAvailable(date, time) {
    // Combine la date (jj/mm/aaaa) et l'heure (HH:mm) en un objet Date
    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    // Note: month est 0-indexé en JavaScript, donc on retire 1
    const selectedDateTime = new Date(year, month - 1, day, hours, minutes);

    // Vérifier si le créneau sélectionné chevauche un créneau réservé ou son battement
    for (const reservedSlot of RESERVED_SLOTS) {
        // Le créneau réservé prend 30 minutes
        const reservedEnd = new Date(reservedSlot.getTime() + 30 * 60000); // 30 minutes après le début

        // Le créneau sélectionné prend 30 minutes
        const selectedEnd = new Date(selectedDateTime.getTime() + 30 * 60000);

        // Définir la plage de temps à éviter autour du créneau réservé (Battement de 30 minutes)
        // La plage va de 30 minutes avant le début du créneau réservé à la fin du créneau réservé (30 minutes après)
        const avoidanceStart = new Date(reservedSlot.getTime() - 30 * 60000);
        const avoidanceEnd = reservedEnd;

        // Condition de chevauchement : [selectedDateTime, selectedEnd] chevauche [avoidanceStart, avoidanceEnd]
        if (selectedDateTime < avoidanceEnd && selectedEnd > avoidanceStart) {
            return false; // Créneau non disponible
        }
    }

    // Vérifier si le créneau est dans le passé
    const now = new Date();
    // On considère que le créneau est dans le passé si l'heure de fin du créneau sélectionné est passée.
    if (selectedEnd <= now) {
        return false;
    }

    return true; // Créneau disponible
}

// Exposer la fonction pour le script principal
window.isSlotAvailable = isSlotAvailable;
window.RESERVED_SLOTS = RESERVED_SLOTS; // Exposer pour d'éventuels tests ou affichages
