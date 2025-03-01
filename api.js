const API_BASE_URL = 'http://localhost:5000/api';

const api = {
    // Get all users
    getUsers: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    // Add a new user
    addUser: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    },
   
    loginUser: async (credentials) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            return await response.json();
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },
    checkLoginStatus: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    },

    logout: () => {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }

};
