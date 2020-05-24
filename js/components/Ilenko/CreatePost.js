define([
  "Base/Component",
  "ProfileInfo/DataSet",
  "ProfileInfo/View",
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
      this.options = {
        ...{
          host: `https://tensor-school.herokuapp.com/user/photo/`,
          id: options.parent.options.id,
          fullName: options.item.first_name + " " + options.item.last_name,
        },
        ...options,
      };
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
      const publish = this.getContainer().querySelector(
        ".createPost-buttons__publish"
      );
      this.subscribeTo(publish, "click", this.onClickButtonPublish.bind(this));

      //AddEventListener на image
      const image = this.getContainer().querySelector(
        ".createPost-content__ava"
      );
      this.subscribeTo(image, "error", this.onErrorLoadImage.bind(this, image));

      //AddEventListener на delete
      const deleteLink = this.getContainer().querySelector(
        ".createPost-picture__delete"
      );
      this.subscribeTo(deleteLink, "click", this.onClikcDelete.bind(this));

      this._link = this.getContainer().querySelector(
        ".createPost-picture__link"
      );
      this._wallId = document.querySelector(".wallBasis");

      this._picture = this.getContainer().querySelector(".createPost-picture");
    }

    onErrorLoadImage(image) {
      image.src = "img/nophoto.jpg";
    }

    onClickButtonAddPicture() {
      this.changeTitleOnButtonAddPicture();
      this.showOrHideLinkForPicture();
    }

    onClikcDelete() {
      this._link.innerHTML = "";
    }

    onClickButtonPublish() {
      this._content = this.getContainer().querySelector(
        ".createPost-content__post"
      );
      this.checkContentToEmpty(this._content.innerHTML);
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
      if (this._picture.classList.contains("createPost-picture-showen")) {
        this._picture.classList.remove("createPost-picture-showen");
        this._picture.classList.add("createPost-picture-hidden");
        //Чистим textarea
        this._link.innerHTML = "";
      } else {
        this._picture.classList.remove("createPost-picture");
        this._picture.classList.remove("createPost-picture-hidden");
        this._picture.classList.add("createPost-picture-showen");
      }
    }
    /**
     * Создает модель и пушит на сервер
     */
    createPost() {
      //Создаем модель
      let post = new CreatePostModel({
        userName: this.options.fullName,
        userUrlImage: this.options.host + this.options.id,
        time: new Date(),
        postText: this._content.innerHTML,
        postUrlImage: this._link.innerHTML,
        idUser: this.options.id,
        userId: this._wallId.id,
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
                    <img class="createPost-content__ava" src="${
                      this.options.host + this.options.id
                    }" alt=${this.options.fullName} title=${
        this.options.fullName
      }>
                     <div contenteditable="true" class="createPost-content__post" placeholder="Чем хотите поделиться?"></div>
                </div>
                <div class="createPost-picture">
                    <img class="createPost-picture__img" src="img/post/link.png" alt="ССылка" title="ССылка">
                    <div contenteditable="true" class="createPost-picture__link" placeholder="ССылка"></div>
                    <p class="createPost-picture__delete">×</p>
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
