let loginForm = document.getElementById("login-form");
let msg = document.getElementById("msg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.getElementById("username");
  let password = document.getElementById("password");

  const data = {
    username: username.value,
    password: password.value,
  };

  post(data);
});

const post = async (data) => {
  await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      msg.innerHTML = "";
      if (data.success) {
      } else {
        for (const param in data.errors) {
          let message = data.errors[param].msg;
          let err = document.createElement("div");
          err.innerHTML = message;
          msg.appendChild(err);
        }
      }
    });
};
