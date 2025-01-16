document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');
  const userInfo = document.getElementById('userInfo');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  // Predefined login credentials
  const validEmail = 'admin@outlook.com';
  const validPassword = 'admin';

  // Function to update the UI based on login state
  function updateUI() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');

    if (isLoggedIn === 'true' && userName) {
      userInfo.textContent = `Hi, ${userName}`;
      loginBtn.style.display = 'none'; // Hide login button
      logoutBtn.style.display = 'block'; // Show logout button
    } else {
      userInfo.textContent = 'No account logged in';
      loginBtn.style.display = 'block'; // Show login button
      logoutBtn.style.display = 'none'; // Hide logout button
    }
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form submission

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      // Validate credentials
      if (email === validEmail && password === validPassword) {
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', 'Admin');
        // Redirect to the home page
        window.location.href = 'home.html'; // Ensure this path is correct
      } else {
        // Display an error message
        errorMessage.textContent = 'Invalid email or password. Please try again.';
      }
    });
  }

  // Handle logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn'); // Clear login state
      localStorage.removeItem('userName');
      updateUI(); // Update the UI
      window.location.href = 'login.html'; // Redirect to login page
    });
  }

  // Initialize UI on page load
  updateUI();
});
