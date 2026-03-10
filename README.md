# CV Website - José Manuel Alvarado Mercado

Personal professional portfolio and CV website built with modern web standards, focusing on high performance, clean architecture, and professional aesthetics.

## 🚀 Recent Updates & Features

- **Project Portfolio:** Added a new `projects.html` page to showcase personal and professional projects with dedicated cards, tags, and direct links.
- **Centralized Navigation:** Implemented a dynamic navigation system via `navigation.js`. This allows for a single point of maintenance for the site's menu across all pages.
- **Session-Based Landing:** Integrated a session validation logic that ensures first-time visitors always land on the Home page (`index.html`) before exploring other sections.
- **Unified Design System:** Consolidated all page-specific styles into a master `style.css` for better maintainability and consistent UI/UX.
- **Performance Optimization:** 
    - Implemented **Minification** for both CSS (`style.min.css`) and JavaScript (`navigation.min.js`).
    - The production site uses these minified versions to ensure faster load times and basic code obfuscation.
- **Dynamic Active States:** The navigation menu automatically detects the current page and highlights the active link using JavaScript.

## 🛠️ Technology Stack

- **HTML5:** Semantic structure for optimal SEO and accessibility.
- **CSS3:** Custom design system with variables (dry/clean code) and responsive layouts.
- **JavaScript (Vanilla):** Light-weight logic for navigation and session management.
- **Git/GitHub:** Version control and hosting.

## 📂 Project Structure

- `index.html`: Home page/Summary.
- `about.html`: Detailed professional profile and education.
- `experience.html`: Professional career timeline.
- `projects.html`: Portfolio of software projects.
- `navigation.js`: Master source for navigation logic and HTML.
- `style.css`: Master source for all site styles.
- `*.min.*`: Optimized production files.

## 📄 License

&copy; 2026 José Manuel Alvarado Mercado. All rights reserved.
