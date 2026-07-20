const routes = {
    '/': { templateId: 'login' , title : 'Bank App - Login'},
    '/login': { templateId: 'login' , title : 'Bank App - Login'},
    '/dashboard': { templateId: 'dashboard' , title : 'Bank App - Dashboard'},
    '/404': { templateId: 'notfound' , title : 'Bank App - Not Found'},

};

function renderRoute(templateId) {
    const template = document.getElementById(templateId);
    const app = document.getElementById('app');

    if (!template) {
        console.error(`Route template not found: ${templateId}`);
        app.innerHTML = '<h1>Something went wrong</h1><p>Unable to load the page.</p>';
        return;
    }

    const view = template.content.cloneNode(true);
    app.innerHTML = '';
    app.appendChild(view);
    
    if(templateId === 'dashboard') {
        console.log('Dashboard is shown');
    }
}

function updateRoute() {
    const path = window.location.pathname;
    const route = routes[path] || routes['/404'];
    const title = route.title || 'Bank App';
    document.title = title;
    renderRoute(route.templateId);
}

function navigate(path) {
    window.history.pushState({}, '', path);
    updateRoute();
}

function onLinkClick(event) {
    event.preventDefault();
    const anchor = event.currentTarget || event.target.closest('a');
    if (!anchor) return;
    navigate(new URL(anchor.href).pathname);
}

window.onpopstate = () => updateRoute();
updateRoute();

async function register(event) {
    event.preventDefault();

    const registerForm = document.getElementById('registerForm');
    if (!registerForm) {
        console.error('Register form not found');
        return;
    }

    const submitButton = registerForm.querySelector("button[type='submit']");
    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Creating Account...';

        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);
        const jsonData = JSON.stringify(data);

        const result = await createAccount(jsonData);

        if (result.error) {
            console.error('Account creation failed:', result.error);
            alert(`Account creation failed: ${result.error}`);
            return;
        }

        console.log('Account created successfully:', result);
        alert(`Welcome! ${result.user} Your account has been created.`);
    } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again later.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Create Account';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', register);
    }
});

async function createAccount (account) {
    try {
        const response = await fetch('//localhost:5000/api/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: account
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);

        }

          return await response.json();
    } catch (error) {
        console.error('Account creation failed:', error);
        return { error: error.message || 'Network error occurred' };
    }
}

