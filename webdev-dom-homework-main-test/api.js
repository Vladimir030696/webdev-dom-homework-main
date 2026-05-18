 import {rendorStudion} from"./rendorStudion.js";
import { modul } from "./modul.js";
 import { updateTasks } from "./masiv.js";
import {listModule} from"./list.js";



export let token = localStorage.getItem("token") || null;//test

 const textEl = document.getElementById("tex")
  const nameEl = document.getElementById("field")
 
 
 
  const authBlockEl = document.getElementById("auth-block"); //test
const addFormEl = document.getElementById("add-form");// test



export const checkAuth = () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName"); // Достаем имя
    const addFormEl = document.getElementById("add-form");
    const authBlockEl = document.getElementById("auth-block");
    const nameEl = document.getElementById("field"); // Инпут имени

    if (token) {
        if (addFormEl) addFormEl.style.display = "flex";
        if (authBlockEl) authBlockEl.style.display = "none";
        
        // Автоподстановка имени
        if (nameEl && userName) {
            nameEl.value = userName;
            nameEl.disabled = true; // Запрещаем менять имя авторизованного юзера
        }
    } else {
        if (addFormEl) addFormEl.style.display = "none";
        if (authBlockEl) authBlockEl.style.display = "block";
    }
};//test











export const getComments = () => {
   const loader = document.getElementById("comments-loader");
    const listElement = document.getElementById("list");


   loader.style.display = "block";
    listElement.style.display = "none";

 fetch('https://wedev-api.sky.pro/api/v2/Vladimir030696/comments', {
    method: 'GET',
 })
 .then((response)=>{
    return response.json() 
})
.then((data)=>{
    console.log(data)
    updateTasks(data.comments)
    rendorStudion()
    modul() 
    listModule()
     checkAuth()
})
.finally(() => {
        loader.style.display = "none";
        listElement.style.display = "flex"; 
    });
}
export const postComment =()=>{
   
      if (!token) {
        alert("Вы должны авторизоваться, чтобы оставлять комментарии!");
        return;
    }//tets



  nameEl.classList.remove("error");
  textEl.classList.remove("error");

  if (nameEl.value.trim().length < 3 || textEl.value.trim().length < 3) {
        // ДОБАВЛЕНО: Подсветка полей, если они пустые или короткие
        if (nameEl.value.trim().length < 3) nameEl.classList.add("error");
        if (textEl.value.trim().length < 3) textEl.classList.add("error");

        alert("Имя и комментарий должны содержать хотя бы 3 символа!");
        
        buttonEl.disabled = false;
        buttonEl.textContent = 'Написать';
        return; 
    }

    const newTasc ={
    "text":  textEl.value,
     "name": nameEl.value
}
 fetch('https://wedev-api.sky.pro/api/v2/Vladimir030696/comments',{
    method: 'POST',
    body: JSON.stringify(newTasc),
      headers: {
            Authorization: `Bearer ${token}`,
        }//tets
 })
 .then((response)=>{
    if (response.status === 401) {
            throw new Error("Вы не авторизованы");//tets
        }
    if (response.status === 400) {
            throw new Error("Слишком короткое имя или текст");
        }
        if (response.status === 500) {
            throw new Error("Сервер сломался, попробуй позже");
        }


    return response.json()
 }).then((data) => {
    getComments(); 
    
    nameEl.value = "";
    textEl.value = "";

 })

 .catch((error) => {
        // 2. Сценарий: Обработка отсутствия интернета или ошибок сервера
        if (error.message === "Failed to fetch") {
            alert("Кажется, у вас пропал интернет. Проверьте соединение и попробуйте снова.");
        } else {
            alert(error.message);
        }
        console.warn(error);
    })


  .finally(() => {
        // Этот блок выполнится в ЛЮБОМ случае: и при успехе, и при ошибке
        buttonEl.disabled = false;
        buttonEl.textContent = 'Написать';
    });}
getComments();
const buttonEl = document.querySelector(".add-form-button"); 
buttonEl.disabled = false
buttonEl.textContent = 'Написать'
buttonEl.addEventListener("click", () => { 

   buttonEl.disabled = true
buttonEl.textContent ='Жди отправляется!!!'
    postComment(); 
    
});


















//  .then((data)=>{
//     updateTasks(data.comments)
//      rendorStudion()
//     modul() 
//     listModule()
//  })
//  rendorStudion()
//    modul() 
//     listModule()
//      rendorStudion()