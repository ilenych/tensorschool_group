// create quarySelectorALL
function getStackElements(text) {
  return document.querySelectorAll(text);
}

// create addEventListener
function addEventListenerClick(text, func) {
  let element = getStackElements(text);
  element.forEach((el) => {
    el.addEventListener("click", func);
  });
}
// Created events
addEventListenerClick(".like_smiles", prepare);
addEventListenerClick(".sender__send", send);

// Prepare and current targeet
function prepare() {
  let element = event.currentTarget;
  likeIsSelected(element.dataset.id);
}

// If like is selected change color and font-size and plus one like
function likeIsSelected(id) {
  let element = getStackElements(".like_smiles__text");
  element[id].classList.add("likeIsSelected");
  element[id].innerHTML = plusOneLike(element[id].innerHTML);
}

// Plus onee like in text
function plusOneLike(text) {
  return Number(text) + 1; // true false
}

//Remove events
//   function removeEventListenerToHover(text, func) {
//     let element = getStackElements(text);
//     element.forEach((el) => {
//         el.removeEventListener("click", func);
//     });
//   }
//********************************************** */

// Read text in textarea and push in new render comment
function send() {
  const element = getStackElements(".sender__textarea");
  let text = "";
  element.forEach((el) => {
    text = el.value;
  });
  let pp = renderAddNewComment("img/ava.png", "I am", text, new Date());
  console.log(pp);
}

// Render new comment
function renderAddNewComment(url, name, text, data) {
  return `<div class="main_left_post_comments">
    <img class="comments__ava" src="${url}" alt="Аватар">
    <p class="comments__name" title="${name}">${name}</p>
    <span class="comments__text" title="Comment">${text}</span>
    <p class="comments__time text_lightgray" title="Время">${data}</p>
  </div>`;
}
