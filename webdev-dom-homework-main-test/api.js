import { rendorStudion } from "./rendorStudion.js";
import { modul } from "./modul.js";
import { updateTasks } from "./masiv.js";
import { listModule } from "./list.js";

// Экспортируем токен и функцию обновления токена (понадобится при перезаходе)
export let token = localStorage.getItem("token") || null;

const textEl = document.getElementById("tex");
const nameEl = document.getElementById("field");
const buttonEl = document.querySelector(".add-form-button"); // Перенесли наверх, чтобы был доступен везде

export const checkAuth = () => {
  // Обновляем значение токена из хранилища на случай, если пользователь только что вошел
  token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const addFormEl = document.getElementById("add-form");
  const authBlockEl = document.getElementById("auth-block");
  const nameEl = document.getElementById("field"); 

  if (token) {
    if (addFormEl) addFormEl.style.display = "flex";
    if (authBlockEl) authBlockEl.style.display = "none";

    if (nameEl && userName) {
      nameEl.value = userName;
      nameEl.disabled = true; 
    }
  } else {
    if (addFormEl) addFormEl.style.display = "none";
    if (authBlockEl) authBlockEl.style.display = "block";
  }
};

export const getComments = () => {
  const loader = document.getElementById("comments-loader");
  const listElement = document.getElementById("list");

  if (loader) loader.style.display = "block";
  if (listElement) listElement.style.display = "none";

  fetch("https://wedev-api.sky.pro/api/v2/Vladimir030696/comments", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateTasks(data.comments);
      rendorStudion();
      modul();
      listModule();
      checkAuth();
    })
    .finally(() => {
      if (loader) loader.style.display = "none";
      if (listElement) listElement.style.display = "flex";
    });
};

export const postComment = () => {
  if (!token) {
    alert("Вы должны авторизоваться, чтобы оставлять комментарии!");
    if (buttonEl) {
      buttonEl.disabled = false;
      buttonEl.textContent = "Написать";
    }
    return;
  }

  nameEl.classList.remove("error");
  textEl.classList.remove("error");

  // Валидация: если имя или текст короткие
  if (nameEl.value.trim().length < 3 || textEl.value.trim().length < 3) {
    if (nameEl.value.trim().length < 3) nameEl.classList.add("error");
    if (textEl.value.trim().length < 3) textEl.classList.add("error");

    alert("Имя и комментарий должны содержать хотя бы 3 символа!");

    // Разблокируем кнопку ЗДЕСЬ, так как до блока finally код не дойдет из-за return
    if (buttonEl) {
      buttonEl.disabled = false;
      buttonEl.textContent = "Написать";
    }
    return; // Полностью останавливаем функцию, запрос на сервер НЕ отправляется
  }

  const newTasc = {
    text: textEl.value,
    name: nameEl.value,
  };

  fetch("https://wedev-api.sky.pro/api/v2/Vladimir030696/comments", {
    method: "POST",
    body: JSON.stringify(newTasc),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Вы не авторизованы");
      }
      if (response.status === 400) {
        throw new Error("Слишком короткое имя или текст");
      }
      if (response.status === 500) {
        throw new Error("Сервер сломался, попробуй позже");
      }
      return response.json();
    })
    .then((data) => {
      getComments();
      textEl.value = ""; // Очищаем только текст (имя авторизованного юзера остается)
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        alert("Кажется, у вас пропал интернет. Проверьте соединение и попробуйте снова.");
      } else {
        alert(error.message);
      }
      console.warn(error);
    })
    .finally(() => {
      if (buttonEl) {
        buttonEl.disabled = false;
        buttonEl.textContent = "Написать";
      }
    });
};

// Инициализация при загрузке страницы
getComments();

if (buttonEl) {
  buttonEl.disabled = false;
  buttonEl.textContent = "Написать";
  buttonEl.addEventListener("click", () => {
    buttonEl.disabled = true;
    buttonEl.textContent = "Жди отправляется!!!";
    postComment();
  });
}
