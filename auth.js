/**
 * Secure Authentication for Site Statistics
 * Uses SHA-256 for password hashing comparison
 */

async function checkAccess() {
    const passwordInput = document.getElementById('admin-pass').value;
    const loginError = document.getElementById('login-error');
    
    // The SHA-256 hash of "JMAM2026"
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
        console.error("Auth error:", err);
        loginError.style.display = 'block';
        loginError.innerText = "Security error occurred.";
    }
}

/**
 * Generates a SHA-256 hash using the Web Crypto API
 */
async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function loadStats() {
    const countDisplay = document.getElementById('visit-count');
    try {
        const response = await fetch('https://api.counterapi.dev/v1/josemanuel31675-cv/visits');
        if (response.status === 404 || response.status === 400) {
            countDisplay.innerText = '0';
            return;
        }
        const data = await response.json();
        countDisplay.innerText = data.count !== undefined ? data.count : '0';
    } catch (error) {
        console.error('Stats fetch error:', error);
        countDisplay.innerText = '0';
    }
}
