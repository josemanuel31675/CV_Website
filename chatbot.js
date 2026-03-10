const CV_DATA = {
    introduction: "I'm the digital assistant of José Manuel. Expert in .NET & SQL Server with 15+ years of experience. How can I help you today?",
    location: "José Manuel is originally from Mexico and is currently based in Monterrey, Nuevo León, known as the industrial and tech hub of the country.",
    experience: "José Manuel has over 15 years within the IT industry, working for global companies like Softtek and Northware. He specializes in enterprise systems, modernization, and backend stability.",
    skills: "Core stack: C#, .NET Core, SQL Server (Expert), T-SQL, VB.NET, and Vue.js. He also handles Azure DevOps, TFS, and REST APIs.",
    contact: "You can reach him at jose_alvarado@live.com.mx or via LinkedIn: https://www.linkedin.com/in/josemanuel230975/",
    pokemon: "One of his fun projects is 'Who's That Pokémon?', built with Vue 3 and PokeAPI. You can find it in the Projects section!",
    projects: "Beyond his portfolio favorites, he has worked on large-scale core business systems, complex industrial integrations, and legacy migrations (VB to .NET) that manage critical business data.",
    hidden_projects: "He has extensive experience in the financial and manufacturing sectors, developing internal systems for audit management, payroll processing, and real-time inventory tracking for high-demand industrial environments.",
    fallback: "I'm not sure about that, but you can ask about his experience, location, specific projects, skills, or how to contact him."
};

let DYNAMIC_DATA = {}; // Correctly using 'let' for dynamic reassignment

const initChatbot = () => {
    // Prevent double initialization
    if (document.getElementById('cb-bubble')) return;

    // Inject HTML
    const chatbotHTML = `
        <div id="cb-bubble">
            <svg viewBox="0 0 24 24"><path d="M20,2H4C2.9,2,2,2.9,2,4v18l4-4h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,16H5.2L4,17.2V4h16V16z M7,9h10V7H7V9z M7,13h10v-2H7V13z"/></svg>
        </div>
        <div id="cb-window">
            <div class="cb-header">
                <h3>JMAM Assistant</h3>
                <span class="cb-close">&times;</span>
            </div>
            <div class="cb-body" id="cb-messages">
                <div class="msg ai">${CV_DATA.introduction}</div>
            </div>
            <div class="cb-options">
                <button class="opt-btn" onclick="window.sendQuickMsg('Experience')">Experience</button>
                <button class="opt-btn" onclick="window.sendQuickMsg('Skills')">Skills</button>
                <button class="opt-btn" onclick="window.sendQuickMsg('Projects')">Projects</button>
                <button class="opt-btn" onclick="window.sendQuickMsg('Contact')">Contact</button>
            </div>
            <div class="cb-footer">
                <input type="text" id="cb-input" placeholder="Ask me something...">
                <button class="cb-send" id="cb-send-btn">Send</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Fetch dynamic knowledge from Google Sheets
    if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_SCRIPT_URL") {
        console.log("Chatbot: Intentando cargar datos desde Google Sheets...");
        fetch(GOOGLE_SCRIPT_URL)
            .then(res => res.json())
            .then(data => { 
                DYNAMIC_DATA = data; 
                console.log("Chatbot: Datos cargados con éxito:", DYNAMIC_DATA);
            })
            .catch(e => {
                console.warn("Chatbot: Error cargando datos dinámicos:", e);
                DYNAMIC_DATA = {};
            });
    } else {
        console.error("Chatbot: GOOGLE_SCRIPT_URL no está configurada correctamente.");
    }

    const bubble = document.getElementById('cb-bubble');
    const windowChat = document.getElementById('cb-window');
    const close = document.querySelector('.cb-close');
    const input = document.getElementById('cb-input');
    const sendBtn = document.getElementById('cb-send-btn');
    const messages = document.getElementById('cb-messages');

    bubble.onclick = () => windowChat.classList.toggle('active');
    close.onclick = () => windowChat.classList.remove('active');

    const addMessage = (text, type) => {
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.innerText = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    };

    const processQuery = (query) => {
        const q = query.toLowerCase().trim();
        addMessage(query, 'user');

        const typing = document.createElement('div');
        typing.className = 'typing';
        typing.innerText = 'JMAM is typing...';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;

        setTimeout(() => {
            typing.remove();
            
            // 1. Check Hardcoded Data
            if (q.includes('experience') || q.includes('work') || q.includes('career')) {
                addMessage(CV_DATA.experience, 'ai');
            } else if (q.includes('skill') || q.includes('tech') || q.includes('know') || q.includes('stack')) {
                addMessage(CV_DATA.skills, 'ai');
            } else if (q.includes('from') || q.includes('live') || q.includes('mexico') || q.includes('location') || q.includes('place')) {
                addMessage(CV_DATA.location, 'ai');
            } else if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('linkedin')) {
                addMessage(CV_DATA.contact, 'ai');
            } else if (q.includes('pokemon') || q.includes('game') || q.includes('fun')) {
                addMessage(CV_DATA.pokemon, 'ai');
            } else if (q.includes('detail') || q.includes('more') || q.includes('legacy') || q.includes('enterprise')) {
                addMessage(CV_DATA.hidden_projects, 'ai');
            } else if (q.includes('project')) {
                addMessage(CV_DATA.projects, 'ai');
            } else if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
                addMessage("Hello! I'm ready to answer questions about José's career.", 'ai');
            } 
            // 2. Check Dynamic Knowledge from Google Sheet (Flexible search)
            else {
                let foundDynamic = false;
                for (const key in DYNAMIC_DATA) {
                    if (q.includes(key.replace(/[?¿!¡]/g, '').toLowerCase().trim())) {
                        addMessage(DYNAMIC_DATA[key], 'ai');
                        foundDynamic = true;
                        break;
                    }
                }
                
                if (!foundDynamic) {
                    // 3. Fallback and Log
                    addMessage(CV_DATA.fallback, 'ai');
                    logUnknownQuestion(query);
                }
            }
        }, 800);
    };

    const logUnknownQuestion = (text) => {
        // 1. Increment local counter
        new Image().src = 'https://api.counterapi.dev/v1/josemanuel31675-cv/questions/up';
        
        // 2. Email Notification (Backup)
        fetch('https://formsubmit.co/ajax/jose_alvarado@live.com.mx', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });

        // 3. Save to Google Sheet (The New Database)
        saveToGoogleSheet(text);
    }

    const saveToGoogleSheet = async (question) => {
        if (typeof GOOGLE_SCRIPT_URL === 'undefined' || GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL") return;

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'Question',
                    page: window.location.pathname,
                    content: question,
                    userAgent: navigator.userAgent
                })
            });
        } catch (e) {
            console.error("Sheet Sync Failed", e);
        }
    };

    // Make it available globally for the quick buttons
    window.sendQuickMsg = (text) => processQuery(text);

    sendBtn.onclick = () => {
        if (input.value.trim()) {
            processQuery(input.value);
            input.value = '';
        }
    };

    input.onkeypress = (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            processQuery(input.value);
            input.value = '';
        }
    };
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}

// Global helper for quick buttons
function sendQuickMsg(text) {
    const ev = new CustomEvent('quickMsg', { detail: text });
    document.dispatchEvent(ev);
}

document.addEventListener('quickMsg', (e) => {
    // This is handled inside the DOMContentLoaded scope by the window.sendQuickMsg assignment
    // but we ensure it works if called globally.
});
