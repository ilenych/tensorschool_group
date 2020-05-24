define([
  "Base/Component",
  "Wall/postLike",
  "Wall/postComment",
  "Wall/postSenderBlock",
  "components/Ilenko/Common/TimeConvector",
  "components/Ilenko/Service/NetworkService",
  "components/Ilenko/Common/FullPhoto",
  "css!Wall/css/post.css",
], function (
  Component,
  PostLike,
  PostComment,
  PostSenderBlock,
  Time,
  NetworkService,
  FullPhoto
) {
  class Post extends Component {
    constructor(options) {
      super(options);
      this.options = {
        ...{
          host: `https://ksupipr.github.io/tensorschool_group/?page=`,
        },
        ...options,
      };
    }

    afterMount() {
      this._delete = this.getContainer().querySelector(".post-header__delete");
      this.subscribeTo(this._delete, "click", this.onClose.bind(this));
      //AddEventListener на image
      const image = this.getContainer().querySelector(".post-header__ava");
      this.subscribeTo(image, "error", this.onErrorLoadImage.bind(this, image));

      if (this.options.item.postUrlImage != "") {
       this.contentImage = this.getContainer().querySelector(".post-content__img");
       this.subscribeTo(this.contentImage, "click", this.onClickImage.bind(this));
      }
    }

    onErrorLoadImage(image) {
      image.src = "img/nophoto.jpg";
    }

    onClose() {
      //удаляет модель с сервера по id
      NetworkService.getDataComments(this.options.item.id).then((res) => {
        this.deletePost(res);
      });
      this.close();
    }

    onClickImage(contentImage) {
      const view = this.childrens.create(FullPhoto, {
        content: this.renderPhoto(this.options.item.postUrlImage),
        target: this.contentImage
      });
      view.mount(document.body);
    }
    /**
     * Удаляет пост с комментариемя с сервера
     * @param {Object} comments - модель комментариев
     */
    deletePost(comments) {
      NetworkService.deleteDataPost(this.options.item.id);
      NetworkService.deleteDataLikes(this.options.item.id);
      for (let i in comments) {
        NetworkService.deleteDataComment(comments[i].id);
      }
    }

    close() {
      this.getContainer().classList.add("post-deleted");
      setTimeout(
        function () {
          this.unmount();
        }.bind(this),
        990
      );
    }

    beforeUnmount() {
      delete this._delete;
    }

    // Рендер заголовок посат(avatar, name, time and trash)
    renderUser({ item }) {
      return `<div class="post-header">
                <a class="post-header__link"href=\"${
                  this.options.host + item.idUser
                }\">
                  <img class="post-header__ava" src="${
                    item.userUrlImage
                  }" alt="${item.userName}" title="${item.userName}">
                </a>
                <p class="post-header__name" title="${item.userName}">${
        item.userName
      }</p>
                <p class="post-header__time text_lightgray" title="Время">${Time.convert(
                  item.time
                )}</p>
                <img class="post-header__delete" src="img/post/trash.png" alt="delete">
              </div>`;
    }

    // Рендер содержимого поста
    renderContent({ item }) {
      return `<div class="post-content">
                <span class="post-content__text">${item.postText}</span>
                ${this.renderImageInContent({ item })}
              </div>`;
    }
    /**
     * Рендер для отображение полной фотографии
     * @param {String} src - путь картинки
     * @param {String} alt - описание картинки
     */
    renderPhoto(src) {
      return `<img class="fullPhoto" src="${src}" alt="Картинка с поста">`;
    }
    //Рендер картнинки, если есть ссылка на нее)
    renderImageInContent({ item }) {
      if (item.postUrlImage != "") {
        return `<img class="post-content__img" src="${item.postUrlImage}" alt="Картинка">`;
      } else {
        return "";
      }
    }

    render({ item }) {
      return `<div class="module post">
                  ${this.renderUser({ item })}
                  ${this.renderContent({ item })} 
                  ${this.childrens.create(PostLike, { item })}
                  ${this.childrens.create(PostComment, { item })}
                  ${this.childrens.create(PostSenderBlock, { item })} 
              </div>`;
    }
  }
  return Post;
});
