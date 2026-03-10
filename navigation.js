// Redirection logic: Ensure users start at Home on their first visit of the session
(function() {
    const page = window.location.pathname.split("/").pop() || 'index.html';
    
    // Check for a unique session identifier
    let sessionID = sessionStorage.getItem('cv_session_id');

    if (!sessionID) {
        // Clear any old legacy identification in localStorage if it exists
        localStorage.removeItem('cv_visited'); 

        // Generate a random unique ID for this specific session
        sessionID = 'cv_sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
        sessionStorage.setItem('cv_session_id', sessionID);

        // Increment visitor counter (Anonymous tracking)
        fetch('https://api.countapi.xyz/hit/josemanuel31675-cv/visits').catch(() => {});
        
        // On their very first hit of this session, if they aren't on Home, redirect them
        if (page !== 'index.html' && page !== '') {
            window.location.href = 'index.html';
            return;
        }
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;

    // Get current page filename
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';

    const navHTML = `
        <div class="container">
            <nav>
                <a href="index.html" class="logo">JMAM</a>
                <ul>
                    <li><a href="index.html" class="${page === 'index.html' ? 'active' : ''}">Home</a></li>
                    <li><a href="about.html" class="${page === 'about.html' ? 'active' : ''}">Who Am I</a></li>
                    <li><a href="experience.html" class="${page === 'experience.html' ? 'active' : ''}">Experience</a></li>
                    <li><a href="projects.html" class="${page === 'projects.html' ? 'active' : ''}">Projects</a></li>
                </ul>
            </nav>
        </div>
    `;

    navContainer.innerHTML = navHTML;
});
