define([
  "Base/Component",
  "components/Alsynbaev/profileInfo/DataSet",
  "components/Alsynbaev/profileInfo/View",
  "components/Ilenko/Service/NetworkService",
  "CreatePost/CreatePostModel",
  "css!CreatePost/css/CreatePost.css",
], function (Component, DataSet, View, NetworkService, CreatePostModel) {
  "use strict";

  class CreatePostView extends Component {
    constructor(options) {
      super(options);
    }

    render(options) {
      //создаем View
      this.view = this.childrens.create(View, {
        dataSet: factory.create(DataSet, {
          model: CreatePostModel, // полученные данные с сервера пробзразуем в этот тип модели данных
        }),
        comp: CreatePost, // комнонент для монитрования и куда передадим модель данных
        id: options.id, // id пользователя данные которого нужно загрузить
      });

      return `<div class="module">
                  ${this.view}
              </div>`;
    }
  }

  class CreatePost extends Component {
    constructor(options) {
      super(options);
      this.state.id = options.parent.options.id;
      this.state.item = options.item;
    }

    beforeMount() {
      this.setState({
        fullName: this.state.item.first_name + " " + this.state.item.last_name,
      });
    }
    afterMount() {
      //AddEventListener на кнопку "добавить картинку"
      this._addPicture = this.getContainer().querySelector(
        ".createPost-buttons__add"
      );
      this.subscribeTo(
        this._addPicture,
        "click",
        this.onClickButtonAddPicture.bind(this)
      );
      //AddEventListener на кнопку "опубликовать"
      this._publish = this.getContainer().querySelector(
        ".createPost-buttons__publish"
      );
      this.subscribeTo(
        this._publish,
        "click",
        this.onClickButtonPublish.bind(this)
      );

      //AddEventListener на image
      const image = this.getContainer().querySelector(
        ".createPost-content__ava"
      );
      this.subscribeTo(image, "error", this.onErrorLoadImage.bind(this, image));

      this._link = this.getContainer().querySelector(
        ".createPost-picture__link"
      );
      this._wallId = document.querySelector(".wallBasis")
    }

    onErrorLoadImage(image) {
      image.src = "img/nophoto.jpg";
    }

    onClickButtonAddPicture() {
      this._picture = this.getContainer().querySelector(".createPost-picture");
      this.changeTitleOnButtonAddPicture();
      this.showOrHideLinkForPicture();
    }

    onClickButtonPublish() {
      this._content = this.getContainer().querySelector(
        ".createPost-content__post"
      );
      this.checkContentToEmpty(this._content);
    }
    /**
     * Проверка пустого контента
     * @param {String} content - this.getContainer().querySelector(".createPost-content__post").innerHTML;
     */
    checkContentToEmpty(content) {
      if (content == "") {
        return;
      } else {
        this.createPost();
      }
    }
    /**
     * Меняет название кнопки при нажатии
     */
    changeTitleOnButtonAddPicture() {
      if (this._addPicture.innerHTML == "Добавить картинку") {
        this._addPicture.innerHTML = "Убрать картинку";
      } else {
        this._addPicture.innerHTML = "Добавить картинку";
      }
    }
    /**
     * Скрывает илии отображает блок с ссылкой для картинки
     */
    showOrHideLinkForPicture() {
      if (this._picture.style.display == "") {
        this._picture.style.display = "flex";
      } else {
        this._picture.style.display = "";
        //Чистим textarea
        this._link.innerHTML = "";
      }
    }
    /**
     * Создает модель и пушит на сервер
     */
    createPost() {
      //Создаем модель
      let post =  new CreatePostModel ({
        userName: this.state.fullName,
        userUrlImage: `https://tensor-school.herokuapp.com/user/photo/${this.state.id}`,
        time: new Date(),
        postText: this._content.innerHTML,
        postUrlImage: this._link.innerHTML,
        userId: this._wallId.id
      });
      //Пушим на сервер
      NetworkService.postData(post);
      //Чистим textarea
      this._content.innerHTML = "";
      this._link.innerHTML = "";
      return post;
    }
    //Рендер createPost
    render() {
      return `<div class="createPost">
                <div class="createPost-content">
                    <img class="createPost-content__ava" src="https://tensor-school.herokuapp.com/user/photo/${this.state.id}" alt=${this.state.fullName} title=${this.state.fullName}>
                     <div contenteditable="true" class="createPost-content__post" placeholder="Чем хотите поделиться?"></div>
                </div>
                <div class="createPost-picture">
                    <img class="createPost-picture__img" src="img/post/link.png" alt="ССылка" title="ССылка">
                    <div contenteditable="true" class="createPost-picture__link" placeholder="ССылка"></div>
                </div>
            </>
            <div class="createPost-buttons">
                <span class="createPost-buttons__add button-settings">Добавить картинку</span>
                <span class="createPost-buttons__publish button-settings">Опубликовать</span>
            </div>`;
    }
  }

  return CreatePostView;
});
