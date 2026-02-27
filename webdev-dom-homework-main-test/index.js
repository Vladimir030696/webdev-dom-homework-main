import {rendorStudion,} from"./rendorStudion.js";
import {listModule} from"./list.js";
import { modul } from "./modul.js";
  import { updateTasks } from "./masiv.js";
  const textEl = document.getElementById("tex")
  const nameEl = document.getElementById("field")
 
export const getComments = () => {
   const loader = document.getElementById("comments-loader");
    const listElement = document.getElementById("list");


   loader.style.display = "block";
    listElement.style.display = "none";


 fetch(' https://wedev-api.sky.pro/api/v1/Vladimir030696/comments', {
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
})



.finally(() => {
        loader.style.display = "none";
        listElement.style.display = "flex"; 
    });




   }

export const postComment =()=>{





   
 const newTasc ={
    "text":  textEl.value, "name": nameEl.value
}
 fetch('http://wedev-api.sky.pro/api/v1/Vladimir030696/comments',{
    method: 'POST',
    body: JSON.stringify(newTasc),
 })
 .then((response)=>{
    return response.json()
 }).then((data) => {
    getComments(); 
    
    nameEl.value = "";
    textEl.value = "";

 }) .finally(() => {
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