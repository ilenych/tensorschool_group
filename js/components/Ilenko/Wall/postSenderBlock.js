define(["Base/Component", "Wall/NetworkService"], function (
  Component,
  NetworkService
) {
  class PostSenderBlock extends Component {
    afterMount() {
      this._send = this.getContainer().querySelector(".post-sender__send");
      this.subscribeTo(this._send, "click", this.onClick.bind(this));
    }

    onClick() {
      //находим нужный textarea
      this._text = this.getContainer().querySelector(".post-sender__textarea");
      //получаем данные
      let text = this._text.value;
      //проверка на пустой коммент
      if (text != "") {
        //отправляем на сервер
        this.postData(text);
      }
    }
    /**
     * Пушит данные на сервер
     * @param {String} text - результат ввода текста с textarea
     */
    postData(text) {
      //создает коммент
      let comment = this.createComment(text);
      //пушит на сервер
      NetworkService.postData(comment);
      //чистим textarea
      this._text.value = '';
    }
    /**
     * Создает модель для пуша на сервер
     * @param {String} text -результат ввода текста с textarea
     */
    createComment(text) {
      let comment = {
        //TODO: Заменить userUrlImage и userName
        userUrlImage: "img/post/newUser.png", // зависит от sign in пользователя
        userName: "ZZ", // зависит от sign in пользователя
        commentText: text,
        commentTime: new Date(),
        wallId: this.options.item.id,
      };

      this.options.item.comments.push(comment);
      return comment;
    }

    beforeUnmount() {
      delete this._send;
      delete this._text;
    }

    render({ item }) {
      console.log(this);
      return ` <div class="post-sender">
            <img class="post-sender__ava" src="${item.userUrlImage}" alt="Аватар">
            <textarea class="post-sender__textarea"></textarea>
            <img class="post-sender__add" src="img/post/plus.png" alt="Добавить" title="Добавить">
            <img class="post-sender__send" src="img/post/send.png" alt="Отправить" title="Отправить">
          </div>`;
    }
  }

  return PostSenderBlock;
});
