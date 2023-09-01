// Listen for the "alpine:init" event to initialize Alpine.js
document.addEventListener("alpine:init", () => {
  // Define a new Alpine.js data component called "login"
  Alpine.data("Login", () => {
    return {
      // Define data properties here
      username: "",
      password: "",
      message: "",

      // Define methods for interacting with the server
      register() {
        fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            this.message = data.message;
          });
      },

      login() {
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            this.message = data.message;
          });
      },

      logout() {
        fetch("/logout")
          .then((response) => response.json())
          .then((data) => {
            this.message = data.message;
          });
      },
    };
  });
});
