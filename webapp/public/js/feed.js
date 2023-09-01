// Add event listener to the form submission
document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting

    // Get the post content from the textarea
    const postContent = document.getElementById('postContent').value;

    // You can process and submit the postContent to your backend or display it on the page as you need

    // Optionally, clear the form after submission
    document.getElementById('postContent').value = '';
});