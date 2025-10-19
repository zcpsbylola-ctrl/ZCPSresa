# ✅ Checklist de Tests ZCPS Réservation

## 📋 Tests Fonctionnels

### Sélecteur de Date (Flatpickr)

- [ ] **iOS Safari** : Calendrier s'ouvre au clic
- [ ] **iOS Safari** : Dates sélectionnables au doigt
- [ ] **iOS Safari** : Date affichée au format `d/m/Y`
- [ ] **Android Chrome** : Calendrier s'ouvre au clic
- [ ] **Android Chrome** : Dates sélectionnables au doigt
- [ ] **Android Chrome** : Date affichée au format `d/m/Y`
- [ ] **Validation** : Impossible de sélectionner une date passée
- [ ] **Validation** : Aujourd'hui est sélectionnable

### Sélecteur d'Heure (Clocklet)

- [ ] **iOS Safari** : Interface horloge s'affiche
- [ ] **iOS Safari** : Heure sélectionnable à la minute près
- [ ] **iOS Safari** : Heure affichée au format `HH:mm`
- [ ] **Android Chrome** : Interface horloge s'affiche
- [ ] **Android Chrome** : Heure sélectionnable à la minute près
- [ ] **Android Chrome** : Heure affichée au format `HH:mm`
- [ ] **Précision** : Minuteur incrémente de 1 minute

### Affichage du Récapitulatif

- [ ] **Avant sélection** : Aucun texte affiché
- [ ] **Après date** : Texte vide jusqu'à sélection d'heure
- [ ] **Après heure** : Texte affiche `Créneau choisi : d/m/Y HH:mm 💫`
- [ ] **Couleur** : Texte en doré (#d4af37)
- [ ] **Mise à jour** : Récapitulatif se met à jour en temps réel

### Bouton WhatsApp

- [ ] **État initial** : Bouton désactivé (grisé)
- [ ] **Après sélection** : Bouton activé (vert/doré selon variante)
- [ ] **Au clic** : Ouvre WhatsApp avec message pré-rempli
- [ ] **Message** : Format `Bonjour Lola, je souhaite réserver le créneau du d/m/Y HH:mm ZCPS 💫`
- [ ] **Encodage** : Caractères spéciaux correctement encodés
- [ ] **Feedback** : Hover effect visible sur desktop

### Gestion des Erreurs

- [ ] **Sans date** : Message d'erreur si clic sans sélection
- [ ] **Sans heure** : Message d'erreur si clic sans sélection
- [ ] **Texte erreur** : `Veuillez choisir une date et une heure pour votre réservation 💫`
- [ ] **Couleur erreur** : Texte en rouge (#c0392b ou #e74c3c selon variante)

---

## 🎨 Tests Visuels par Variante

### Variante 1 : Luxe Minimaliste

- [ ] **Fond** : Gradient crème (#fff8f0 → #fffaf5)
- [ ] **Titre** : Doré (#d4af37), uppercase, lettrage espacé
- [ ] **Logo** : Ombre subtile, max 220px
- [ ] **Champs** : Bordure fine dorée, fond crème clair
- [ ] **Bouton** : Doré uni, texte marron, bordures carrées (2px)
- [ ] **Hover** : Couleur plus foncée, ombre légère
- [ ] **Calendrier** : Bordure dorée, sélection dorée
- [ ] **Horloge** : Bordure dorée, aiguilles dorées

### Variante 2 : Tactile Texturée

- [ ] **Fond** : Gradient crème avec texture subtile
- [ ] **Titre** : Doré avec ombre de texte
- [ ] **Logo** : Ombre prononcée, scale au hover
- [ ] **Champs** : Bordure épaisse dorée, ombre interne, arrondi 8px
- [ ] **Placeholder** : Doré semi-transparent
- [ ] **Bouton** : Gradient doré, ombre prononcée, animation shine
- [ ] **Hover** : Ombre augmentée, translateY(-2px)
- [ ] **Calendrier** : Ombre prononcée, gradient sur sélection
- [ ] **Horloge** : Ombre, gradient sur aiguilles

### Variante 3 : Moderne Contrastée

- [ ] **Fond** : Gradient sombre (#1a1a1a → #2d2d2d)
- [ ] **Titre** : Doré, uppercase, ombre de texte
- [ ] **Logo** : Ombre dorée prononcée, scale au hover
- [ ] **Champs** : Bordure dorée, fond sombre, texte clair
- [ ] **Placeholder** : Doré semi-transparent
- [ ] **Bouton** : Gradient doré, ombre prononcée, glow au hover
- [ ] **Hover** : Glow accru, gradient plus clair
- [ ] **Calendrier** : Fond sombre, bordure dorée, texte clair
- [ ] **Horloge** : Fond sombre, bordure dorée, aiguilles dorées

---

## 📱 Tests Responsive

### Desktop (1024px+)

- [ ] **Layout** : Centré, max-width respecté
- [ ] **Logo** : 220px max
- [ ] **Champs** : 300px max
- [ ] **Espacement** : Proportions correctes
- [ ] **Bouton** : Taille lisible, hover visible

### Tablet (768px - 1024px)

- [ ] **Logo** : 180px max
- [ ] **Champs** : 300px max
- [ ] **Bouton** : Padding réduit, font-size 1rem
- [ ] **Espacement** : Padding 1rem

### Mobile (480px - 768px)

- [ ] **Logo** : 150px max
- [ ] **Champs** : 90% width
- [ ] **Bouton** : Padding 0.8rem, font-size 1rem
- [ ] **Zones tactiles** : Minimum 44px hauteur

### Mobile Small (<480px)

- [ ] **Logo** : 150px max
- [ ] **Champs** : 90% width, font-size 1rem
- [ ] **Bouton** : Padding 0.7rem 1.8rem, font-size 0.9rem
- [ ] **Lisibilité** : Texte lisible sans zoom
- [ ] **Zones tactiles** : Minimum 44px hauteur

---

## 🔒 Tests de Confidentialité

### Meta Tags

- [ ] **robots** : `<meta name="robots" content="noindex, nofollow" />` présent
- [ ] **viewport** : `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` présent

### robots.txt

- [ ] **Fichier présent** : À la racine du site
- [ ] **Contenu correct** :
  ```
  User-agent: *
  Disallow: /
  ```

### Vérification Google

- [ ] **Google Search Console** : URL non indexée
- [ ] **Google Cache** : Pas de cache disponible
- [ ] **Bing Webmaster** : URL non indexée

### Partage WhatsApp

- [ ] **Lien fonctionnel** : Cliquable dans WhatsApp
- [ ] **Aperçu** : Pas d'aperçu généré par WhatsApp
- [ ] **Accès** : Uniquement via lien direct

---

## 🔧 Tests Techniques

### Performance

- [ ] **Temps de chargement** : < 2s sur 4G
- [ ] **Flatpickr** : Charge correctement
- [ ] **Clocklet** : Charge correctement
- [ ] **Pas d'erreurs console** : DevTools clean

### Compatibilité

- [ ] **iOS 14+** : Fonctionnel
- [ ] **iOS 15+** : Fonctionnel
- [ ] **iOS 16+** : Fonctionnel
- [ ] **Android 10+** : Fonctionnel
- [ ] **Android 11+** : Fonctionnel
- [ ] **Android 12+** : Fonctionnel

### Sécurité

- [ ] **HTTPS** : Connexion sécurisée
- [ ] **Pas de données sensibles** : Aucune donnée stockée
- [ ] **Pas de tracking** : Aucun GA/analytics
- [ ] **Pas d'API externe** : Indépendant

---

## 📝 Rapport de Test

### Variante choisie

- [ ] **Luxe Minimaliste**
- [ ] **Tactile Texturée**
- [ ] **Moderne Contrastée**

### Ajustements demandés

```
[Lister les ajustements si nécessaire]
```

### Validations finales

- [ ] **Design** : Approuvé par Lola
- [ ] **Fonctionnalité** : Testée sur iOS et Android
- [ ] **Confidentialité** : Vérifiée
- [ ] **Performance** : Optimisée
- [ ] **Déploiement** : Prêt

---

**Date de test** : _______________

**Testeur** : _______________

**Validateur** : _______________

