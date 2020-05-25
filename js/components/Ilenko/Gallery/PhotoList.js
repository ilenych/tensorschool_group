define([
  "Base/Component",
  "components/Ilenko/Common/FullPhoto",
  "components/Ilenko/Service/NetworkService",
], function (Component, FullPhoto, NetworkService) {
  class PhotoList extends Component {
    constructor(item) {
      super();
      // модель данных
      this.state.item = item;
      // номер страницы
      this.pageNumder = item.pageNumder;
      // кол-во фото на странице
      this.numberPhotosOnPage = 6;
      // самое большое количество страниц
      this.pageCount = Math.ceil(item.gallery.length / this.numberPhotosOnPage);
    }

    afterMount() {
      const photo = this.getContainer().querySelectorAll(".bigGalery__photo");
      photo.forEach((el) => {
        this.subscribeTo(el, "click", this.onClickPhoto.bind(this));
        if (this.state.item.object == "deletePhoto") {
          el.style.cursor = "not-allowed";
        }
      });
    }
    /**
     * Отображает фото в полном формате
     */
    onClickPhoto() {
      const image = event.currentTarget;

      if (this.state.item.object == "deletePhoto") {
        //удаляем выбранную фото из массива
        this.deleteImage(image.alt);
        //создаем модель
        const model = this.createModel();
        // отправляем на сервер
        NetworkService.putDataGallery(this.state.item.id, model);
        //уведомляем
        alert(`Вы только что удалили фотографию ${image.alt}`);
      } else {
        const view = this.childrens.create(FullPhoto, {
          content: this.renderPhoto(image.src, image.alt),
          target: image,
        });
        view.mount(document.body);
      }
    }
    /**
     * Удаляет выбранную фото из массива
     * @param {Number} id - id фото
     */
    deleteImage(id) {
      for (let i in this.state.item.gallery) {
        if (this.state.item.gallery[i].id == id) {
          this.state.item.gallery.splice(i, 1);
        }
      }
    }
    /**
     * Создает модель для отправки на сервер
     */
    createModel() {
      const model = {
        id: this.options.id,
        gallery: this.state.item.gallery.reverse(),
      };

      return model;
    }

    /**
     * Отсортировка нужный фотографий из массива данных
     */
    sortGalleruToPages() {
      let galleryArray = [];
      let start = this.numberPhotosOnPage * (this.pageNumder - 1);
      let end = this.numberPhotosOnPage * this.pageNumder;
      if (this.pageNumder != this.pageCount) {
        galleryArray = this.state.item.gallery.slice(start, end);
      } else {
        galleryArray = this.state.item.gallery.slice(
          start,
          this.state.item.gallery.length
        );
      }
      return galleryArray;
    }
    /**
     * Рендер для отображение полной фотографии
     * @param {String} src - путь картинки
     * @param {String} alt - описание картинки
     */
    renderPhoto(src, alt) {
      return `<img class="fullPhoto" src="${src}" alt="${alt}">`;
    }
    /**
     * Рендер для отображение фотографий
     * @param {*} param img- путь картиники id - номер фотографии
     */
    renderGalleryImages({ img, id }) {
      return `<img src=${img} class="bigGalery__photo" alt="${id}" title="Фото ${id}">`;
    }
    // renderGalleryImages({ img, id }) {
    //   return `
    //   <div class="bigGalery-container"><p class="bigGalery__delete">x</p>
    //   <img src=${img} class="bigGalery__photo" alt="Фото ${id}">
    //   </div>`;
    // }

    render() {
      return `<div class="bigGalery">${this.sortGalleruToPages()
        .map(this.renderGalleryImages)
        .join("\n")}</div>`;
    }
  }

  return PhotoList;
});
