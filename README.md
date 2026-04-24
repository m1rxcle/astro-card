# 🚀 Astro Card

Современный финтех-лендинг с интерактивной картой, 3D интерфейсом и функциями геолокации.

---

## ✨ Превью

![preview](./public/bg-logo.png)

---

## 🧠 Возможности

- 🗺 Интерактивная карта (MapLibre + OpenStreetMap)
- 📍 Определение геолокации пользователя
- 🏦 Поиск банков поблизости (Overpass API)
- 🎨 Современный UI (Tailwind)
- ⚡ Быстрая статическая сборка (Astro)
- 🧊 3D элементы (Three.js)

---

## 📦 Структура проекта

```text

dist/
node_modules/
public/
src/
├── assets/
│   ├── astro.svg
│   ├── background.svg
├── components/
│   ├── CallToAction.astro
│   ├── FeatureCard.astro
│   ├── Features.astro
│   ├── FindUs.astro
│   ├── Footer.astro
│   ├── Header.astro
│   ├── Hero.astro
│   ├── Loader.astro
│   ├── Order.astro
│   ├── Scene.tsx
│   ├── ScrollMenu.astro
├── layouts/
│   ├── Layout.astro
├── pages/
│   ├── index.astro
├── styles/
│   ├── global.css
│   ├── header.css
│   ├── scrollMenu.css
├── utils/
│   ├── data.ts
│   ├── get-banks.ts
│   ├── model.tsx

.gitignore
astro.config.mjs
bun.lock
package.json
README.md
tsconfig.json

```

---

## 🖥 Технологии

- Astro
- Tailwind CSS
- MapLibre GL JS
- OpenStreetMap API
- React (islands архитектура)
- GSAP / Three.js

---

## 📍 Функция карты

Определяет местоположение пользователя и отображает ближайшие банки в реальном времени.

---

## 🚀 Запуск проекта

```bash
npm install
npm run dev
```
