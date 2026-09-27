# Rahul & Manisha — Engagement Invitation

A static HTML/CSS/JavaScript invitation designed for GitHub Pages.

## Structure

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── .nojekyll
└── .github/
    └── workflows/
        └── pages.yml
```

## GitHub Pages

This project includes a GitHub Actions workflow for static HTML. Push the repository to GitHub, then open **Settings → Pages** and select **GitHub Actions** as the source.

The invitation URL supports a guest parameter, for example:

`https://YOUR-USERNAME.github.io/Engagement/?guest=Rahul`

When a guest opens a shared URL, the full invitation opens at the top and the guest name is displayed.
