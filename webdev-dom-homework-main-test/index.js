import { rendorStudion } from "./rendorStudion.js";
import { listModule } from "./list.js";
import { modul } from "./modul.js";
import { updateTasks } from "./masiv.js";

import { getComments } from "./api.js";
import { postComment } from "./api.js";

function checkAuth() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const loginAlertEl = document.getElementById("login-alert");
  const addFormEl = document.getElementById("add-form");
  const nameInputEl = document.getElementById("field");
  if (token) {
    if (loginAlertEl) loginAlertEl.style.display = "none";
    if (addFormEl) addFormEl.style.display = "flex";
    if (nameInputEl && userName) {
      nameInputEl.value = userName;
      nameInputEl.disabled = true;
    }
  } else {
    if (loginAlertEl) loginAlertEl.style.display = "block";
    if (addFormEl) addFormEl.style.display = "none";
  }
}
checkAuth();
