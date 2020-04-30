define(["Base/Component", "Wall/NetworkService"], function (
  Component,
  NetworkService, 
) {
  class PostLike extends Component {
    afterMount() {
      this._like = this.getContainer().querySelectorAll(
        ".post-like-smiles__text"
      );
      this._like.forEach((el) => {
        this.subscribeTo(el, "click", this.onClick.bind(this));
      });
    }
    /**
     * Вешает таргет по клику
     */
    onClick() {
      let element = event.currentTarget;
      //Добавляем font-size and green color
      element.classList.add("likeIsSelected");
      //Прибавляем значение к текущему элементу
      this.plusOneLike(element);
    }
    /**
     * функция по добавлению одного лайка
     * @param {even.currentTarget} element - event.currentTarget
     */
    plusOneLike(element) {
      // берем текущее значение, пока не работает GET запрос
      let count = element.innerHTML;
      // прибавляем один лайк
      let result = Number(count) + 1;
      // обновляем данные
      this.updateLike(element.previousElementSibling.alt);
      // Чистим кэш
      this.beforeUnmount()
      //возвращаем результат
      return (element.innerHTML = result);
    }

    beforeUnmount() {
      delete this._like;
    }

    /**
     * создает модель на сервере
     * @param {Number} result - обновленное количество лайков
     */
    updateLikeModel(likeFire, likeHeartEyes, likeRocket, likeLike, likeBomb) {
      let likes = {
        modelId: this.options.item.id,
        likeFire: likeFire,
        likeHeartEyes: likeHeartEyes,
        likeRocket: likeRocket,
        likeLike: likeLike,
        likeBomb: likeBomb,
      };
      return likes;
    }

    updateLike(alt) {
      //Прибавляем один лайк 
      switch (alt) {
        case "fire":
          this.options.item.likes.likeFire += 1;
          break;
        case "heartEyes":
          this.options.item.likes.likeHeartEyes += 1;
          break;
        case "rocket":
          this.options.item.likes.likeRocket += 1;
          break;
        case "like":
          this.options.item.likes.likeLike += 1;
          break;
        case "bomb":
          this.options.item.likes.likeBomb += 1;
          break;
        default:
          console.error("Что то пошло не так с лайками");
          break;
      }

      //закидываем в модель
      let likes = this.updateLikeModel(
        this.options.item.likes.likeFire,
        this.options.item.likes.likeHeartEyes,
        this.options.item.likes.likeRocket,
        this.options.item.likes.likeLike,
        this.options.item.likes.likeBomb
      );
      // заменяем модель
      NetworkService.putData(this.options.item.id, likes);
    }

    render({ item }) {
      return `<div class="post-likes">
            ${this.childrens.create(PostLikeSmiles, { item })}
        </div>`;
    }
  }

  class PostLikeSmiles extends Component {
    constructor({ item }) {
      super();
      this.state.item = item;
    }

    beforeMount() {
      this.setState({
        likeIcons: [
          {
            img: {
              alt: "fire",
              scr: "img/post/fire.png",
            },
            count: this.state.item.likes.likeFire,
          },
          {
            img: {
              alt: "heartEyes",
              scr: "img/post/heartEyes.png",
            },
            count: this.state.item.likes.likeHeartEyes,
          },
          {
            img: {
              alt: "rocket",
              scr: "img/post/rocket.png",
            },
            count: this.state.item.likes.likeRocket,
          },
          {
            img: {
              alt: "like",
              scr: "img/post/like.png",
            },
            count: this.state.item.likes.likeLike,
          },
          {
            img: {
              alt: "bomb",
              scr: "img/post/bomb.png",
            },
            count: this.state.item.likes.likeBomb,
          },
        ],
        commentIcon: {
          img: {
            alt: "comment",
            scr: "img/post/comment.png",
          },
          count: this.state.item.comments.length,
        },
      });
    }

    render(options, { likeIcons, commentIcon }) {
      return `${likeIcons.map(this.renderLikesBlock).join("\n")}
              ${this.renderCommentBlock(commentIcon)}`;
    }

    renderLikesBlock({ img, count }) {
      return `<div class="post-like-smiles">
                <img class="post-like-smiles__img" src=${img.scr} alt=${img.alt}>
                <span class="post-like-smiles__text" >${count}</span>
            </div>`;
    }
    renderCommentBlock({ img, count }) {
      return `<div class="post-like-comment">
                <span class="post-like-comment__text" >${count}</span>
                <img class="post-like-smiles__img" src=${img.scr} alt=${img.alt}>
            </div>`;
    }
  }

  return PostLike;
});
