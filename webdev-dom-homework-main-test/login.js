const buttonEl = document.getElementById("login-button");
const loginInputEl = document.getElementById("login-input");
const passwordEl = document.getElementById("password-input");
const loginFormEl = document.getElementById("login-form");
const token = "asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

buttonEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (!loginInputEl.value.trim() || !passwordEl.value.trim()) {
    alert("Заполните логин и пароль!");
    return;
  }
  buttonEl.disabled = true;
  buttonEl.textContent = "Вход...";
  fetch("https://wedev-api.sky.pro/api/v2/todos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: "Вход в систему через задачи",
    }),
  })
    .then((response) => {
      if (response.status === 400 || response.status === 401) {
        throw new Error("Ошибка запроса или неверный токен.");
      }
      if (response.status === 500) {
        throw new Error("Сервер упал из-за неверного формата данных");
      }
      return response.json();
    })
    .then((responseData) => {
      localStorage.setItem("token", token);
      localStorage.setItem("userName", loginInputEl.value.trim());

      if (loginFormEl) {
        loginFormEl.style.display = "none";
      }
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
      buttonEl.disabled = false;
      buttonEl.textContent = "Войти";
    });
});
