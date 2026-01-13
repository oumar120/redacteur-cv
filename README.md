## Important à savoir 
Ce dépot présente une version simplifiée du générateur de cv que j'ai dévloppé en privé (version complete non publique car destiné à la monétisation)
## Plateforme complète de création de CV
https://github.com/user-attachments/assets/ae25e2b6-71dd-4d43-b5b0-c4a7a4806d72


Projet personnel full‑stack démontrant la création d’une vraie application de génération de CV en ligne :

- Interface d’édition moderne en Angular
- Modèles de CV professionnels avec Tailwind CSS
- Génération de PDF via Django et playwright chrome

## Fonctionnalités principales

### 1. Formulaire de CV 100 % réactif (Angular Reactive Forms)
- Un seul formulaire structuré qui couvre : informations personnelles, profil, expériences, formations, compétences, langues, centres d’intérêt.
- Ajout / suppression d’éléments dynamiques (expériences, formations, compétences, langues, intérêts) sans recharger la page.
- Validation et typage forts côté client avec Reactive Forms.
- Données centralisées, facilement sérialisables pour envoi à l’API Django.

### 2. Rendu de CV multi‑modèles
- 3 modèles CSS réutilisant les mêmes données : Chrono, Circulaire, Moderne.
- Rendu Angular pour l’aperçu et templates Django pour le PDF → même source de vérité, deux canaux (SPA + serveur).
- Mise en page responsive côté front et mise en page A4 côté back, avec la même structure de sections.

### 3. Prévisualisation temps réel
- Composant `CvPreview` qui reflète instantanément chaque changement du formulaire.
- Changement de modèle à la volée sans dupliquer la logique métier.
- Hauteur et proportions simulant une feuille A4 pour que l’utilisateur voie « le vrai PDF » avant export.

### 4. Impression HTML → PDF (Django)
- Templates Django dédiés (`chrono.html`, `circulaire.html`, `moderne.html`).
- CSS d’impression spécifique : `@page`, unités en `mm`, classe `.pdf-page` pour respecter strictement A4.
- Endpoint `/api/pdf/` qui reçoit le JSON du CV, applique un template et renvoie un PDF prêt à être téléchargé par le front.
- Objectif : zéro différence visuelle entre l’aperçu Angular et le PDF généré.

### 5. API et intégration front/back
- Endpoint `/api/pdf/` pour la génération de document.
- Architecture pensée pour être facilement sécurisée et étendue (authentification, stockage utilisateur, historique de CV…).

### 6. Tests et automatisation (Playwright / Chrome)
- Projet prêt pour des tests end‑to‑end:
  - Vérification du remplissage des formulaires.
  - Contrôle de la cohérence entre l’aperçu Angular et le rendu HTML Django.
  - Scénarios de génération PDF (lancement Chrome headless, capture / comparaison visuelle éventuelle).
- Capacité à automatiser la vérification d’un flux complet : saisie → aperçu → PDF.

## Stack technique

- **Frontend** : Angular, TypeScript, Reactive Forms, pipes, directives structurelles.
- **Styling** : Tailwind CSS (layouts flex, grid, typographie, spacing, couleurs), Bootstrap Icons utilisé coté front comme back pour avoir un rendu fidele.
- **Backend** : Django, Django Templates, vue API (`/api/pdf/`).
- **Base de données** : SQLite (démo / développement).
- **Outils** : Node.js, npm, Angular CLI, Python 3, venv.

Ce choix de stack montre :
- Maîtrise d’Angular moderne (standalone components, services, gestion d’état via formulaires).
- Confort avec Django pour exposer des endpoints et générer des vues HTML/PDF.
- Capacité à faire dialoguer proprement deux mondes (SPA Angular et backend Django).

---

## Structure du projet

- `front/`
	- Application Angular
	- Composants de formulaire (`cv-form/`), prévisualisation (`cv-preview/`) et modèles (`models/chrono`, `models/circulaire`, `models/moderne`).
	- Fichiers de configuration Angular et Tailwind.

- `back/`
	- Projet Django `cv`
	- App `app` avec vues, URLs et templates pour les trois modèles et le PDF.
	- `static/css/tailwind.css` et `static/css/style.css` pour les styles global et impression.

---

## Installation rapide

### Backend (Django)

```powershell
cd "c:\Users\Hp\Desktop\ressources python\django\cv\back"
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt  # si présent
py manage.py migrate
py manage.py runserver
```

### Frontend (Angular)

```bash
cd front
npm install
npm run start   # ou ng serve
```

L’interface est alors accessible sur `http://localhost:4200` et le backend Django sur `http://127.0.0.1:8000`.

---


