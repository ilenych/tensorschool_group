define(["Base/Component", "Wall/TimeConvector"], function (Component, Time) {

  class PostComment extends Component {
//TODO: При нажатии на  <p class="post-comments__more">Показать еще комментарии</p> отобразить больше комментариев
    // afterMount() {
    //   this._send = this.getContainer().querySelector(".post-comments__more");
    //   this.subscribeTo(this._send, "click", this.onClick.bind(this));
    // }

    // onClick() {
    //   console.log(this.options.item.comments)
    //   let item = this.showMoreComments()
    //   this.update()
    // }
    // beforeUpdate(){
    // }

    // showMoreComments() {

    // }


    render({ item }) {
      let comments = item.comments.slice(-3);   // придумать как менять значения тут
      return `<div class="post-comments">
              <p class="post-comments__more">Показать еще комментарии</p>
              ${comments.map(this.renderComment.bind(this)).join("\n")}
              </div>`
    }

    renderComment({ userUrlImage, userName, commentText, commentTime }) {
      return `<div class="post-comments-comment">
                <img class="post-comments-comment__ava" src="${userUrlImage}" alt="Аватар" title=${userName}>
                 <p class="post-comments-comment__name" title="${userName}">${userName}</p>
                 <span class="post-comments-comment__text" title="Комментарий">${commentText}</span>
                <p class="post-comments-comment__time text_lightgray" title="Время">${Time.convert(commentTime)}</p>
            </div>`;
    }
  }
  
  return PostComment;
});
