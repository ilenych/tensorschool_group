define([
  "Base/Component",
  "Wall/PostLike",
  "Wall/PostComment",
  "Wall/PostSenderBlock",
  "Wall/TimeConvector",
  "Wall/NetworkService",
  "css!Wall/css/post.css",
], function (
  Component,
  PostLike,
  PostComment,
  PostSenderBlock,
  Time,
  NetworkService
) {
  class Post extends Component {
    afterMount() {
      this._delete = this.getContainer().querySelector(".post-header__delete");
      this.subscribeTo(this._delete, "click", this.onClose.bind(this));
    }

    onClose() {
      //удаляет модель с сервера по id
      NetworkService.getDataComments(this.options.item.id).then((res) => {
        this.deletePost(res);
      });
      this.close();
    }

    deletePost(comments) {
      NetworkService.deleteData(this.options.item.id)
      for (let i in comments) {
        NetworkService.deleteDataComment(comments[i].id);
      }
    }

    close() {
      this.unmount();
    }
    beforeUnmount() {
      delete this._delete;
    }

    // render header(avatar, name, time and trash)
    renderUser({ item }) {
      return `<div class="post-header">
                  <img class="post-header__ava" src="${
                    item.userUrlImage
                  }" alt="Аватар">
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
    //Рендер картнинки, если есть ссылка на нее)
    renderImageInContent({ item }) {
      if (item.postUrlImage != "") {
        return `<img class="post-content__img" src="${item.postUrlImage}" alt="Картинка">`;
      } else {
        return "";
      }
    }

    render({ item }) {
      return `<div class="post">
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
