// Listen for the "alpine:init" event to initialize Alpine.js
document.addEventListener("alpine:init", () => {
    // Define a new Alpine.js data component called "Profile"
    Alpine.data("Profile", () => {
      return {
        loggedInUser: {},
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
  
        async fetchUserDetails(email) {
          try {
            // Use the correct endpoint for fetching user details
            const response = await axios.get(`/user/${email}`);
            this.loggedInUser = response.data;
            this.updatedUser = { ...this.loggedInUser };
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
      };
    });
  });
  