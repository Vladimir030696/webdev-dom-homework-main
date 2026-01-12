// import {rendorStudion} from"./rendorStudion.js";
import { listModule } from "./list.js";
 import { modul } from "./modul.js";
import { updateTasks } from "./masiv.js";

 
 
 
 fetch(' https://wedev-api.sky.pro/api/v1/Vladimir030696/comments' )
 .then((response)=>{
    return response.json()
 })
 .then((data)=>{
    console.log(data)
  
    updateTasks(data.comments)
 
   // rendorStudion()
      modul() 
    listModule()
})
 fetch("https://wedev-api.sky.pro/api/v1/Vladimir030696/comments",{
        method: "POST",
       
      
body: JSON.stringify({ "text": "Текст коммента", "name": "Глеб Ф." }),
      }).then( response =>{
        return response.json()
      }).then(data=>{
        console.log(data)
         updateTasks(data.comments)
         
           
              modul() 
            listModule()
      })
//  rendorStudion()
//    modul() 
//     listModule()
//      rendorStudion()