  // Form elements
        const loginForm = document.getElementById('loginForm');
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        const otpForm = document.getElementById('otpForm');

        // Navigation functions
        function showForm(formToShow) {
            [loginForm, forgotPasswordForm, otpForm].forEach(form => {
                form.classList.add('d-none');
            });
            formToShow.classList.remove('d-none');
        }

        // Event listeners
        document.getElementById('forgotPassword').addEventListener('click', (e) => {
            e.preventDefault();
            showForm(forgotPasswordForm);
        });

        document.getElementById('backToLogin').addEventListener('click', (e) => {
            e.preventDefault();
            showForm(loginForm);
        });

        document.getElementById('backToLoginFromOtp').addEventListener('click', (e) => {
            e.preventDefault();
            showForm(loginForm);
        });

        // Login form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.innerHTML = 'SIGNING IN...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('Login successful!');
                btn.innerHTML = 'SIGN IN';
                btn.disabled = false;
            }, 1500);
        });

        // Forgot password form submission
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.innerHTML = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                showForm(otpForm);
                btn.innerHTML = 'SEND RESET CODE';
                btn.disabled = false;
            }, 1500);
        });

        // OTP input handling
        const otpInputs = otpForm.querySelectorAll('input[type="text"]');
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', function() {
                if (this.value.length === 1 && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
                this.value = this.value.replace(/[^0-9]/g, '');
            });

            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value === '' && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });

        // OTP form submission
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = Array.from(otpInputs).map(input => input.value).join('');
            
            if (code.length !== 6) {
                alert('Please enter all 6 digits');
                return;
            }

            const btn = e.target.querySelector('button');
            btn.innerHTML = 'Verifying...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('Code verified! Password reset successful.');
                showForm(loginForm);
                // Reset OTP inputs
                otpInputs.forEach(input => input.value = '');
                btn.innerHTML = 'VERIFY CODE';
                btn.disabled = false;
            }, 1500);
        });

        // Resend code
        document.getElementById('resendCode').addEventListener('click', (e) => {
            e.preventDefault();
            alert('New verification code sent to your email!');
            otpInputs.forEach(input => input.value = '');
            otpInputs[0].focus();
        });