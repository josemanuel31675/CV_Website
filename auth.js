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
    const jsonArea = document.getElementById('raw-json');
    countDisplay.innerText = "Loading...";
    
    // Method: Use a proxy to get the JSON and display it in the textarea
    try {
        const targetUrl = `https://api.counterapi.dev/v1/josemanuel31675-cv/visits`;
        // We'll use allorigins as it returns the data safely wrapped
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}&t=${Date.now()}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Proxy error');
        
        const wrapper = await response.json();
        // The raw JSON string from the target is in wrapper.contents
        jsonArea.value = wrapper.contents;
        
        const stats = JSON.parse(wrapper.contents);
        if (stats && stats.count !== undefined) {
            countDisplay.innerText = stats.count;
        } else {
            countDisplay.innerText = "Data Error";
        }
    } catch (error) {
        console.error('Fetch error:', error);
        jsonArea.value = "Error: Could not fetch JSON due to CORS or Network issues.";
        
        // Show the insignia as fallback if we can't get the JSON
        const badgeUrl = `https://api.counterapi.dev/v1/josemanuel31675-cv/visits/badge.svg?t=${Date.now()}`;
        countDisplay.innerHTML = `<img src="${badgeUrl}" alt="Visits Badge" style="transform: scale(1.5);">`;
    }
}
