import {rendorStudion,} from"./rendorStudion.js";
import {listModule} from"./list.js";
import { modul } from "./modul.js";
  import { updateTasks } from "./masiv.js";
  const textEl = document.getElementById("tex")
  const nameEl = document.getElementById("field")
 
 const getComments = () => {
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
const newTasc ={
    "text": "Текст коммента", "name": "Глеб Ф." 
}
 fetch('https://wedev-api.sky.pro/api/v1/Vladimir030696/comments',{
    method: 'POST',
    body: JSON.stringify(newTasc),
 })
 .then((response)=>{
    return response.json()
 }).then((data) => {
    getComments(); 
    
    // Очистка полей (убедитесь, что переменные inputName/inputText созданы)
    nameEl.value = "";
    textEl.value = "";

 })

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