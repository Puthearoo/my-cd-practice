const API_BASE = 'http://localhost:3000'; // Change this to your backend URL

// Health check function
async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE}/api/health`);
        const data = await response.json();
        document.getElementById('health-output').textContent = 
            JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('health-output').textContent = 
            'Error: ' + error.message;
    }
}

// Add new user
async function addUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert('Please enter both name and email');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        });

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('add-output').textContent = 
                'User added successfully: ' + JSON.stringify(data, null, 2);
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            loadUsers(); // Refresh the users list
        } else {
            document.getElementById('add-output').textContent = 
                'Error: ' + (data.message || 'Failed to add user');
        }
    } catch (error) {
        document.getElementById('add-output').textContent = 
            'Error: ' + error.message;
    }
}

// Load all users
async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE}/api/users`);
        const users = await response.json();
        
        const usersBody = document.getElementById('users-body');
        usersBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id || user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="delete-btn" onclick="deleteUser('${user.id || user._id}')">
                        Delete
                    </button>
                </td>
            `;
            usersBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Delete user
async function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/users/${userId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('User deleted successfully');
            loadUsers(); // Refresh the users list
        } else {
            alert('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user: ' + error.message);
    }
}

// Load users when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    checkHealth();
});

// Utility function to format JSON output
function formatJSON(obj) {
    return JSON.stringify(obj, null, 2);
}