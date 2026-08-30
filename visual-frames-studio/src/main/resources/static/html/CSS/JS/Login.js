document.addEventListener('DOMContentLoaded', function () {
    var roleClientBtn = document.getElementById('roleClient');
    var roleAdminBtn = document.getElementById('roleAdmin');
    var submitLabel = document.getElementById('submitLabel');
    var form = document.getElementById('loginForm');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');
    var togglePwBtn = document.getElementById('togglePw');
    var submitBtn = document.getElementById('submitBtn');
    var statusMsg = document.getElementById('statusMsg');
    var backLink = document.getElementById('backLink');
    var signupLink = document.getElementById('signupLink');

    var currentRole = 'client';

    function setRole(role) {
        currentRole = role;
        var isClient = role === 'client';
        roleClientBtn.classList.toggle('is-active', isClient);
        roleAdminBtn.classList.toggle('is-active', !isClient);
        roleClientBtn.setAttribute('aria-selected', String(isClient));
        roleAdminBtn.setAttribute('aria-selected', String(!isClient));
        submitLabel.textContent = isClient ? 'Sign in as client' : 'Sign in as studio staff';
        clearStatus();
    }

    roleClientBtn.addEventListener('click', function () { setRole('client'); });
    roleAdminBtn.addEventListener('click', function () { setRole('admin'); });

    togglePwBtn.addEventListener('click', function () {
        var isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePwBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function clearFieldError(input, errorEl) {
        input.classList.remove('has-error');
        errorEl.textContent = '';
    }

    function setFieldError(input, errorEl, message) {
        input.classList.add('has-error');
        errorEl.textContent = message;
    }

    function clearStatus() {
        statusMsg.textContent = '';
        statusMsg.className = 'status-msg';
    }

    emailInput.addEventListener('input', function () { clearFieldError(emailInput, emailError); });
    passwordInput.addEventListener('input', function () { clearFieldError(passwordInput, passwordError); });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearStatus();

        var email = emailInput.value.trim();
        var password = passwordInput.value;
        var valid = true;

        if (!email) {
            setFieldError(emailInput, emailError, 'Enter your email address.');
            valid = false;
        } else if (!isValidEmail(email)) {
            setFieldError(emailInput, emailError, 'Enter a valid email address.');
            valid = false;
        } else {
            clearFieldError(emailInput, emailError);
        }

        if (!password) {
            setFieldError(passwordInput, passwordError, 'Enter your password.');
            valid = false;
        } else if (password.length < 6) {
            setFieldError(passwordInput, passwordError, 'Password must be at least 6 characters.');
            valid = false;
        } else {
            clearFieldError(passwordInput, passwordError);
        }

        if (!valid) return;

        submitBtn.disabled = true;
        var originalLabel = submitLabel.textContent;
        submitLabel.textContent = 'Signing in…';

        // Simulated authentication call -- wire this up to the real
        // /api/auth/login endpoint once the backend is connected.
        setTimeout(function () {
            submitBtn.disabled = false;
            submitLabel.textContent = originalLabel;
            statusMsg.textContent = currentRole === 'client'
                ? 'Signed in. Redirecting to your booking dashboard…'
                : 'Signed in. Redirecting to the studio dashboard…';
            statusMsg.classList.add('success');
        }, 900);
    });

    backLink.addEventListener('click', function (e) {
        e.preventDefault();
        // Point this back to the portfolio/landing page route.
        window.history.back();
    });

    signupLink.addEventListener('click', function (e) {
        e.preventDefault();
        statusMsg.className = 'status-msg';
        statusMsg.textContent = 'Account creation is not wired up yet in this prototype.';
    });
});