document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');
  const userInfo = document.getElementById('userInfo');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  const validEmail = 'admin@outlook.com';
  const validPassword = 'admin';

  function updateUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');

    if (isLoggedIn === 'true' && userName) {
      userInfo.textContent = `Hi, ${userName}`;
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'block';
    } else {
      userInfo.textContent = 'No account logged in';
      loginBtn.style.display = 'block';
      logoutBtn.style.display = 'none';
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (email === validEmail && password === validPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Admin');
        window.location.href = 'home.html';
      } else {
        errorMessage.textContent = 'Invalid email or password. Please try again.';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      updateUI();
      window.location.href = 'login.html';
    });
  }

  updateUI();
});
