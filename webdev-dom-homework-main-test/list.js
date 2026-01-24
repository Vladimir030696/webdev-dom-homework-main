 import {rendorStudion} from"./rendorStudion.js";
 import { lik } from "./masiv.js";
 export let listModule =()=>{
 const textEl = document.getElementById("tex")
  const nameEl = document.getElementById("field")
  list.addEventListener('click', (event) => {
   if (event.target.classList.contains('comment-text')) {
     const index = parseInt(event.target.dataset.index);
     const author = lik[index].name;
     const text = lik[index].text;   
     const quote = `Автор: ${author}\n
     \n Ответ на: ${text}
     \n`;
     textEl.value = quote + textEl.value;
     nameEl.focus();
   



     fetch("https://wedev-api.sky.pro/api/v1/Vladimir030696/comments",{
        method: "POST",
       
      
body: JSON.stringify({ "text": "Текст коммента", "name": "Глеб Ф." }),
      }).then( response =>{
        return response.json()
      }).then(data=>{
        console.log(data)
         updateTasks(data.comments)
         
           
            //    modul() 
            //  listModule()
      })
    }
 });}

  