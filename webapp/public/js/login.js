document.addEventListener('DOMContentLoaded', function () {
    // Hide the login-info-box on page load
    document.querySelector('.login-info-box').style.display = 'none';

    // Add the 'show-log-panel' class to the login-show element
    document.querySelector('.login-show').classList.add('show-log-panel');
});

// Listen for changes in radio buttons
const radioButtons = document.querySelectorAll('.login-reg-panel input[type="radio"]');
radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', function () {
        if (document.getElementById('log-login-show').checked) {
            // Fade out the register-info-box and fade in the login-info-box
            document.querySelector('.register-info-box').style.display = 'none';
            document.querySelector('.login-info-box').style.display = 'block';

            // Add and remove classes for styling
            document.querySelector('.white-panel').classList.add('right-log');
            document.querySelector('.register-show').classList.add('show-log-panel');
            document.querySelector('.login-show').classList.remove('show-log-panel');
        } else if (document.getElementById('log-reg-show').checked) {
            // Fade in the register-info-box and fade out the login-info-box
            document.querySelector('.register-info-box').style.display = 'block';
            document.querySelector('.login-info-box').style.display = 'none';

            // Remove class for styling
            document.querySelector('.white-panel').classList.remove('right-log');

            // Add and remove classes for styling
            document.querySelector('.login-show').classList.add('show-log-panel');
            document.querySelector('.register-show').classList.remove('show-log-panel');
        }
    });
});