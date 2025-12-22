import { getGeneralMessage } from './supabase.js';

const displayElement = document.getElementById('display-text');
const container = document.getElementById('message-container');

async function updateDisplay() {
    const result = await getGeneralMessage();
    if (result.success && result.data) {
        const message = result.data;
        const content = message.content;
        container.innerHTML = `<h1 class="static-message">${content}</h1>`;
    } else {
        // Default message if no message exists
        container.innerHTML = `<h1 class="static-message">Welcome to Pakistan Railways</h1>`;
    }
}

// Update every 10 seconds
updateDisplay();
setInterval(updateDisplay, 10000);

