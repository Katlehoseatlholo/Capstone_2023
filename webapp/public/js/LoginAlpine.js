// Listen for the "alpine:init" event to initialize Alpine.js
document.addEventListener("alpine:init", () => {
  // Define a new Alpine.js data component called "login"
  Alpine.data("Login", () => {
    return {
      // Define data properties here
      username: "",
      password: "",
      message: "",
      loggedInUser: null, // To store the logged-in user's information


      // Define methods for interacting with the server
      register() {
        axios
          .post('/register', {
            emailID: this.username,
            password: this.password,
          })
          .then((response) => {
            this.message = response.data.message;
          })
          .catch((error) => {
            console.error(error);
            this.message = 'Registration failed';
          });

           // After a successful registration, you can update the loggedInUser property
    this.loggedInUser = { emailID: this.username, /* other user details */ };
 
      },
    
      login() {
        axios
          .post('/login', {
            emailID: this.username,
            password: this.password,
          })
          .then((response) => {
            console.log(response);
            this.message = response.data.message;
            if (response.data.message === 'Login successful') {
              // Set the loggedInUser when login is successful
              this.loggedInUser = { emailID: this.username, /* other user details */ };
            }
          })
          .catch((error) => {
            console.error(error);
            this.message = 'Login failed';
          });
      },
    
      logout() {
        this.loggedInUser = null;

        axios
          .get('/logout')
          .then((response) => {
            this.message = response.data.message;
          })
          .catch((error) => {
            console.error(error);
            this.message = 'Logout failed';
          });
      },
    };
  });
});
