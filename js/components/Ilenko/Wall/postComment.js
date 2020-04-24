define(["Base/Component", "Wall/TimeConvector"], function (Component, Time) {
  class PostComment extends Component {
    constructor(options) {
      super(options);
      this.state.item = options.item;
      this.state.status = false;
      this.state.count = -3;
    }

    afterMount() {
      this._send = this.getContainer().querySelector(".post-comments__more");
      this.subscribeTo(this._send, "click", this.onClick.bind(this));
    }
    /**
     * Действие по клику
     */
    onClick() {
      this.update();
    }

    /**
     * Обновляем показ комментариев
     */
    update() {
      super.update();
      this.unmountChildren();
      this.getContainer().innerHTML = this.render(this.options);
      this.updateSubscribe();
    }

    /**
     * Обновляем event listener 
     */
    updateSubscribe() {
      this.afterMount();
    }

    /**
     * Отображение заголовка комментария в завиисимости от кол-во комментов
     */
    moreAndLessComments() {
      if (this.options.item.comments.length < 4) {
        return `<p class="post-comments__more"></p>`;
      } else if (this.state.status == false) {
        this.state.status = true; 
        this.state.count = 0; // для '.slice' в render
        return `<p class="post-comments__more">Показать еще комментарии</p>`;
      } else if (this.state.status == true) {
        this.state.status = false; 
        this.state.count = -3; // для '.slice' в render
        return `<p class="post-comments__more">Скрыть комментарии</p>`;
      }
    }

    render({ item }) {
      let comments = item.comments.slice(this.state.count);
      return `<div class="post-comments">
              ${this.moreAndLessComments()}
              ${comments.map(this.renderComment.bind(this)).join("\n")}
              </div>`;
    }

    renderComment({ userUrlImage, userName, commentText, commentTime }) {
      return `<div class="post-comments-comment">
                <img class="post-comments-comment__ava" src="${userUrlImage}" alt="Аватар" title=${userName}>
                 <p class="post-comments-comment__name" title="${userName}">${userName}</p>
                 <span class="post-comments-comment__text" title="Комментарий">${commentText}</span>
                <p class="post-comments-comment__time text_lightgray" title="Время">${Time.convert(
                  commentTime
                )}</p>
            </div>`;
    }
  }

  return PostComment;
});
