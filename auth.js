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
        // Use a mode: 'cors' request and handle potential blocks
        const response = await fetch('https://api.counterapi.dev/v1/josemanuel31675-cv/visits', {
            method: 'GET',
            mode: 'cors',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
             countDisplay.innerText = 'Offline';
             return;
        }

        const data = await response.json();
        countDisplay.innerText = data.count !== undefined ? data.count : '0';
    } catch (error) {
        console.error('Fetch error:', error);
        // Fallback info if CORS truly blocks the GET request
        countDisplay.innerHTML = '<span style="font-size: 1rem; color: #666;">CORS Blocked. View stats at: <br> <a href="https://api.counterapi.dev/v1/josemanuel31675-cv/visits" target="_blank" style="color:blue">API Link</a></span>';
    }
}
