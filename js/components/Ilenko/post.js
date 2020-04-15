define([
  "Base/Component",
  "Post/model",
  "Post/postLike",
  "Post/postComment",
  "css!Post/css/post.css",
], function (Component, model, PostLike, PostComment) {
  "use strict";

  class Post extends Component {
    constructor({ item }) {
      super();
      this.state.item = item;
    }

    beforeMount() {
      if (this.state.item === undefined) {
        //Стандартная модель если не передали ничего в конструктор
        this.state.item = new model({
          userName: "Джилл Валентайн",
          userUrlImage: "img/post/ava.png",
          time: {
            year: 2020,
            month: 3,
            day: 14,
            hour: 14,
            minute: 39,
          },
          time2: {
            year: 2020,
            month: 3,
            day: 15,
            hour: 14,
            minute: 39,
          },
          postText:
            "Сыграем в RE3 remake? 3 апреля 2020 года Capcom выпустила Resident Evil 3 Remake — обновленную версию популярной игры Resident Evil 3: Nemesis 1999 года.",
          postUrlImage: "img/post/postImage.jpg",
          likeFire: "132",
          likeHeartEyes: "24",
          likeRocket: "26",
          likeLike: "68",
          likeBomb: "87",
          commentLenght: "2",
          newUserUrlImage: "img/post/newUser.png",
          newUserName: "Леон Скотт Кеннеди",
          comments: [
            {
              userUrlImage: "img/post/newUser.png",
              userName: "Леон Скотт Кеннеди",
              commentText: "Нашу встречу вырезалии с тобой (",
              commentTime: {
                year: 2020,
                month: 3,
                day: 15,
                hour: 14,
                minute: 39,
              },
            },
            {
              userUrlImage: "img/post/ava.png",
              userName: "Фэйк Джилл",
              commentText: "Так может быть ты...",
              commentTime: {
                year: 2020,
                month: 3,
                day: 15,
                hour: 14,
                minute: 39,
              },
            },
          ],
        });
      }
    }

    afterMount() {
      this._delete = this.getContainer().querySelector(".post_header__delete");
      this.subscribeTo(this._delete, "click", this.onClose.bind(this));
    }

    onClose() {
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
      return ` <div class="post_header">
          <img class="post_header__ava" src="${item.userUrlImage}" alt="Аватар">
          <p class="post_header__name" title="${item.userName}">${item.userName}</p>
          <p class="post_header__time text_lightgray" title="Время">${item.renderTime}</p>
          <img class="post_header__delete" src="img/post/trash.png" alt="delete">
        </div>`;
    }

    // render content( text + image)
    renderContent({ item }) {
      return ` <div class="post_content">
          <span class="post_content__text">${item.postText}</span>
            <img class="post_content__img" src="${item.postUrlImage}" alt="Картинка">
        </div>`;
    }

    // render sender block(avatar, textarea, create, send)
    renderSenderBlock({ item }) {
      return ` <div class="post_sender">
          <img class="post_sender__ava" src="${item.userUrlImage}" alt="Аватар">
          <textarea class="post_sender__textarea"></textarea>
          <img class="post_sender__add" src="img/post/plus.png" alt="Добавить" title="Добавить">
          <img class="post_sender__send" src="img/post/send.png" alt="Отправить" title="Отправить">
        </div>`;
    }

    // common render
    render(options, { item }) {
      return `<div class="post">
                  ${this.renderUser({ item })}
                  ${this.renderContent({ item })}
                  ${this.childrens.create(PostLike, { item })}
                  ${this.childrens.create(PostComment, { item })}
                  ${this.renderSenderBlock({ item })}
              </div>`;
    }
  }
  return Post;
});
