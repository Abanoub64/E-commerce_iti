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
      password.classList.remove("is-invalid");
    }

    if (!isLogin) {
      if (
        password.value !== confirmPassword.value ||
        confirmPassword.value === ""
      ) {
        confirmPassword.classList.add("is-invalid");
        isValid = false;
      } else {
        confirmPassword.classList.remove("is-invalid");
      }
    }

    if (!isValid) return;

    // Send request
    const payload = {
      userName: userName.value,
      password: password.value,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert(`${isLogin ? "Login" : "Register"} successful`);
      window.location.href = "../pages/product.html";
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
});
