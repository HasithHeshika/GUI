function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function updateNavigation() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userInfo = document.getElementById('userInfo');

    if (user) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        userInfo.textContent = `Welcome, ${user.name}!`;
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        userInfo.textContent = 'No account logged in';
    }
}