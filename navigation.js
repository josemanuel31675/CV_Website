// Configuration for Google Sheets API (Your Database)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxcKxPLUm13QWQBV9sOaymcUOhwrb6F350CEgikiolcIxAp2k4rEjj2GmYwN8lPpAEa/exec";

// Redirection logic: Ensure users start at Home on their first visit of the session
(function () {
    const page = window.location.pathname.split("/").pop() || 'index.html';
    let sessionID = sessionStorage.getItem('cv_session_id');

    if (!sessionID) {
        localStorage.removeItem('cv_visited');
        sessionID = 'cv_sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
        sessionStorage.setItem('cv_session_id', sessionID);

        // 1. Quick counter (Legacy Support)
        new Image().src = 'https://api.counterapi.dev/v1/josemanuel31675-cv/visits/up';

        // 2. Log Detailed Visit to Google Sheets
        logToGoogleSheet({
            type: 'Visit',
            page: page,
            userAgent: navigator.userAgent
        });

        if (page !== 'index.html' && page !== '') {
            window.location.href = 'index.html';
            return;
        }
    }
})();

async function logToGoogleSheet(data) {
    if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL") return;

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Essential for Google Scripts redirect
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (e) {
        console.warn("Logging failed", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;
    const t = window.location.pathname.split("/").pop() || "index.html";
    const navHTML = `
        <div class="container">
            <nav>
                <a href="index.html" class="logo">JMAM</a>
                <ul>
                    <li><a href="index.html" class="${t === 'index.html' ? 'active' : ''}">Home</a></li>
                    <li><a href="about.html" class="${t === 'about.html' ? 'active' : ''}">Who Am I</a></li>
                    <li><a href="experience.html" class="${t === 'experience.html' ? 'active' : ''}">Experience</a></li>
                    <li><a href="projects.html" class="${t === 'projects.html' ? 'active' : ''}">Projects</a></li>
                </ul>
            </nav>
        </div>
    `;
    navContainer.innerHTML = navHTML;

    // Inject Chatbot
    if (!document.getElementById('chatbot-css')) {
        const link = document.createElement('link');
        link.id = 'chatbot-css';
        link.rel = 'stylesheet';
        link.href = 'chatbot.css';
        document.head.appendChild(link);
    }

    if (!document.getElementById('chatbot-js')) {
        const script = document.createElement('script');
        script.id = 'chatbot-js';
        script.src = 'chatbot.min.js';
        document.body.appendChild(script);
    }
});
