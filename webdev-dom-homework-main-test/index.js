import {rendorStudion,} from"./rendorStudion.js";
import {listModule} from"./list.js";
import { modul } from "./modul.js";
  import { updateTasks } from "./masiv.js";
  const textEl = document.getElementById("tex")
  const nameEl = document.getElementById("field")
 
export const getComments = () => {
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
 }

export const postComment =()=>{
 const newTasc ={
    "text":  textEl.value, "name": nameEl.value
}
 fetch('https://wedev-api.sky.pro/api/v1/Vladimir030696/comments',{
    method: 'POST',
    body: JSON.stringify(newTasc),
 })
 .then((response)=>{
    return response.json()
 }).then((data) => {
    getComments(); 
    
    nameEl.value = "";
    textEl.value = "";

 })}
getComments();
const buttonEl = document.querySelector(".add-form-button"); 
buttonEl.addEventListener("click", () => { 
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