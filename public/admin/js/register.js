document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("rePassword").value;
    const phone = document.getElementById("phone").value;

    if (password !== rePassword) {
        alert("Passwords do not match!");
        return;
    }

    if (name && email && password && phone) {
        alert("Registration successful!");
        // Here you can send the data to the server
    } else {
        alert("Please fill in all fields.");
    }
});

document.getElementById("shareAppLink").addEventListener("click", function () {
    const email = document.getElementById("appEmail").value;
    if (email) {
        alert(`App link sent to email: ${email}`);
        // Here you can send the app download link via email
    } else {
        alert("Please enter an email address.");
    }
});
