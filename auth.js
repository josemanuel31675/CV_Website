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
        // Since original fetch fails CORS, we use JSONP or a proxy-less approach
        // However, for counterapi.dev, we'll try a simpler fetch first
        const response = await fetch('https://api.counterapi.dev/v1/josemanuel31675-cv/visits');
        const data = await response.json();
        
        if (data && data.count !== undefined) {
            countDisplay.innerText = data.count;
        } else {
            throw new Error('Invalid data');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        // Fallback: If CORS blocks the JSON fetch, we can use a JSONP-like trick or just show the direct info
        // But since you can see the JSON manually, the API works, it's just the Browser blocking the JS read.
        countDisplay.innerHTML = `<span style="font-size: 1rem; color: #666;">CORS Blocked by Browser.<br>The data is safe on the server.<br><a href="https://api.counterapi.dev/v1/josemanuel31675-cv/visits" target="_blank" style="color:var(--primary); text-decoration: underline;">Click here to see current count</a></span>`;
    }
}
