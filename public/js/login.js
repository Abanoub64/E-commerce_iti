// let userName = document.getElementById("UserName");
// let passWord = document.getElementById("password");

// let login = async () => {
//   let userReq = {
//     userName: userName.value,
//     password: passWord.value,
//   };

//   try {
//     let res = await fetch("http://localhost:3000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userReq),
// credentials: "include",
//     });

//     let data = await res.json();
//     console.log("✅ Response from backend:", data);
//   } catch (error) {
//     console.error("❌ Error:", error);
//   }
// };
// let sendUser = async () => {
//   let userReq = {
//     userName: userName.value,
//     password: passWord.value,
//   };

//   try {
//     let res = await fetch("http://localhost:3000/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userReq),
//       credentials: "include",
//     });

//     let data = await res.json();
//     console.log("✅ Response from backend:", data);
//   } catch (error) {
//     console.error("❌ Error:", error);
//   }
// };
let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;

  document.getElementById("form-title").textContent = isLogin
    ? "Login"
    : "Register";
  document.getElementById("confirmPasswordDiv").style.display = isLogin
    ? "none"
    : "block";
  document.getElementById("toggleText").textContent = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  document.querySelector(".toggle-btn").textContent = isLogin
    ? "Register"
    : "Login";
}

document
  .getElementById("authForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const userName = document.getElementById("userName");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    let isValid = true;

    if (userName.value.trim() === "") {
      userName.classList.add("is-invalid");
      isValid = false;
    } else {
      userName.classList.remove("is-invalid");
    }

    if (password.value.length < 6) {
      password.classList.add("is-invalid");
      isValid = false;
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
      // يمكنك تحويل المستخدم لصفحة أخرى
      // window.location.href = "/dashboard.html";
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  });
