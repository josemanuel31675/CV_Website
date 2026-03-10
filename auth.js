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
    
    if (!jsonArea) {
        console.error("Textarea 'raw-json' not found in DOM.");
        return;
    }

    countDisplay.innerText = "Loading...";
    jsonArea.value = "Initiating request...";
    
    const targetUrl = `https://api.counterapi.dev/v1/josemanuel31675-cv/visits`;
    
    // Attempt 1: Using corsproxy.io (usually more reliable for raw JSON)
    try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl + '?t=' + Date.now())}`;
        console.log("Trying corsproxy.io...");
        
        const response = await fetch(proxyUrl);
        if (response.ok) {
            const data = await response.json();
            console.log("Success with corsproxy.io");
            jsonArea.value = JSON.stringify(data, null, 4);
            countDisplay.innerText = data.count;
            return; // Success!
        }
    } catch (e) {
        console.warn("corsproxy.io failed, trying allorigins...");
    }

    // Attempt 2: Using allorigins.win as fallback
    try {
        const fallbackProxy = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}&t=${Date.now()}`;
        const response = await fetch(fallbackProxy);
        const wrapper = await response.json();
        
        if (wrapper && wrapper.contents) {
            jsonArea.value = wrapper.contents;
            const stats = JSON.parse(wrapper.contents);
            countDisplay.innerText = stats.count || "0";
            return; // Success!
        }
    } catch (e) {
        console.error("All proxies failed.");
    }

    // Fallback if everything fails
    jsonArea.value = "CORS block detected. The browser prevented reading the JSON directly.\n\nYou can manually verify the data at:\n" + targetUrl;
    const badgeUrl = `https://api.counterapi.dev/v1/josemanuel31675-cv/visits/badge.svg?t=${Date.now()}`;
    countDisplay.innerHTML = `<img src="${badgeUrl}" alt="Visits Badge" style="transform: scale(1.5);">`;
}
