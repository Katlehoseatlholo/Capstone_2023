// Wrap the Alpine.js initialization in an async function

document.addEventListener("alpine:init", () => {
  Alpine.data("Login", () => {
    return {
      username: "",
      password: "",
      message: "",
      loggedInUser: null,

      async register() {
        try {
          const response = await axios.post("/register", {
            emailID: this.username,
            password: this.password,
          });
          this.message = response.data.message;

          if (response.data.message === "Registration successful") {
            // Redirect to the profile page after successful registration
            window.location.href = "/profile.html"; // Change the URL to your profile page
          }
        } catch (error) {
          console.error(error);
          this.message = "Registration failed";
        }
      },

      // Alpine.js login function

      async login() {
        try {
          const response = await axios.post("/login", {
            emailID: this.username,
            password: this.password,
          });

          if (response.status === 200) {
            // Check if the email is admin@gmail.com
            if (this.username === "admin@gmail.com") {
              // Redirect to the admin dashboard
              window.location.href =
                "http://localhost:3000/admindashboard.html"; // Change the URL to your admin dashboard
            } else {
              // Set the loggedInUser when login is successful for regular users
              this.loggedInUser = {
                emailID: this.username, // other user details
              };

              // Redirect regular users to the profile page
              window.location.href = "http://localhost:3000/profile.html"; // Change the URL to your profile page
            }
          } else if (response.status === 401) {
            this.message = "Invalid credentials"; // Handle invalid credentials
          } else {
            this.message = "Login failed"; // Handle other login errors
          }
        } catch (error) {
          console.error(error);
          this.message = "Login failed";
        }
      },

      async logout() {
        this.loggedInUser = null;
        try {
          const response = await axios.get("/logout");
          this.message = response.data.message;
        } catch (error) {
          console.error(error);
          this.message = "Logout failed";
        }
      },
    };
  });
});
