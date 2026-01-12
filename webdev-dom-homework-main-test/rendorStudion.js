import {lik} from"./masiv.js"
export const rendorStudion =()=>{ 
const studionHtml = lik.map((item,index)=>{
  const activeClass = item.isLiked ? 'active' : '';
  return `<li class="comment">
          <div class="comment-header">
            <div>${item.name}</div>
            <div>${item.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text"data-index="${index}">
             ${item.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter"data-index="${index}">${item.liki}</span>
              <button class="like-button ${activeClass}"data-index="${index}"><svg class="like-icon" xmlns="www.w3.org" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg></button>
            </div>
          </div>
        </li>`;}).join("");
        list.innerHTML = studionHtml;
      const likesEl = document.querySelectorAll(".like-button")
 for(const studionE of likesEl){
 studionE.addEventListener("click",()=>{
 const index = parseInt( studionE.dataset.index)

   if (!lik[index].isLiked) {
     
      lik[index].liki++;
      lik[index].isLiked = true;
      studionE.classList.add("active")
    } else {

      lik[index].liki--;
      lik[index].isLiked = false;
      studionE.classList.remove("active")
    }
    rendorStudion()
  })
 }}
  rendorStudion()

  