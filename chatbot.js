/**
 * JMAM CV Assistant - Chatbot Logic
 */

const CV_DATA = {
    introduction: "I'm the digital assistant of José Manuel. Expert in .NET & SQL Server with 15+ years of experience. How can I help you today?",
    experience: "José Manuel has over 15 years within the IT industry, working for global companies like Softtek and Northware. He specializes in enterprise systems, modernization, and backend stability.",
    skills: "Core stack: C#, .NET Core, SQL Server (Expert), T-SQL, VB.NET, and Vue.js. He also handles Azure DevOps, TFS, and REST APIs.",
    contact: "You can reach him at jose_alvarado@live.com.mx or via LinkedIn: https://www.linkedin.com/in/josemanuel230975/",
    pokemon: "One of his fun projects is 'Who's That Pokémon?', built with Vue 3 and PokeAPI. You can find it in the Projects section!",
    projects: "He has several projects including this Portfolio, a modern Pokémon guessing game, and various enterprise solutions for industrial applications.",
    fallback: "I'm not sure about that, but you can ask about his experience, skills, projects, or how to contact him."
};

document.addEventListener('DOMContentLoaded', () => {
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
                <button class="opt-btn" onclick="sendQuickMsg('Experience')">Experience</button>
                <button class="opt-btn" onclick="sendQuickMsg('Skills')">Skills</button>
                <button class="opt-btn" onclick="sendQuickMsg('Projects')">Projects</button>
                <button class="opt-btn" onclick="sendQuickMsg('Contact')">Contact</button>
            </div>
            <div class="cb-footer">
                <input type="text" id="cb-input" placeholder="Ask me something...">
                <button class="cb-send" id="cb-send-btn">Send</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const bubble = document.getElementById('cb-bubble');
    const window = document.getElementById('cb-window');
    const close = document.querySelector('.cb-close');
    const input = document.getElementById('cb-input');
    const sendBtn = document.getElementById('cb-send-btn');
    const messages = document.getElementById('cb-messages');

    bubble.onclick = () => window.classList.toggle('active');
    close.onclick = () => window.classList.remove('active');

    const addMessage = (text, type) => {
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.innerText = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    };

    const processQuery = (query) => {
        const q = query.toLowerCase();
        addMessage(query, 'user');

        // Show typing indicator
        const typing = document.createElement('div');
        typing.className = 'typing';
        typing.innerText = 'JMAM is typing...';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;

        setTimeout(() => {
            typing.remove();
            if (q.includes('experience') || q.includes('work') || q.includes('years')) {
                addMessage(CV_DATA.experience, 'ai');
            } else if (q.includes('skill') || q.includes('tech') || q.includes('know')) {
                addMessage(CV_DATA.skills, 'ai');
            } else if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
                addMessage(CV_DATA.contact, 'ai');
            } else if (q.includes('pokemon') || q.includes('game')) {
                addMessage(CV_DATA.pokemon, 'ai');
            } else if (q.includes('project')) {
                addMessage(CV_DATA.projects, 'ai');
            } else if (q.includes('hi') || q.includes('hello')) {
                addMessage("Hello! I'm ready to answer questions about José's career.", 'ai');
            } else {
                addMessage(CV_DATA.fallback, 'ai');
            }
        }, 800);
    };

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
});

// Global helper for quick buttons
function sendQuickMsg(text) {
    const ev = new CustomEvent('quickMsg', { detail: text });
    document.dispatchEvent(ev);
}

document.addEventListener('quickMsg', (e) => {
    // This is handled inside the DOMContentLoaded scope by the window.sendQuickMsg assignment
    // but we ensure it works if called globally.
});
