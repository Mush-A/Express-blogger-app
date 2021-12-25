let loginForm = document.getElementById("register-form");
let msg = document.getElementById("msg");
let alertPlaceholder = document.getElementById("liveAlertPlaceholder");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let bio = document.getElementById("bio").value;

  const data = { firstname, lastname, email, username, password, bio };

  post(data);
});

const post = async (data) => {
  await fetch("/api/v1/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      alertPlaceholder.innerHTML = "";

      if (data.success) {
        alert("Successful login", "success");
        setTimeout(() => (window.location.href = `/`), 100);
      } else {
        for (const param in data.errors) {
          let message = data.errors[param].msg;
          alert(message, "warning");
        }
      }
    });
};

function alert(message, type) {
  var wrapper = document.createElement("div");
  wrapper.innerHTML = `<div class="alert p-1 alert-${type}" role="alert">${message}</div>`;

  alertPlaceholder.append(wrapper);
}
