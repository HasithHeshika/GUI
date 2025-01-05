document.addEventListener('DOMContentLoaded', () => {
    const signInPageForm = document.getElementById('signInPageForm');
    const signUpPageForm = document.getElementById('signUpPageForm');

    if(signInPageForm) {
        signInPageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signInPageForm.email.value;
            const password = signInPageForm.password.value;
            console.log('Sign In: ${email}, ${password}');
            alert('Sign in successful!');
        });
    }

    if(signUpPageForm) {
        signUpPageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = signUpPageForm.name.value;
            const email = signUpPageForm.email.value;
            const password = signUpPageForm.password.value;
            const confirmPassword = signUpPageForm.confirmPassword.value;

            if(password!=confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            console.log('Sign Up: ${name}, ${email}, ${password}, ${confirmPassword}');
            alert('Sign up successful!');
        });
    }
});