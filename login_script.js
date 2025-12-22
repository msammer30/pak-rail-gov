import { signIn } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the form from submitting in the traditional way

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Use Supabase authentication
            const result = await signIn(username, password);
            
            if (result.success) {
                // If correct, set a flag in sessionStorage
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', result.user.username);
                
                // Redirect to the master input page
                window.location.href = 'master_input.html';
            } else {
                // If incorrect, show an error message
                if (errorMessage) {
                    errorMessage.textContent = result.message || 'Invalid username or password. Please try again.';
                }
            }
        });
    }
});
