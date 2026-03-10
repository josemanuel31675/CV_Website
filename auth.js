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
    
    // Most reliable method for GitHub Pages: Use the SVG Badge
    // This BYPASSES all CORS issues because it is an Image
    const badgeUrl = `https://api.counterapi.dev/v1/josemanuel31675-cv/visits/badge.svg?t=${Date.now()}`;
    
    countDisplay.innerHTML = `
        <div style="padding: 20px;">
            <img src="${badgeUrl}" alt="Visits Count" style="transform: scale(2); margin-bottom: 20px;">
            <p style="font-size: 0.9rem; color: #666; margin-top: 15px;">
                Badge updated in real-time.
            </p>
            <a href="https://api.counterapi.dev/v1/josemanuel31675-cv/visits" 
               target="_blank" 
               style="font-size: 0.8rem; color: var(--primary); text-decoration: underline;">
               View Raw JSON Data
            </a>
        </div>
    `;
    
    // Still try to fetch the number for the large display if possible (using a different proxy)
    try {
        const targetUrl = `https://api.counterapi.dev/v1/josemanuel31675-cv/visits`;
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

        const response = await fetch(proxyUrl);
        if (response.ok) {
            const data = await response.json();
            if (data && data.count !== undefined) {
                // If successful, we can replace the badge with the clean number
                countDisplay.innerHTML = `<div class="stat-number">${data.count}</div>`;
            }
        }
    } catch (error) {
        console.warn("Proxy read failed, showing badge as fallback.");
    }
}
