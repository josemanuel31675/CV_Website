/**
 * Secure Authentication for Site Statistics
 */

async function checkAccess() {
    const passwordInput = document.getElementById('admin-pass').value;
    const loginError = document.getElementById('login-error');
    const targetHash = "4de9a48824f9ca72125798e7eca051baf13c3e3a403d7fdcf0662f4844fd28ea";

    try {
        const inputHash = await hashString(passwordInput);
        if (inputHash === targetHash) {
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('stats-content').style.display = 'block';
            loadStats();
        } else {
            loginError.style.display = 'block';
            loginError.innerText = "Incorrect Password";
        }
    } catch (err) {
        loginError.style.display = 'block';
        loginError.innerText = "Security error.";
    }
}

async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function loadStats() {
    const countDisplay = document.getElementById('visit-count');
    countDisplay.innerText = "Loading...";
    
    try {
        // Cache buster para evitar resultados viejos
        const ts = Date.now();
        const targetUrl = `https://api.counterapi.dev/v1/josemanuel31675-cv/visits?t=${ts}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

        console.log("Fetching stats from proxy...");
        const response = await fetch(proxyUrl);
        
        if (!response.ok) throw new Error('Proxy unreachable');
        
        const data = await response.json();
        const stats = JSON.parse(data.contents);
        
        if (stats && stats.count !== undefined) {
            console.log("Stats loaded successfully:", stats.count);
            countDisplay.innerText = stats.count;
        } else {
            throw new Error('Data structure invalid');
        }
    } catch (error) {
        console.error('Detailed stats error:', error);
        // Fallback final: Enlace directo
        countDisplay.innerHTML = `
            <div style="font-size: 1rem; color: #666;">
                <p style="color: #e74c3c;">Blocked by Browser (CORS)</p>
                <a href="https://api.counterapi.dev/v1/josemanuel31675-cv/visits" 
                   target="_blank" 
                   style="display: inline-block; margin-top: 10px; color: var(--primary); text-decoration: underline;">
                   Click to view real-time count
                </a>
            </div>`;
    }
}
