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
    try {
        // We use a CORS Proxy to bypass the browser restriction
        // This is a common solution for static sites accessing APIs without CORS headers
        const targetUrl = 'https://api.counterapi.dev/v1/josemanuel31675-cv/visits';
        const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(targetUrl);

        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        // allorigins returns the content inside a 'contents' string as JSON
        const stats = JSON.parse(data.contents);
        
        if (stats && stats.count !== undefined) {
            countDisplay.innerText = stats.count;
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        countDisplay.innerHTML = `<span style="font-size: 1rem; color: #666;">Unable to load stats automatically.<br><a href="https://api.counterapi.dev/v1/josemanuel31675-cv/visits" target="_blank" style="color:var(--primary); text-decoration: underline;">Click here to see count (6+)</a></span>`;
    }
}
