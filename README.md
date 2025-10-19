# ZCPS Réservation Mobile 💫

Système de réservation privé pour **Ze CoffeePorn Shop by Lola**, accessible uniquement via WhatsApp Business.

---

## 🎯 Objectif

Permettre aux clientes de réserver un créneau **à la minute près** via une interface fluide et tactile, avec redirection WhatsApp pré-remplie.

---

## 🧩 Fonctionnalités

- ✅ **Calendrier cliquable** : Flatpickr pour la sélection de date
- ✅ **Sélecteur d'heure précis** : Clocklet pour l'heure à la minute près
- ✅ **Message WhatsApp pré-rempli** : Redirection directe avec détails de réservation
- ✅ **Logo ZCPS intégré** : Assets HD fournis
- ✅ **Trois variantes CSS** : Luxe minimaliste, Tactile texturée, Moderne contrastée
- ✅ **Confidentialité** : Meta robots noindex + robots.txt pour non-indexation
- ✅ **Mobile-first** : Responsive design optimisé pour iOS et Android

---

## 📁 Structure du projet

```
zcps-reservation/
├── index.html                      # Page principale
├── script.js                       # Logique Flatpickr + Clocklet + WhatsApp
├── style.css                       # Style par défaut (Luxe minimaliste)
├── style-luxe-minimaliste.css      # Variante 1 : Épuré et élégant
├── style-tactile-texturee.css      # Variante 2 : Matière et relief
├── style-moderne-contrastee.css    # Variante 3 : Sombre et contrasté
├── robots.txt                      # Bloque l'indexation
└── ../images/
    ├── logo_zcps_1.jpg             # Logo neon (variante alternative)
    ├── logo_zcps_2.jpg             # Logo doré "By Lola"
    └── logo_zcps_3.png             # Logo doré principal (utilisé par défaut)
```

---

## 🎨 Trois variantes CSS à tester

### 1️⃣ **Luxe Minimaliste** (style.css)
- **Palette** : Crème + doré
- **Style** : Ultra épuré, élégance discrète
- **Bouton** : Doré avec texte marron
- **Idéal pour** : Clients cherchant la sobriété haut de gamme

### 2️⃣ **Tactile Texturée** (style-tactile-texturee.css)
- **Palette** : Crème + doré avec textures subtiles
- **Style** : Matière, relief discret, sensation tactile
- **Bouton** : Gradient doré avec ombre et animation
- **Idéal pour** : Clients cherchant l'interaction fluide et le feedback visuel

### 3️⃣ **Moderne Contrastée** (style-moderne-contrastee.css)
- **Palette** : Fond noir + doré
- **Style** : Hiérarchie typographique marquée, contraste élevé
- **Bouton** : Doré sur fond sombre avec glow
- **Idéal pour** : Clients cherchant l'impact visuel moderne

---

## 🚀 Déploiement

### Option 1 : Netlify (Recommandé)

1. Créer un repo GitHub (public ou privé)
2. Pousser les fichiers du dossier `zcps-reservation/zcps/`
3. Connecter le repo à Netlify
4. Déployer automatiquement
5. Partager l'URL uniquement via WhatsApp Business

### Option 2 : Vercel

1. Créer un repo GitHub
2. Importer le repo dans Vercel
3. Déployer
4. Partager l'URL via WhatsApp Business

### Option 3 : GitHub Pages

1. Créer un repo `zcps-reservation`
2. Pousser les fichiers
3. Activer GitHub Pages dans les paramètres
4. Partager l'URL via WhatsApp Business

---

## 🧪 Tests fonctionnels

### Sur iOS Safari
- [ ] Calendrier Flatpickr tactile
- [ ] Sélecteur Clocklet fluide
- [ ] Bouton WhatsApp ouvre l'app
- [ ] Message pré-rempli correct

### Sur Android Chrome
- [ ] Calendrier Flatpickr tactile
- [ ] Sélecteur Clocklet fluide
- [ ] Bouton WhatsApp ouvre l'app
- [ ] Message pré-rempli correct

### Vérifications de confidentialité
- [ ] Meta robots `noindex, nofollow` présent
- [ ] robots.txt bloque l'indexation
- [ ] URL non indexée sur Google
- [ ] Partage exclusif via WhatsApp Business

---

## 🔧 Personnalisation

### Changer le numéro WhatsApp

Éditer `script.js` ligne 2 :
```javascript
const whatsappNumber = "33612345678"; // Remplacer par le numéro de Lola
```

### Changer le logo

Éditer `index.html` ligne 14 :
```html
<img src="../images/logo_zcps_3.png" alt="Logo ZCPS" class="logo" />
```

Options disponibles :
- `logo_zcps_1.jpg` : Logo neon
- `logo_zcps_2.jpg` : Logo doré "By Lola"
- `logo_zcps_3.png` : Logo doré principal

### Changer la variante CSS

Éditer `index.html` ligne 11 :
```html
<link rel="stylesheet" href="style-luxe-minimaliste.css">
<!-- ou -->
<link rel="stylesheet" href="style-tactile-texturee.css">
<!-- ou -->
<link rel="stylesheet" href="style-moderne-contrastee.css">
```

---

## 📱 Workflow d'équipe

### Lola (Design & Assets)
- Valide la palette et la typographie
- Choisit la variante CSS finale
- Approuve les micro-interactions

### Manu (Intégration & UX)
- Intègre Clocklet + Flatpickr
- Peaufine l'ergonomie tactile
- Teste sur iOS/Android
- Prépare le déploiement

---

## 🔒 Confidentialité

- **Meta robots** : `noindex, nofollow` → Empêche l'indexation
- **robots.txt** : `Disallow: /` → Bloque les crawlers
- **Partage** : Exclusivement via WhatsApp Business
- **Pas d'API externe** : Liberté totale, aucune dépendance

---

## 📞 Support

Pour toute question ou ajustement :
- Contacter Lola pour les décisions design
- Contacter Manu pour les modifications techniques

---

**Créé avec 💫 pour ZCPS by Lola**

