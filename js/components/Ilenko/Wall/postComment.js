define([
  "Base/Component",
  "components/Ilenko/Common/TimeConvector",
], function (Component, Time) {
  class PostComment extends Component {
    constructor(options) {
      super(options);
      this.state.status;
      this.state.count = -3;
    }

    afterMount() {
      //подписываемся под "Показать еще комментарии"
      this._more = this.getContainer().querySelector(".post-comments__more");
      this.subscribeTo(this._more, "click", this.onClickMore.bind(this));

      //подписываемся под "Отправить"
      this._sendButton = document.querySelectorAll(".post-sender__send");
      this._sendButton.forEach((el) => {
        this.subscribeTo(el, "click", this.onClickSend.bind(this));
      });

      // Присваиваем значение после загрузки(Для того, чтобы при нажатии на .post-comments__more менялось значение)
      this.state.status = false;
      // Отобпажаем или еще нет .post-comments__more
      this.showOrHideCommentMore();
    }

    /**
     * Действие по клику "Отправить"
     */
    onClickSend() {
      //Делаем задержку для отображения нового поста
      setTimeout(
        function () {
          this.update();
        }.bind(this),
        1000
      );
      //Отобпажаем или еще нет .post-comments__more
      this.showOrHideCommentMore();
    }
    /**
     * Действие по клику
     */
    onClickMore() {
      //Присваиваем ивент
      let element = event.currentTarget;
      //Меняем значение в this.state
      this.moreAndLessComments();
      //Присваемываем значения в par
      let par = this.moreAndLessComments();
      //Отображаем par в данном элементе
      element.innerHTML = this.moreAndLessComments();
      //Обновляем содержимое в блоке комментариев
      this.update();
      return element;
    }

    /**
     * Обновляем показ комментариев
     */
    update() {
      this.getContainer().querySelector(
        ".post-comments-block"
      ).innerHTML = this.renderBody(this.options);
    }

    /**
     * Отображение заголовка комментария в завиисимости от status(default-при загрузке, status = undefined)
     */
    moreAndLessComments() {
      switch (this.state.status) {
        case false:
          this.state.status = true;
          this.state.count = 0; // для '.slice' в render
          return `Скрыть комментарии`;
        case true:
          this.state.status = false;
          this.state.count = -3; // для '.slice' в render
          return `Показать еще комментарии`;
        default:
          return `Показать еще комментарии`;
      }
    }

    /**
     * Отображение или скрытие post-comments__more в зависимости от кол-во комментарий
     */
    showOrHideCommentMore() {
      if (this.options.item.comments.length < 3) {
        this._more.style.display = "none";
      } else {
        this._more.style.display = "flex";
      }
    }

    render({ item }) {
      return `<div class="post-comments">
        <p class="post-comments__more">${this.moreAndLessComments()}</p>
        ${this.renderCommentsBlock({ item })}
      </div>`;
    }

    renderCommentsBlock({ item }) {
      return `<div class="post-comments-block">
                ${this.renderBody({ item })}
              </div>`;
    }

    renderBody({ item }) {
      //Если есть комментарии, отображаем их
      if (this.options.item.comments.length > 0) {
        //Срезаем массив под нужнное кол-во
        let comments = item.comments.slice(this.state.count);
        return `${comments.map(this.renderComment.bind(this)).join("\n")}`;
      } else {
        //Если нет комментариев, ничего не возвращаем
        return "";
      }
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
