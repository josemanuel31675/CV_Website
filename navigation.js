// Redirection logic: Ensure users start at Home on their first visit of the session
(function() {
    const page = window.location.pathname.split("/").pop() || 'index.html';
    
    // Check for a unique session identifier
    let sessionID = sessionStorage.getItem('cv_session_id');

    if (!sessionID) {
        // Clear old legacy markers
        localStorage.removeItem('cv_visited'); 

        // Generate a random unique ID for this session
        sessionID = 'cv_sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
        sessionStorage.setItem('cv_session_id', sessionID);

        // Increment visitor counter using a more reliable provider
        // Service: counterapi.dev
        fetch('https://api.counterapi.dev/v1/josemanuel31675-cv/visits/up')
            .then(response => response.json())
            .then(data => console.log('Visit tracked'))
            .catch(err => console.error('Tracking error:', err));
        
        // Redirect to Home if landing elsewhere for the first time
        if (page !== 'index.html' && page !== '') {
            window.location.href = 'index.html';
            return;
        }
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;

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
