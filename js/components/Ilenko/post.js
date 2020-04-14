define([
  "components/Ilenko/component",
  "components/Ilenko/model",
  "components/Ilenko/composite",
  "components/Ilenko/postLike",
], function (basic) {
  "use strict";
  loadCss("js/components/Ilenko/css/post.css");

  class Post extends Component {
    constructor({ item }) {
      super();
      this.state.item = item;
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
    // render comment(svatar, name, comment, time)
    renderComment({ item }) {
      return `<div class="post_comments">
            <img class="post_comments__ava" src="${item.newUserUrlImage}" alt="Аватар">
            <p class="post_comments__name" title="${item.newUserName}">${item.newUserName}</p>
            <span class="post_comments__text" title="Comment">${item.commentText}</span>
            <p class="post_comments__time text_lightgray" title="Время">${item.commentTime}</p>
          </div>`;
    }
    // render sender block(avatar, textarea, create, send)
    renderSenderBlock({ item }) {
      return ` <div class="post_sender">
          <img class="post_sender__ava" src="${item.userUrlImage}" alt="Аватар">
          <textarea class="post_sender__textarea"></textarea>
          <img class="post_sender__add" src="img/post/plus.png" alt="add">
          <img class="post_sender__send" src="img/post/send.png" alt="send">
        </div>`;
    }
    // common render
    render(options, { item }) {
      return `<div class="post">
                  ${this.renderUser({ item })}
                  ${this.renderContent({ item })}
                  ${this.childrens.create(PostLike, { item })}
                  ${this.renderComment({ item })}
                  ${this.renderSenderBlock({ item })}
              </div>`;
    }
  }
  
  // AbstractFactory
  class AbstractFactory {
    create(component, options) {
      return new component(options || {});
    }
  }

  const factory = new AbstractFactory();

  const post = factory.create(Post, { item: model });
  post.mount(document.body);
});
