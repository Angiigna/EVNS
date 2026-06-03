# 🌿 EVNS — Green Mapping of Pondicherry University

A web-based interactive green mapping platform that documents the biodiversity of Pondicherry University campus — its flora, fauna, and the living ecosystems that quietly thrive within it.

---

## 📖 About

EVNS is a student-led initiative by 4th-year Integrated Computer Science and MCA students at Pondicherry University. The project was originally built using the Google Maps API and has since been migrated to [Leaflet.js](https://leafletjs.com/) for an open-source, lightweight mapping experience.

The platform invites students, researchers, and nature lovers to explore campus biodiversity through an interactive map, documenting species sightings across three main categories:

- 🌳 **Plants** — Tropical flora, trees, and shrubs across campus
- 🐦 **Crows** — House Crow (*Corvus splendens*) habitats and roosting locations
- 🐕 **Dogs** — Campus dog (*Canis lupus familiaris*) territories and sighting points

---

## 🚀 Features

- **Interactive Leaflet Map** — Explore geotagged biodiversity markers across the university campus
- **Species Galleries** — Photo documentation for plants, crows, and dogs with descriptive cards
- **Hero Video** — An aerial Google Earth flyover of Pondicherry University as the landing experience
- **Responsive Design** — Mobile-friendly layout with adaptive breakpoints
- **Modular Codebase** — Organized into separate folders per species category

---

## 🗂️ Project Structure

```
EVNS/
├── index.html          # Landing/home page with video hero and mission overview
├── home1.html          # Alternate home view
├── gallery.html        # Photo gallery page
├── scipt.js            # Core JavaScript logic
├── fauna.js            # Fauna-specific map data and markers
├── style.css           # Global stylesheet
│
├── newversion/         # Latest map implementation (Leaflet-based)
│   └── new.html        # Main interactive map page
│
├── Plants/             # Plant species data and assets
├── plants1/            # Additional plant documentation
├── crows/              # Crow sighting data and assets
├── Dogs/               # Dog territory data and assets
├── dogs1/              # Additional dog documentation
├── Header/             # Header imagery
├── team/               # Team member photos
│
├── PU_Logo_Full.png
├── PU Google Earth.mp4
└── README.md
```

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Markup      | HTML5                               |
| Styling     | CSS3 (Flexbox, responsive media queries) |
| Scripting   | Vanilla JavaScript                  |
| Mapping     | [Leaflet.js](https://leafletjs.com/) |
| Fonts       | Google Fonts (Poppins, DM Serif Text, Playfair Display) |

> **Migration note:** The project initially used the Google Maps JavaScript API and was subsequently rewritten to use Leaflet.js for a fully open-source mapping stack.

---

## ⚡ Getting Started

No build tools or package managers are required. This is a static web project.

**Clone the repository:**
```bash
git clone https://github.com/Angiigna/EVNS.git
cd EVNS
```

**Run locally:**

Open `index.html` directly in your browser, or serve it using any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Then navigate to `http://localhost:8000` in your browser.

**Explore the map:**

From the landing page, click the **Explore →** button to open the interactive Leaflet map at `newversion/new.html`.

---

## 🗺️ Usage

1. Open the site and watch the aerial campus flyover on the landing page.
2. Click **Explore →** to enter the interactive map.
3. Use the map markers to discover documented sightings of plants, crows, and dogs across the campus.
4. Browse the gallery for photo documentation of each species.

---

## 🤝 Contributing

This is a living project — its value grows with fresh and accurate data. Contributions from fellow students and researchers at Pondicherry University are warmly welcomed.

**To contribute:**
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-addition`)
3. Add your documentation, sightings, or code improvements
4. Submit a Pull Request with a clear description of your changes

If you've spotted a species not yet on the map, or have photos and location data to add, please open an [issue](https://github.com/Angiigna/EVNS/issues) or reach out via a PR.

---

## 🙏 Acknowledgements

This project was developed under the mentorship of:

- **Dr. S. Gajalakshmi** — Head of the Department, for providing the opportunity and guidance to undertake this work
- **Dr. Manmohan** and **Dr. Kiran Kumar** — For their technical suggestions and direction throughout the project
- The Department of Computer Science, Pondicherry University, for resources and support

---

## 👥 Team

Athul Krishnan TR · Boda Kaveri · Fuad PP · Gokul G · Lakshmi Nandana B · Mohan Raju · Shwetha P · Sivangi Sankar · Tuvvadoddi Chandu · Viswapriya R

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
