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
    const questionsDisplay = document.getElementById('questions-count');
    const jsonArea = document.getElementById('raw-json');
    
    if (!countDisplay || !questionsDisplay || !jsonArea) return;

    countDisplay.innerText = "Loading...";
    questionsDisplay.innerText = "Loading...";
    jsonArea.value = "Initiating request...";
    
    const visitsUrl = `https://api.counterapi.dev/v1/josemanuel31675-cv/visits`;
    const questionsUrl = `https://api.counterapi.dev/v1/josemanuel31675-cv/questions`;
    
    try {
        // Attempt 1: Using corsproxy.io for both
        const [vRes, qRes] = await Promise.all([
            fetch(`https://corsproxy.io/?${encodeURIComponent(visitsUrl)}`),
            fetch(`https://corsproxy.io/?${encodeURIComponent(questionsUrl)}`)
        ]);

        if (vRes.ok && qRes.ok) {
            const vData = await vRes.json();
            const qData = await qRes.json();
            
            countDisplay.innerText = vData.count;
            questionsDisplay.innerText = qData.count;
            jsonArea.value = `Visits API:\n${JSON.stringify(vData, null, 2)}\n\nQuestions API:\n${JSON.stringify(qData, null, 2)}`;
            return;
        }
    } catch (e) {
        console.warn("Proxy failed, trying fallback...");
    }

    // Simple fallback if retrieval fails
    countDisplay.innerText = "Error";
    questionsDisplay.innerText = "Error";
}
