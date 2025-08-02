document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        alert("Login successful!");
        // Here you can add further login logic or API calls
    } else {
        alert("Please fill in both fields.");
    }
});

document.getElementById("shareAppLink").addEventListener("click", function () {
    const appEmail = document.getElementById("appEmail").value;
    if (appEmail) {
        alert(`App link sent to email: ${appEmail}`);
        // Here you can send the app download link via email
    } else {
        alert("Please enter an email address.");
    }
});
