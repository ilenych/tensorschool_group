define(["Base/Component", "Wall/NetworkService"], function (
  Component,
  NetworkService, 
) {
  class PostLike extends Component {
    render({ item }) {
      return `<div class="post-likes">
            ${this.childrens.create(PostLikeSmiles, { item })}
        </div>`;
    }
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
      //возвращаем результат
      return (element.innerHTML = result);
    }

    beforeUnmount() {
      //TODO: удалить все элементы(вопрос как?)
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
      //TODO: заменить данные с гет запроса NetworkService.getData(this.options.item.id)
      let likeFire = this.options.item.likeFire;
      let likeHeartEyes = this.options.item.likeHeartEyes;
      let likeRocket = this.options.item.likeRocket;
      let likeLike = this.options.item.likeLike;
      let likeBomb = this.options.item.likeBomb;

      switch (alt) {
        case "fire":
          likeFire += 1;
          break;
        case "heartEyes":
          likeHeartEyes += 1;
          break;
        case "rocket":
          likeRocket += 1;
          break;
        case "like":
          likeLike += 1;
          break;
        case "bomb":
          likeBomb += 1;
          break;
        default:
          console.error("Что то пошло не так с лайками");
          break;
      }

      //закидываем в модель
      let likes = this.updateLikeModel(
        likeFire,
        likeHeartEyes,
        likeRocket,
        likeLike,
        likeBomb
      );
      // заменяем модель
      NetworkService.putData(this.options.item.id, likes);
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
            count: this.state.item.likeFire,
          },
          {
            img: {
              alt: "heartEyes",
              scr: "img/post/heartEyes.png",
            },
            count: this.state.item.likeHeartEyes,
          },
          {
            img: {
              alt: "rocket",
              scr: "img/post/rocket.png",
            },
            count: this.state.item.likeRocket,
          },
          {
            img: {
              alt: "like",
              scr: "img/post/like.png",
            },
            count: this.state.item.likeLike,
          },
          {
            img: {
              alt: "bomb",
              scr: "img/post/bomb.png",
            },
            count: this.state.item.likeBomb,
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
