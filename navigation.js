// Redirection logic: Ensure users start at Home on their first visit of the session
(function() {
    const page = window.location.pathname.split("/").pop() || 'index.html';
    let sessionID = sessionStorage.getItem('cv_session_id');

    if (!sessionID) {
        localStorage.removeItem('cv_visited'); 
        sessionID = 'cv_sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
        sessionStorage.setItem('cv_session_id', sessionID);

        // Increment visitor counter using Image object to bypass CORS completely
        // Switching back to countapi.xyz which has better CORS support for reading
        const hit = new Image();
        hit.src = 'https://api.countapi.xyz/hit/josemanuel31675-cv-portfolio/visits';
        
        if (page !== 'index.html' && page !== '') {
            window.location.href = 'index.html';
            return;
        }
    }
})();

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

    // Inject Chatbot resources
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
        script.src = 'chatbot.js';
        document.body.appendChild(script);
    }
});

