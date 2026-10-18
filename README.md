# Arjun Rana — Portfolio

A dark, minimal personal portfolio built with plain HTML, CSS and JavaScript. It has no build step and no dependencies.

## Run it
- **Quickest:** double-click `index.html`.
- **Local server** (recommended, so the copy buttons use the modern clipboard API):
  ```
  python3 -m http.server 8000
  ```
  Then open http://localhost:8000

## Structure
```
index.html      All sections (Hero, About, Ticker, Projects, Tech Stack, Education, Let's Talk)
css/styles.css  Design tokens, layout, animations, responsive + reduced-motion rules
js/main.js      Tech-stack data, scroll reveal, mobile menu, active nav, copy buttons, back-to-top, carousel dots
```

## Customize
- **Profile photo:** replace the `AR` placeholder in `.hero__photo` with `<img src="photo.jpg" alt="Arjun Rana">` and add
  `.hero__photo img { width:100%; height:100%; object-fit:cover; border-radius:inherit; }`
- **Tech stack:** edit the `STACK` array at the top of `js/main.js`.
- **Colors:** change the CSS variables in `:root` in `css/styles.css`.

## Deploy
Upload the folder as-is to GitHub Pages, Netlify, or Vercel.
