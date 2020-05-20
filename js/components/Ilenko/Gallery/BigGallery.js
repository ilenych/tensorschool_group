define(["Base/Component", "Gallery/ScrollPages"], function (
  Component,
  ScrollPages
) {
  class Gallery extends Component {
    constructor({ item }) {
      super();
      // модель данных
      this.state.item = item;
      // номер страницы
      this.pageNumder = 1;
      // кол-во фото на странице
      this.numberPhotosOnPage = 6;
      // самое большое количество страниц
      this.pageCount = Math.ceil(
        this.state.item.gallery.length / this.numberPhotosOnPage
      );
    }

    afterMount() {
      // addeventlistenr на номера страниц
      this._numberPage = document.querySelectorAll(".scrollPages_number");
      this._numberPage.forEach((el) => {
        this.subscribeTo(el, "click", this.onClicknNumberPage.bind(this));
      });
      // помеяает первую страницу
      this._numberPage[0].classList.add("scrollPages_numberIsSelected");

      this._bigGallery = document.querySelector(".bigGalery");
      this._bigGalleryHeader = document.querySelector(".bigGallery-header");
    }
    /**
     * Вешает таргет по клику
     */
    onClicknNumberPage() {
      let element = event.currentTarget;
      // отмечаем страницы которые посетили
      element.classList.add("scrollPages_numberIsSelected");
      // берем номер странцы
      this.pageNumder = element.innerHTML;
      // обновляем фотографии при переходе
      this._bigGallery.innerHTML = this.sortGalleruToPages()
        .map(this.renderGalleryImages)
        .join("\n");
      // обновляем хедер и передаем номер текущей страницы
      this._bigGalleryHeader.innerHTML = this.renderBigGalleryHeader();
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

    render() {
      return `
              <div class="bigGallery__block">
                <div class="bigGallery-header">
                  ${this.renderBigGalleryHeader()}
                </div>
                <div class="bigGalery">
                  ${this.sortGalleruToPages()
                    .map(this.renderGalleryImages)
                    .join("\n")}
                </div>
              ${ScrollPages.renderScrollPages(
                "getBigGalery",
                this.pageNumder,
                this.pageCount,
                this.id
              )}
            </div>`;
    }

    renderBigGalleryHeader() {
      return ` <p class="bigGallery-header__title">Фотографий: ${this.state.item.gallery.length}</p>
              <p class="bigGallery-header__title">Текущая страница: ${this.pageNumder}</p>`;
    }

    renderGalleryImages({ img }) {
      return `<img src=${img} class="bigGalery__photo">`;
    }
  }

  return Gallery;
});
