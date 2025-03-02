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
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }
    
            if (!data.user) {
                throw new Error('Invalid response from server');
            }
    
            console.log('Login response:', data); // Debug log
            return data;
        } catch (error) {
            console.error('Login error details:', error);
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
    },

   getAppointments: async (userId) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }

        const response = await fetch(`${API_BASE_URL}/appointments/user/${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Appointments data:', data);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
},

addAppointment: async (appointmentData) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }

        // Convert the date to MySQL format (YYYY-MM-DD)
        const date = new Date(appointmentData.appointment_date);
        const formattedDate = date.toISOString().split('T')[0];

        // Format the data
        const data = {
            ...appointmentData,
            user_id: user.id,
            appointment_date: formattedDate // Send only the date portion
        };

        console.log('Sending appointment data:', data);

        const response = await fetch(`${API_BASE_URL}/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to book appointment');
        }

        const responseData = await response.json();
        console.log('Appointment created:', responseData);
        return responseData;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
},
updateAppointment: async (id, data) => {
    try {
        // Format the date properly
        const formattedDate = data.appointment_date ? 
            new Date(data.appointment_date).toISOString().split('T')[0] : 
            null;

        // Sanitize data ensuring no undefined values
        const sanitizedData = {
            patient_name: data.patient_name?.trim() || '',
            contact_number: data.contact_number?.trim() || '',
            appointment_date: formattedDate,
            doctor: data.doctor || '',
            notes: data.notes?.trim() || null
        };

        // Validate required fields
        if (!sanitizedData.patient_name || !sanitizedData.contact_number || 
            !sanitizedData.appointment_date || !sanitizedData.doctor) {
            throw new Error('All required fields must be filled');
        }

        console.log('Sending update data:', sanitizedData);

        const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sanitizedData)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.error || 'Failed to update appointment');
        }

        return responseData;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
},


    // Delete appointment
    deleteAppointment: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting appointment:', error);
            throw error;
        }
    }

};
