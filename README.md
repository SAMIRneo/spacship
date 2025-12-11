# 🚀 Spaceship 3D - Interactive WebGL Demo

![Three.js](https://img.shields.io/badge/Three.js-v0.160-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

Une démonstration interactive de vaisseau spatial en 3D construite avec **Three.js**, **React Three Fiber** et **Next.js**.

## ✨ Fonctionnalités

- 🎨 **Rendu WebGL haute performance** avec wireframe holographique
- 🌌 **Grille cyberpunk animée** style Tron
- ✨ **Système de particules** avec 1000+ points lumineux
- 🎬 **Post-processing avancé** (Bloom, Chromatic Aberration, Glitch)
- 🖱️ **Interactions** : Hover et click sur modules
- 📱 **Responsive** : Desktop et mobile optimisé
- ⚡ **Performances optimisées** : 60fps stable

## 🛠️ Stack Technique

- **Next.js 15** + TypeScript
- **Three.js** + React Three Fiber
- **@react-three/drei** (helpers 3D)
- **@react-three/postprocessing** (effets visuels)
- **GSAP** (animations)
- **Framer Motion** (transitions UI)
- **Tailwind CSS** (styling)

## 🚀 Installation

```bash
# Cloner le repo
git clone https://github.com/SAMIRneo/spacship.git
cd spacship

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
spacship/
├── app/
│   ├── page.tsx              # Page principale
│   ├── layout.tsx            # Layout global
│   └── globals.css           # Styles globaux
├── components/
│   ├── SpaceshipScene.tsx    # Scene 3D complète
│   ├── Spaceship.tsx         # Modèle vaisseau
│   ├── CyberGrid.tsx         # Grille animée
│   ├── ParticleField.tsx     # Système particules
│   ├── CodeOverlay.tsx       # UI overlay code
│   └── LoadingScreen.tsx     # Écran de chargement
├── public/
│   └── images/               # Assets statiques
└── README.md
```

## 🎮 Contrôles

- **Clic gauche + glisser** : Rotation caméra
- **Molette** : Zoom in/out
- **Hover modules** : Highlight effet
- **Click modules** : Change couleur/état

## 🎨 Customisation

Modifier les couleurs dans `tailwind.config.ts` :

```typescript
colors: {
  'cyber-cyan': '#00FFF0',    // Wireframes principaux
  'cyber-magenta': '#FF00FF', // Accents et trails
  'cyber-blue': '#3366FF',    // Panneaux solaires
  'cyber-gold': '#FFD700',    // Highlights
  'cyber-navy': '#0A0E27',    // Background
}
```

## 🚢 Déploiement

### Vercel (recommandé)

```bash
npm install -g vercel
vercel --prod
```

### Build manuel

```bash
npm run build
npm run start
```

## 📊 Performance

- **FPS moyen** : 60fps (desktop)
- **Triangles** : ~50k
- **Draw calls** : ~15-20
- **Taille bundle** : ~1.2MB (gzipped)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing`)
3. Commit tes changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Ouvrir une Pull Request

## 📝 License

MIT License

## 🙏 Crédits

Créé avec ❤️ par [SAMIRneo](https://github.com/SAMIRneo)

- Inspiré par l'esthétique cyberpunk/synthwave
- Three.js community
- React Three Fiber ecosystem

---

⭐ **N'oublie pas de star le repo si tu l'apprécies !**