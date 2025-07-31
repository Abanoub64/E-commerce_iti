let userName = document.getElementById("UserName");
let passWord = document.getElementById("password");

let sendUser = async () => {
  let userReq = {
    userName: userName.value,
    password: passWord.value,
  };

  try {
    let res = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userReq),
    });

    let data = await res.json();
    console.log("✅ Response from backend:", data);
  } catch (error) {
    console.error("❌ Error:", error);
  }
};
