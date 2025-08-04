document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        alert("Login successful!");
      
    } else {
        alert("Please fill in both fields.");
    }
});

document.getElementById("shareAppLink").addEventListener("click", function () {
    const appEmail = document.getElementById("appEmail").value;
    if (appEmail) {
        alert(`App link sent to email: ${appEmail}`);
       
    } else {
        alert("Please enter an email address.");
    }
});
