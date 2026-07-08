# CLAUDE.md — Règles projet

Ce fichier définit comment traduire les entrées Figma (via le MCP) en code pour ce projet.
**Ces règles priment sur les valeurs lues dans le fichier Figma** : si une valeur arrive en dur alors qu'un token existe, c'est le token qui gagne.

> ⚙️ **À confirmer / ajuster** : Framework supposé = **Next.js (App Router)** · Styling = **Tailwind CSS** · Langue de contenu = **français** · Unité cible = **rem (base 16px)**.

---

## 1. Workflow de génération (ne pas sauter d'étape)

1. `get_design_context` d'abord, sur le(s) nœud(s) exact(s).
2. Si la réponse est trop large ou tronquée → `get_metadata` pour la carte des nœuds, puis re-fetch ciblé.
3. `get_screenshot` pour la référence visuelle de la variante implémentée.
4. Seulement ensuite : télécharger les assets et coder.
5. Traduire la sortie (React + Tailwind) vers les conventions de ce projet. **Toujours réutiliser les tokens, composants et typographies existants — ne jamais réinventer une valeur qui existe déjà comme token.**

**Règles dures :**

- Aucune taille, couleur ou espacement **en dur**. Tout passe par un token / une classe utilitaire mappée.
- **Toutes les dimensions en `rem`** (base 16px). Convertir systématiquement les `px` lus dans Figma → `rem` (px ÷ 16). Les interlignes restent **sans unité** (ratios).
- Aucun positionnement absolu issu d'un layout : respecter l'Auto Layout (→ flex + gap + padding).
- Réutiliser les composants existants (voir §5), ne pas en recréer de plausibles.

---

## 2. Typographie

Deux familles uniquement :

- `font-sans` → **Inter**
- `font-display` → **Verve** (toujours préciser explicitement la famille, elle n'est pas le défaut)

Tokens **sémantiques par rôle** (et non l'échelle brute Tailwind) : un text style empaquette taille + interligne + graisse, ce que `text-lg` & co ne portent pas. Garder le token de rôle comme source unique.

Mapping **style Figma → classe Tailwind** :

| Style Figma        | Classe Tailwind                     | Famille | Taille (rem / px) | Interligne | Graisse | Usage                                                           |
| ------------------ | ----------------------------------- | ------- | ----------------- | ---------- | ------- | --------------------------------------------------------------- |
| `Display/Hero`     | `font-display text-display-hero`    | Verve   | 17.625rem / 282   | 0.95       | 400     | Heading Hero (unique, décoratif)                                |
| `Display/Subhero`  | `text-display-subhero`              | Inter   | 3.875rem / 62     | 1.05       | 600     | Subheading Hero (unique)                                        |
| `Display/Section`  | `font-display text-display-section` | Verve   | 8.25rem / 132     | 1.0        | 400     | Titres « Visites signatures » & « FAQ » + lettrine « À propos » |
| `Heading/Question` | `text-heading-question`             | Inter   | 1.5rem / 24       | 1.3        | 600     | Questions de la FAQ                                             |
| `Heading/Card`     | `text-heading-card`                 | Inter   | 1.375rem / 22     | 1.3        | 600     | Titres des cards de visite                                      |
| `Body/Lead`        | `text-body-lead`                    | Inter   | 1.5rem / 24       | 1.5        | 400     | Texte du Hero                                                   |
| `Body/Base`        | `text-body-base`                    | Inter   | 1.125rem / 18     | 1.6        | 400     | Texte de base                                                   |
| `UI/Nav`           | `text-ui-nav`                       | Inter   | 1.125rem / 18     | 1.2        | 600     | NavItems                                                        |
| `UI/Tag`           | `text-ui-tag`                       | Inter   | 0.875rem / 14     | 1.4        | 400     | Tags (prix / durée)                                             |

> **Coïncidences avec l'échelle Tailwind par défaut** (info, mais on garde les tokens de rôle pour la graisse + l'interligne) : `1.5rem` = `text-2xl` · `1.125rem` = `text-lg` · `0.875rem` = `text-sm`.

Définition des tokens (dans `tailwind.config`) :

```js
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  display: ['Verve', 'serif'], // ajuster la fallback
},
fontSize: {
  // [taille rem, { lineHeight (sans unité), fontWeight }]
  'display-hero':     ['17.625rem', { lineHeight: '0.95', fontWeight: '400' }],
  'display-subhero':  ['3.875rem',  { lineHeight: '1.05', fontWeight: '600' }],
  'display-section':  ['8.25rem',   { lineHeight: '1',    fontWeight: '400' }],
  'heading-question': ['1.5rem',    { lineHeight: '1.3',  fontWeight: '600' }],
  'heading-card':     ['1.375rem',  { lineHeight: '1.3',  fontWeight: '600' }],
  'body-lead':        ['1.5rem',    { lineHeight: '1.5',  fontWeight: '400' }],
  'body-base':        ['1.125rem',  { lineHeight: '1.6',  fontWeight: '400' }],
  'ui-nav':           ['1.125rem',  { lineHeight: '1.2',  fontWeight: '600' }],
  'ui-tag':           ['0.875rem',  { lineHeight: '1.4',  fontWeight: '400' }],
}
```

> Les interlignes ci-dessus sont des défauts raisonnables : aligner sur les valeurs réelles du fichier Figma si elles diffèrent.

---

## 3. Couleurs & spacing

Seuls deux types de tokens existent dans ce projet : **couleurs** et **spacing**. (Pas de tokens radius ni ombres.)

- **Couleurs** : liées à des variables Figma → mapper vers les tokens couleur Tailwind du projet. Aucun hex en dur.
- **Spacing** (padding / gap) : lié aux variables Figma → utilitaires d'espacement Tailwind, **en rem**. Aucune valeur d'espacement tapée à la main.
- Une valeur d'espacement à **0** ne produit aucune classe (pas de `px-0` inutile) sauf nécessité explicite.

---

## 4. Conventions de nommage (Figma → code)

Le nom du calque = le rôle/champ attendu dans le code. Priorité à la **clarté sémantique et la cohérence**, pas à une casse précise.

- **Noms sémantiques**, déjà en place (`FAQ Item`, `Question Title`, `Icon Container`, `Description`, `SignatureCard`…). Le Title Case avec espaces est exploitable : Claude Code convertit la casse au moment du code (`FAQ Item` → `FaqItem`).
- **Frames de layout & calques internes** → nom de rôle ou de champ : `CardImage`, `CardContent`, `TagList`, `title`, `price`, `duration`.
- **Interdits** : `Frame 47`, `Group 12`, noms purement visuels (`Rectangle bleu`).
- Le **statut** d'un calque (placeholder, champ CMS) va dans **une annotation / dev resource**, jamais dans le nom.
- Vérifier que les calques **masqués** le sont volontairement (un nœud caché peut fuiter dans le code généré).

---

## 5. Composants & Code Connect

- Tous les composants Figma sont liés à leur composant React via **Code Connect** → réutiliser le composant existant, ne pas en générer un nouveau.
- Les composants exposent leur contenu en **props** : textes en propriétés de texte, image en **instance swap**, éléments optionnels (badge, tag absent) en propriété **boolean**, états (FAQ ouvert/fermé) en **variantes**.
- Une image de contenu est un fill avec **ratio fixe**, jamais une taille en dur.
- Les icônes sont des **vecteurs/composants** → exporter en SVG inline, pas en image aplatie.

### Effets uniques du Hero (traitement spécial)

`Display/Hero` (Verve 282) et `Display/Subhero` (Inter 62) sont des **effets décoratifs uniques** avec un positionnement spécifique.

- Ne pas les traiter comme du texte standard : se référer au screenshot pour le placement.
- Leurs tailles énormes **doivent** passer par les tokens responsives (voir §7) — ne jamais les figer en dur.

---

## 6. Modèle de données — Collection CMS « Visites »

Chaque visite a une **page dédiée** sur le site (template + collection). La **card** de la homepage est l'item de liste qui pointe vers cette page détail. Les noms ci-dessous sont le **fil unique** : champ CMS = nom de calque Figma = prop React.

| Champ CMS           | Identifiant (`field` / layer / prop) | Type                       | Rendu / notes                                                           |
| ------------------- | ------------------------------------ | -------------------------- | ----------------------------------------------------------------------- |
| Titre               | `title`                              | texte                      | `Heading/Card` sur la card, titre de page sur le détail                 |
| Description Card    | `cardDescription`                    | texte                      | visible sur la card uniquement                                          |
| Description longue  | `longDescription`                    | texte multi-lignes         | page détail ; préserver les sauts de ligne                              |
| Durée               | `duration`                           | texte (ex. `2h`)           | tag, style `UI/Tag`                                                     |
| Prix                | `price`                              | texte (ex. `45€/personne`) | tag, style `UI/Tag`                                                     |
| Lignes de métro     | `metroLines`                         | liste de SVG               | tableau d'icônes SVG inline ; itérer, ne pas aplatir                    |
| Illustration        | `cover`                              | image png/jpeg             | fill à ratio fixe ; **slot dynamique**, pas une déco                    |
| Avis                | `rating`                             | nombre 1–5                 | rendu en étoiles ; valeur bornée 1–5                                    |
| Lien de réservation | `bookingUrl`                         | URL **externe**            | bouton de réservation ; `target="_blank"` + `rel="noopener noreferrer"` |
| Lien page détail    | `slug`                               | texte (URL interne)        | route de la page dédiée : `/visites/[slug]`                             |

### Routage

- La **card** de la homepage est entièrement cliquable et wrappée dans un lien **interne** vers la page détail : `<Link href={\`/visites/${slug}\`}>`.
- Le **`bookingUrl`** est un lien **externe** (réservation), distinct du `slug` : il vit dans le bouton de réservation sur la page détail, pas sur la card.

### Pages à designer (pas une par visite)

- 1 page template **Tour Detail** avec tous les slots ci-dessus, nommés et annotés.
- 1–2 variantes d'exemple pour les cas limites (description courte vs longue, avec/sans galerie).
- La **card homepage** = item de liste → `title`, `cover`, `price`, `duration`, lien vers `/visites/[slug]`.

---

## 7. Responsive / Mobile

Le design est fait en desktop ; il n'y a **pas** de maquette mobile dédiée ni de mode Mobile dans les variables. Le responsive s'adapte au cas par cas, en code.

- **Ne pas figer de desktop rigide.** Générer du code naturellement responsive via les breakpoints Tailwind (`md:`, `lg:`) plutôt que des largeurs fixes.
- Adapter au besoin, là où ça casse — en priorité les tailles display (282, 132, 62…) qui débordent sur petit écran : les réduire via les breakpoints (ex. `text-display-section md:text-[plus grand]`). Pas besoin de valeur mobile « officielle » : un palier raisonnable suffit.
- Frames censés s'adapter → `Hug` / `Fill`, jamais `Fixed`. `Fixed` réservé à ce qui est réellement verrouillé (tags, icônes).
- Le mobile peut être affiné plus tard sans rien casser : tant que le layout reste en Auto Layout / flex et que les tailles passent par les tokens, l'adaptation reste simple à reprendre.
