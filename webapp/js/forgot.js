document.getElementById("forgotPasswordForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get the entered email
    const email = document.getElementById("email").value;

    // Check if the email exists in your database (you would replace this with your server-side logic)
    // For this example, we assume the email exists
    const userExists = true;

    if (userExists) {
        // Generate a new password (you would replace this with your password generation logic)
        const newPassword = generateNewPassword();

        // Update the password in the database (you would replace this with your server-side logic)
        // For this example, we assume the password is updated successfully

        // Send an email with the new password
        sendEmail(email, newPassword);

        alert("An email with your new password has been sent to your email address.");
    } else {
        alert("Email not found. Please enter a valid email address.");
    }
});

function generateNewPassword() {
    // Implement your password generation logic here
    // For simplicity, we're generating a random password for this example
 
    const charset = "abcdefghi)jklmnopqr#stuv*wxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        newPassword += charset[randomIndex];
    }
    return newPassword;
}

function sendEmail(email, newPassword) {
    // Implement your email sending logic here
    // You can use a third-party email service or server-side code to send emails
    // For this example, we'll simulate sending an email using the console
    console.log(`Email sent to ${email} with new password: ${newPassword}`);
}
