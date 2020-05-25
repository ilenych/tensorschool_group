define([
  "Base/Component",
  "components/Ilenko/Service/NetworkService",
], function (Component, NetworkService) {
  class AddPhoto extends Component {
    constructor(options) {
      super(options);
      this.options = {
        ...{
          gallery: options.item.gallery,
          id: options.idUser
        },
        ...options,
      };
    }

    afterMount() {
      //AddEventListener на addButton
      this.subscribeTo(
        this.getContainer().querySelector(".createPost-buttons__publish"),
        "click",
        this.onClickAddButton.bind(this)
      );

      //AddEventListener на delete
      const deleteLink = this.getContainer().querySelector(
        ".createPost-picture__delete"
      );
      this.subscribeTo(deleteLink, "click", this.onClikcDelete.bind(this));

      this._link = this.getContainer().querySelector(
        ".createPost-picture__link"
      );
    }

    onClickAddButton() {
      this.checkContentToEmpty(this._link.innerHTML);
    }

    onClikcDelete() {
      this.clearStirng();
    }
    /**
     * Очищает строку
     */
    clearStirng() {
      this._link.innerHTML = "";
    }
    /**
     * Проверяет строку на по=устоту
     * @param {String} content
     */
    checkContentToEmpty(content) {
      if (content == "") {
        return;
      } else {
        this.addPhoto();
      }
    }
    /**
     * Добавляет фото на сервер
     */
    addPhoto() {
      const model = this.createModel();
      this.options.item.id == undefined ? NetworkService.postDataGallery(model) : NetworkService.putDataGallery(this.options.id, model);
      console.log(this.options.item.i)
      this.clearStirng();
    }
    /**
     * Создает модель для сервера
     */
    createModel() {
      const id = this.options.gallery.length + 1;
      const modelGallery = {
        id: id,
        img: this._link.innerHTML,
      };

      this.options.gallery.push(modelGallery);

      const model = {
        id: this.options.id,
        gallery: this.options.gallery,
      };

      return model;
    }

    render(options, state) {
      return `<div class="AddPhotoContainer">
                <img class="createPost-picture__img" src="img/post/link.png" alt="ССылка" title="ССылка">
                <div contenteditable="true" class="createPost-picture__link" placeholder="ССылка"></div>
                <p class="createPost-picture__delete">×</p>
                <span class="createPost-buttons__publish button-settings">Добавить</span>
            </div>`;
    }
  }

  return AddPhoto;
});
