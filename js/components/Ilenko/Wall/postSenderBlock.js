define([
  "Base/Component",
  "components/Ilenko/Service/NetworkService",
  "components/Alsynbaev/ProfileInfo/DataSet",
  "components/Ilenko/Common/View",
  "CreatePost/CreatePostModel",
], function (Component, NetworkService, DataSet, View, CreatePostModel) {

  class PostSenderBlockView extends Component {
    constructor(options) {
      super(options);
    }

    render(options) {
      //создаем View
      this.view = this.childrens.create(View, {
        dataSet: factory.create(DataSet, {
          model: CreatePostModel, // полученные данные с сервера пробзразуем в этот тип модели данных
        }),
        comp: PostSenderBlock, // комнонент для монитрования и куда передадим модель данных
        id: options.item.userId, // id пользователя данные которого нужно загрузить
        items: options.item
      });

      return `<div class="sender-block">
                    ${this.view}
                </div>`;
    }
  }

  class PostSenderBlock extends Component {
    afterMount() {
      this._send = this.getContainer().querySelector(".post-sender__send");
      this.subscribeTo(this._send, "click", this.onClick.bind(this));
      //AddEventListener на image
      const image = this.getContainer().querySelector(".post-sender__ava");
      this.subscribeTo(image, "error", this.onErrorLoadImage.bind(this, image));
    }

    onErrorLoadImage(image) {
      image.src = "img/nophoto.jpg";
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
      this._text.value = "";
    }
    /**
     * Создает модель для пуша на сервер
     * @param {String} text -результат ввода текста с textarea
     */
    createComment(text) {
      let comment = {
        userUrlImage: `https://tensor-school.herokuapp.com/user/photo/${this.options.items.userId}`,
        userName: this.options.item,
        commentText: text,
        commentTime: new Date(),
        wallId: this.options.items.id,
      };

      this.options.items.comments.push(comment);
      return comment;
    }

    beforeUnmount() {
      delete this._send;
      delete this._text;
    }

    render() {
      return ` <div class="post-sender">
            <img class="post-sender__ava" src="https://tensor-school.herokuapp.com/user/photo/${this.options.items.userId}" alt="Аватар" title=${this.options.item}>
            <textarea class="post-sender__textarea"></textarea>
            <img class="post-sender__add" src="img/post/plus.png" alt="Добавить" title="Добавить">
            <img class="post-sender__send" src="img/post/send.png" alt="Отправить" title="Отправить">
          </div>`;
    }
  }

  return PostSenderBlockView;
});
