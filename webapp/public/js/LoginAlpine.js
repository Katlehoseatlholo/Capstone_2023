// Define a shared scope to store loggedInUser
let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser")) || {};

// Wrap the Alpine.js initialization in an async function
document.addEventListener("alpine:init", () => {
  // Define a new Alpine.js data component called "Login"
  Alpine.data("Login", () => {
    return {
      username: "",
      password: "",
      message: "",
     loggedInUser: loggedInUser, // Access the shared loggedInUser here
      updatedUser: {
        Name: "",
        Surname: "",
        MobileNumber: "",
        AddressLine1: "",
        Role: "",
        EmailID: "",
        Education: "",
        Experience: "",
        AdditionalDetails: "",
      },


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

              // Store user details in localStorage
              sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify(this.loggedInUser)
              );
                 console.log(this.loggedInUser.emailID)
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
      async fetchUserDetails() {
        try {
          // Check if loggedInUser and EmailID exist before making the request
          if (this.loggedInUser && this.loggedInUser.emailID) {
            // Use the correct endpoint for fetching user details
            const response = await axios.get(`/user/${this.loggedInUser.emailID}`);

            // Debug log: Check if user details are fetched
            console.log("Fetched User Details:", response.data);

            this.loggedInUser = response.data;
            this.updatedUser = { ...this.loggedInUser };
          }
        } catch (error) {
          console.error(error);
        }
      },

      async saveProfile() {
        try {
          // Use the correct endpoint for updating user details
          await axios.put(`/user/${this.updatedUser.EmailID}`, this.updatedUser);
          alert("Profile updated successfully");
        } catch (error) {
          console.error(error);
          alert("Failed to update profile");
        }
      },

      async getEmail() {
        try {
          // Access the email directly from loggedInUser
          console.log(this.loggedInUser.EmailID);
        } catch (error) {
          console.error(error);
          alert("Failed to get email");
        }
      },

    };
  });


});
