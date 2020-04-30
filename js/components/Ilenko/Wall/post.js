  define([
    "Base/Component",
    "Wall/PostLike",
    "Wall/PostComment",
    "Wall/PostSenderBlock",
    "Wall/TimeConvector",
    "Wall/NetworkService",
    "css!Wall/css/post.css",
  ], function (Component, PostLike, PostComment, PostSenderBlock, Time, NetworkService) {
  
  class Post extends Component {

    afterMount() {
      this._delete = this.getContainer().querySelector(".post-header__delete");
      this.subscribeTo(this._delete, "click", this.onClose.bind(this));
    }

    onClose() {
      //удаляет модель с сервера по id
      NetworkService.deleteData(this.options.item.id)
      this.close();
    }

    close() {
      this.unmount();
    }
    beforeUnmount() {
      delete this._delete;
    }

    // render header(avatar, name, time and trash)
    renderUser({ item }) {
      return ` <div class="post-header">
          <img class="post-header__ava" src="${item.userUrlImage}" alt="Аватар">
          <p class="post-header__name" title="${item.userName}">${item.userName}</p>
          <p class="post-header__time text_lightgray" title="Время">${Time.convert(item.time)}</p>
          <img class="post-header__delete" src="img/post/trash.png" alt="delete">
        </div>`;
    }

    // render content( text + image)
    renderContent({ item }) {
      return ` <div class="post-content">
          <span class="post-content__text">${item.postText}</span>
            <img class="post-content__img" src="${item.postUrlImage}" alt="Картинка">
        </div>`;
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
