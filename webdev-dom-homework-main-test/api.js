import { rendorStudion } from "./rendorStudion.js";
import { modul } from "./modul.js";
import { updateTasks } from "./masiv.js";
import { listModule } from "./list.js";

export let token = localStorage.getItem("token") || null;

const textEl = document.getElementById("tex");
const nameEl = document.getElementById("field"); 
const buttonEl = document.querySelector(".add-form-button"); 

export const checkAuth = () => {
  token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const addFormEl = document.getElementById("add-form");
  const authBlockEl = document.getElementById("auth-block");

  if (token) {
    if (addFormEl) addFormEl.style.display = "flex";
    if (authBlockEl) authBlockEl.style.display = "none";
    if (nameEl && userName && !nameEl.value.trim()) {
      nameEl.value = userName;
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

  if (nameEl.value.trim().length < 3 || textEl.value.trim().length < 3) {
    if (nameEl.value.trim().length < 3) nameEl.classList.add("error");
    if (textEl.value.trim().length < 3) textEl.classList.add("error");
    alert("Имя и комментарий должны содержать хотя бы 3 символа!");
    if (buttonEl) {
      buttonEl.disabled = false;
      buttonEl.textContent = "Написать";
    }
    return; 
  }
  localStorage.setItem("userName", nameEl.value);

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
      if (response.status === 401) throw new Error("Вы не авторизованы");
      if (response.status === 400) throw new Error("Слишком короткое имя или текст");
      if (response.status === 500) throw new Error("Сервер сломался, попробуй позже");
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("latestCommentText", textEl.value);
      localStorage.setItem("userName", nameEl.value);
      getComments();
      textEl.value = ""; 
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        alert("Кажется, у вас пропал интернет. Проверьте соединение и попробуйте снова.");
      } else {
        alert(error.message);
      }
    })
    .finally(() => {
      if (buttonEl) {
        buttonEl.disabled = false;
        buttonEl.textContent = "Написать";
      }
    });
};

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

