// Admin Management - Client-side JavaScript
// Handles UI interactions and API calls to backend

document.addEventListener('DOMContentLoaded', function() {
    loadAdminData();
    setupEventListeners();
});

function setupEventListeners() {
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Delete buttons
    const deleteButtons = document.querySelectorAll('[data-action="delete"]');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });

    // Edit buttons
    const editButtons = document.querySelectorAll('[data-action="edit"]');
    editButtons.forEach(btn => {
        btn.addEventListener('click', handleEdit);
    });
}

function loadAdminData() {
    fetch('/api/admin/data')
        .then(response => response.json())
        .then(data => {
            renderTable(data);
        })
        .catch(error => console.error('Error loading data:', error));
}

function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
        loadAdminData();
        e.target.reset();
    })
    .catch(error => console.error('Error:', error));
}

function handleDelete(e) {
    const id = e.target.dataset.id;
    if (!confirm('Are you sure?')) return;

    fetch(`/api/admin/delete/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            loadAdminData();
        })
        .catch(error => console.error('Error:', error));
}

function handleEdit(e) {
    const id = e.target.dataset.id;
    fetch(`/api/admin/get/${id}`)
        .then(response => response.json())
        .then(data => populateForm(data))
        .catch(error => console.error('Error:', error));
}

function populateForm(data) {
    Object.keys(data).forEach(key => {
        const field = document.querySelector(`[name="${key}"]`);
        if (field) field.value = data[key];
    });
}

function renderTable(data) {
    // Implement based on your HTML table structure
    console.log('Rendering table with data:', data);
}