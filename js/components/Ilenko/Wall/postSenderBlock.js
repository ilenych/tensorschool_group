define([
  "Base/Component",
  "components/Ilenko/Service/NetworkService",
  "ProfileInfo/DataSet",
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
    constructor(options) {
      super(options);
      this.options = {
        ...{
          host: `https://tensor-school.herokuapp.com/user/photo/`,
          idUser: this.options.items.userId,
          wallId: this.options.items.id,
          userName: this.options.item,
        },
        ...options,
      };
      
    }
    afterMount() {
      const send = this.getContainer().querySelector(".post-sender__send");
      this.subscribeTo(send, "click", this.onClick.bind(this));
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
        userUrlImage: this.options.host + this.options.idUser,
        userName: this.options.userName,
        commentText: text,
        commentTime: new Date(),
        idUser: this.options.idUser,
        wallId: this.options.wallId,
      };

      this.options.items.comments.push(comment);
      return comment;
    }

    render() {
      return ` <div class="post-sender">
            <img class="post-sender__ava" src="${this.options.host + this.options.idUser}" alt="Аватар" title=${this.options.item}>
            <textarea class="post-sender__textarea"></textarea>
            <img class="post-sender__add" src="img/post/plus.png" alt="Добавить" title="Добавить">
            <img class="post-sender__send" src="img/post/send.png" alt="Отправить" title="Отправить">
          </div>`;
    }
  }

  return PostSenderBlockView;
});
