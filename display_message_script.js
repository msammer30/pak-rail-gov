import { getGeneralMessage } from './supabase.js';

const displayElement = document.getElementById('display-text');
const container = document.getElementById('message-container');

async function updateDisplay() {
    const result = await getGeneralMessage();
    if (result.success && result.data) {
        const message = result.data;
        const content = message.content;

        // Logic to choose between marquee or static
        // For now, let's make it marquee if it's long, static if short
        if (content.length > 20) {
            container.innerHTML = `<div class="marquee-container"><div class="marquee">${content}</div></div>`;
        } else {
            container.innerHTML = `<h1 class="static-message">${content}</h1>`;
        }
    } else {
        // Default message if no message exists
        container.innerHTML = `<h1 class="static-message">Welcome to Pakistan Railways</h1>`;
    }
}

// Update every 10 seconds
updateDisplay();
setInterval(updateDisplay, 10000);

