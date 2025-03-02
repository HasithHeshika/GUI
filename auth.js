const checkAuth = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error checking auth:', error);
        return false;
    }
};

const updateNavigation = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userInfo = document.getElementById('userInfo');
        const logoutButton = document.getElementById('logoutButton');

        // Debug logging
        console.log('Navigation update:', { 
            currentPage: window.location.pathname,
            user: user,
            elements: { loginBtn, logoutBtn, userInfo }
        });

        // Handle missing elements gracefully
        if (!loginBtn && !logoutBtn && !userInfo) {
            console.log('Skip navigation update - elements not found');
            return;
        }

        if (user) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'block';
            if (userInfo) userInfo.textContent = `Welcome, ${user.name}!`;
            
            if (logoutButton) {
                logoutButton.onclick = () => {
                    localStorage.removeItem('user');
                    window.location.href = 'login.html';
                };
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userInfo) userInfo.textContent = 'No account logged in';
        }
    } catch (error) {
        console.error('Navigation error:', error);
    }
};

// Export functions
window.checkAuth = checkAuth;
window.updateNavigation = updateNavigation;