# CV Website - José Manuel Alvarado Mercado

Personal professional portfolio and CV website built with modern web standards, focusing on high performance, clean architecture, and professional security.

## 🚀 Recent Updates & Features

- **Project Portfolio:** Added a new `projects.html` page to showcase personal and professional projects with dedicated cards, tags, and direct links.
- **Centralized Navigation:** Implemented a dynamic navigation system via `navigation.js`. This allows for a single point of maintenance for the site's menu across all pages.
- **Session-Based Landing:** Integrated session validation logic that ensures first-time visitors always land on the Home page (`index.html`) before exploring other sections.
- **Unified Design System:** Consolidated all page-specific styles into a master `style.css` for better maintainability and consistent UI/UX.
- **Performance Optimization:** 
    - Implemented **Minification** for CSS (`style.min.css`) and JavaScript (`navigation.min.js`, `auth.min.js`).
    - The production site uses these minified versions to ensure faster load times and code obfuscation.
- **Visitor Analytics (Private):**
    - Integrated a real-time visitor counter using a third-party API.
    - Created a **Private Admin Dashboard** (`admin-stats.html`) to monitor site traffic.
- **Advanced Security:**
    - Admin access is protected by **SHA-256 password hashing**.
    - Sensitive authentication logic is decoupled into separate, minified modules.

## 🛠️ Technology Stack

- **HTML5:** Semantic structure for optimal SEO and accessibility.
- **CSS3:** Custom design system with variables (dry/clean code) and responsive layouts.
- **JavaScript (Vanilla):** Light-weight logic for navigation and session management.
- **Web Crypto API:** Used for secure SHA-256 password verification.
- **Git/GitHub:** Version control and hosting.

## 📂 Project Structure

- `index.html`: Home page/Summary.
- `about.html`: Detailed professional profile and education.
- `experience.html`: Professional career timeline.
- `projects.html`: Portfolio of software projects.
- `navigation.js`: Master source for navigation logic and HTML.
- `auth.js`: Security module for admin authentication and stats retrieval.
- `style.css`: Master source for all site styles.
- `*.min.*`: Optimized production files.

## 📄 License

&copy; 2026 José Manuel Alvarado Mercado. All rights reserved.
