define([
  "Gallery/GalleryModel",
  "Base/Component",
  "Gallery/BigGallery",
  "Gallery/View",
  "Gallery/Window",
  "Gallery/DataSet",
  "css!Gallery/css/Gallery.css",
], function (GalleryModel, Component, BigGallery, View, Window, DataSet) {
  "use strict";

  class ProfileGaleryView extends Component {

    constructor(options) {
        super(options);
    }

    render(options) {
        console.log(options)
        //создаем View
        this.view = this.childrens.create(View, {
            dataSet: factory.create(DataSet, {
                model: GalleryModel // полученные данные с сервера пробзразуем в этот тип модели данных 
            }),
            comp: Gallery, // комнонент для монитрования и куда передадим модель данных
            id: options.id // id пользователя данные которого нужно загрузить
        });

        return `<div class="gallery">
                    ${this.view}
                </div>`;
    }
}

  class Gallery extends Component {
    constructor({ item }) {
      super();
      this.state.item = item;
  }
    afterMount() {
      this._photo = this.getContainer().querySelector(".photoGallery");
      this.subscribeTo(
        this._photo,
        "click",
        this.onClickPhotoGallery.bind(this)
      );
    }

    onClickPhotoGallery() {
      this.openBigGallery();
    }

    openBigGallery() {
      console.log(this)
      const window = this.childrens.create(Window, {
        title: "Фотогаллерея",
        content: this.childrens.create(View, {
          dataSet: this.childrens.create(DataSet, {
            model: GalleryModel
          }),
          comp: BigGallery,
          id: this.state.item.id,
        }),
      });
      window.mount(document.body);
    }

    render() {
      return `<div class="module">
                <div class="photoGallery">
                ${this.renderBody()}
              </div>
        
      </div>`;
    }

    renderBody() {
      let stringImage = "";

      if (this.state.item.gallery.length >= 4) {
        for (let i = 0; i < 4; i++) {
          stringImage +=`<img src=${this.state.item.gallery[i].img} alt="Фото"  class="photoGallery__photo">`;
        }
      } else if (this.state.item.gallery.length == 0) {
        stringImage += `<img src="img/nophoto.jpg" alt="Нет фотографий"  class="photoGallery__photo">`;
      } else {
        for (let i = 0; i < this.state.item.gallery.length; i++) {
          stringImage +=`<img src=${this.state.item.gallery[i].img} alt="Фото"  class="photoGallery__photo">`;
        }
      }
      return stringImage;
    }
  }
  return ProfileGaleryView;
});
