define([
  "Base/Component",
  "Gallery/ScrollPages",
  "Gallery/PhotoList",
], function (Component, ScrollPages, PhotoList) {
  class BigGallery extends Component {
    constructor(item) {
      super();
      // модель данных
      this.state.item = item.item;
      // Преобразуем массив
      this.state.item.gallery.reverse();
      // номер страницы
      this.state.item.pageNumder = 1;
      // кол-во фото на странице
      this.numberPhotosOnPage = 6;
      // самое большое количество страниц
      this.pageCount = Math.ceil(
        this.state.item.gallery.length / this.numberPhotosOnPage
      );
      this.state.item.object = item.object
    }

    afterMount() {
      // addeventlistenr на номера страниц
      const numberPage = this.getContainer().querySelectorAll(
        ".scrollPages_number"
      );
      numberPage.forEach((el) => {
        this.subscribeTo(el, "click", this.onClickNumberPage.bind(this));
      });

      // помеяает первую страницу
      numberPage[0].classList.add("scrollPages_numberIsSelected");

      this._photoList = this.getContainer().querySelector(".photoList");
      this._bigGalleryHeader = this.getContainer().querySelector(
        ".bigGallery-header"
      );
    }
    /**
     * Вешает таргет по клику
     */
    onClickNumberPage() {
      let element = event.currentTarget;
      // отмечаем страницы которые посетили
      element.classList.add("scrollPages_numberIsSelected");
      // берем номер странцы
      this.state.item.pageNumder = element.innerHTML;
      // обновляем фотографии при переходе
      this._photoList.innerHTML = "";

      const view = this.childrens.create(PhotoList, this.state.item);
      view.mount(this._photoList);
      // обновляем хедер и передаем номер текущей страницы
      this._bigGalleryHeader.innerHTML = this.renderBigGalleryHeader();
    }

    renderBigGalleryHeader() {
      return ` <p class="bigGallery-header__title">Фотографий: ${this.state.item.gallery.length}</p>
              <p class="bigGallery-header__title">Текущая страница: ${this.state.item.pageNumder}</p>`;
    }

    render() {
      return `
              <div class="bigGallery__block">
                <div class="bigGallery-header">
                  ${this.renderBigGalleryHeader()}
                </div>
                <div class="photoList">
                  ${this.childrens.create(PhotoList, this.state.item)} 
                </div>
              ${ScrollPages.renderScrollPages(
                "getBigGalery",
                this.state.item.pageNumder,
                this.pageCount,
                this.id
              )}
             
            </>`;
    }
  }
  return BigGallery;
});
