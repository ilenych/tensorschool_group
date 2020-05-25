define([
  "Base/Component",
  "Gallery/BigGallery",
  "components/Ilenko/Common/View",
  "components/Ilenko/Common/DataSet",
  "Gallery/Window",
  "Gallery/GalleryModel",
  "PhotoInfo/AddPhoto",
  "css!PhotoInfo/css/PhotoInfo.css",
], function (
  Component,
  BigGallery,
  View,
  DataSet,
  Window,
  GalleryModel,
  AddPhoto
) {
  "use strict";

  class PhotoInfo extends Component {
    constructor(options) {
      super(options);
    }

    afterMount() {
      //AddEventListener на image
      const addPhoto = this.getContainer().querySelector(".addPhoto__img");
      this.subscribeTo(addPhoto, "click", this.createAddPhotoWindow.bind(this));

      //AddEventListener на заголоовок "фотографий"
      const photoTitle = this.getContainer().querySelector(".photoInfo__title");
      this.subscribeTo(photoTitle, "click", this.openBigGallery.bind(this));

      const deletePhoto = this.getContainer().querySelector(".deletePhoto__img");
      this.subscribeTo(deletePhoto, "click", this.createDeletePhotoWindow.bind(this));
    }

    createAddPhotoWindow() {
      this.createWindow("Добавить фото", AddPhoto);
    }

    openBigGallery() {
      this.createWindow("Фотогаллерея", BigGallery);
    }

    createDeletePhotoWindow() {
      this.createWindow("Фотогаллерея", BigGallery, "deletePhoto");
    }
    /**
     * Создает окно
     * @param {String} title - Название заголовка
     * @param {Class} comp - сам контент
     */
    createWindow(title, comp, object) {
      const window = this.childrens.create(Window, {
        title: title,
        content: this.childrens.create(View, {
          dataSet: this.childrens.create(DataSet, {
            object: "gallery",
            model: GalleryModel,
          }),
          comp: comp,
          id: this.options.id,
          object: object
        }),
      });
      window.mount(document.body);
    }

    render() {
      return `<div class="module photoInfo">
                        <div class="photoInfo__title">Фотографии</div>
                        <div class="photoInfo-buttons">
                          <div class="photoInfo-buttons-img"> 
                            <img class="addPhoto__img img-settings" src="img/plus.png" alt="Добавить фото" title="Добавить фото">
                          </div>
                          <div class="photoInfo-buttons-img">
                          <img class="deletePhoto__img img-settings" src="img/post/trash.png" alt="Удалить фото" title="Удалить фото">
                           </div>
                            
                        </div>
                    </div>`;
    }
  }
  return PhotoInfo;
});
