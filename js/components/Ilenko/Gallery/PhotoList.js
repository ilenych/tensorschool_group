define([
    "Base/Component",
    "components/Ilenko/Common/FullPhoto",
  ], function (Component, FullPhoto) {

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
      });
    }
    /**
     * Отображает фото в полном формате
     */
    onClickPhoto() {
      const image = event.currentTarget;
      const view = this.childrens.create(FullPhoto, {
        content: this.renderPhoto(image.src, image.alt),
        target: image
      });
      view.mount(document.body);
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
      return `<img src=${img} class="bigGalery__photo" alt="Фото ${id}">`;
    }

    render() {
      return `<div class="bigGalery">${this.sortGalleruToPages()
        .map(this.renderGalleryImages)
        .join("\n")}</div>`;
    }
  }

  return PhotoList;
});