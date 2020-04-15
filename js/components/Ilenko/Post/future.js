

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
