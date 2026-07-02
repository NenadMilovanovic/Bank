const routes = {
    '/': { templateId: 'login' },
    '/login': { templateId: 'login' },
    '/dashboard': { templateId: 'dashboard' },
    '/404': { templateId: 'notfound' },
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
}

function updateRoute() {
    const path = window.location.pathname;
    const route = routes[path] || routes['/404'];
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
