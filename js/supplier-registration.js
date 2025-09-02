  // Handle form submission
        document.getElementById('registerForm').addEventListener('submit', function (e) {
            e.preventDefault();
            // Add your registration logic here
            alert('Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'home-login.html';
            }, 1500);
        });