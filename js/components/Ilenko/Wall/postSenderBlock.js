define(["Base/Component", "components/Ilenko/Service/NetworkService"], function (
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
      NetworkService.postDataComment(comment);
      //чистим textarea
      this._text.value = '';
    }
    /**
     * Создает модель для пуша на сервер
     * @param {String} text -результат ввода текста с textarea
     */
    createComment(text) {
      let comment = {
        userUrlImage: this.options.item.user.userUrlImage, 
        userName: this.options.item.user.userName, 
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
      return ` <div class="post-sender">
            <img class="post-sender__ava" src="${item.user.userUrlImage}" alt="Аватар" title=${item.user.userName}>
            <textarea class="post-sender__textarea"></textarea>
            <img class="post-sender__add" src="img/post/plus.png" alt="Добавить" title="Добавить">
            <img class="post-sender__send" src="img/post/send.png" alt="Отправить" title="Отправить">
          </div>`;
    }
  }

  return PostSenderBlock;
});
