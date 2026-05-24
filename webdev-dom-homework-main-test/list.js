import { rendorStudion } from "./rendorStudion.js";
import { lik } from "./masiv.js";


export let listModule = () => {
  const textEl = document.getElementById("tex");
  const nameEl = document.getElementById("field");
  const savedName = localStorage.getItem("userName"); 
  list.addEventListener("click", (event) => {
    if (event.target.classList.contains("comment-text")) {
      const index = parseInt(event.target.dataset.index);    
      const originalName = lik[index].name;
      const author = originalName === "админ" && savedName 
        ? savedName 
        : originalName;       
      const text = lik[index].text;
      const quote = `Автор: ${author}\n\n Ответ на: ${text}\n\n`;
      textEl.value = quote + textEl.value;
      nameEl.focus();
    }
  });
};
