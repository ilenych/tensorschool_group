define([
  "Base/Component",
  "Wall/NetworkService",
  "css!CreatePost/css/CreatePost.css",
], function (Component, NetworkService) {
  "use strict";

  class FetcherManagerCreatePost extends Component {
    constructor({ item }) {
      super();
      this.state.item = item;
      this.options.view;
    }
    beforeMount() {
      NetworkService.getDataUser().then((res) => {
        this.state.item = res;
        this.update();
      });
    }

    beforeUpdate() {
      this.getContainer().innerHTML = "";

      this.options.view = this.childrens.create(CreatePost, this.state);
      this.options.view.mount(this.getContainer());
    }

    render() {
      return `<div class="module">
                ${this.options.view}
              </div>`;
    }
  }

  class CreatePost extends Component {
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

      this._link = this.getContainer().querySelector(
        ".createPost-picture__link"
      );
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
        console.log(this)
      let post = {
        userName: this.options.item.userName,
        userUrlImage: this.options.item.userUrlImage,
        time: new Date(),
        postText: this._content.innerHTML,
        postUrlImage: this._link.innerHTML,
      };
      //Пушим на сервер
      NetworkService.postData(post);
      //Чистим textarea
      this._content.innerHTML = "";
      this._link.innerHTML = "";
      return post;
    }
    //Рендер createPost
    render(options, { item }) {
      return `<div class="createPost">
                <div class="createPost-content">
                    <img class="createPost-content__ava" src=${this.options.item.userUrlImage} alt="Аватарка" title=${this.options.item.userName}>
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

  return FetcherManagerCreatePost;
});
