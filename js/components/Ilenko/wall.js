define(["Base/Component", "Wall/post", "Wall/NetworkService"], function (
  Component,
  Post,
  NetworkService
) {
  "use strict";

  class FetcherManager extends Component {
    constructor({ item }) {
      super();
      this.state.item = item;
      this.options.view;
    }

    beforeMount() {
      NetworkService.fetchData().then((res) => {
        this.sortArray(res);
      });
    }

    afterMount() {
      //AddEventListener на кнопку "опубликовать"
      setTimeout(
        function () {
          this._publish = document.querySelector(
            ".createPost-buttons__publish"
          );
          this.subscribeTo(
            this._publish,
            "click",
            this.onClickButtonPublish.bind(this)
          );
        }.bind(this),
        5000
      );
    }

    onClickButtonPublish() {
      setTimeout(
        function () {
          NetworkService.fetchData().then((res) => {
            this.sortArray(res);
          });
        }.bind(this),
        2000
      );
    }

    /**
     * Сортирует массив комментариев по постам
     * @param {json} content - база данных в json формате
     */
    sortArray(content) {
      let arr = [];
      let id = [];
      //Проверка массива на пустоту
      if (content.comments.length == 0) {
        content.comments = [{}];
      }
      //Берем id элементов wall
      for (let i in content.wall) {
        id.push(content.wall[i].id);
      }
      //Бурем значения из массива
      for (let i in content.comments) {
        //Цикл по количеству постов
        for (let n = 0; n < content.wall.length; n++) {
          //Если wallId равен числу
          if (content.comments[i].wallId == id[n]) {
            //Если массив от числа еще не создан и равен undefind
            if (arr[n] == undefined) {
              //То создаем новый массив
              arr[n] = new Array(content.comments[i]);
              //А если есть массив уже
            } else {
              //То добавляем в существуюший
              arr[n].push(content.comments[i]);
            }
          }
          //Если постов нет
          if (arr[n] == undefined) {
            //Создаем пустой массив
            arr[n] = new Array();
          }
        }
      }
      this.createLikes(content);
      this.createModel(content, arr);
    }

    /**
     * Создает модель для likes и пушит на сервер
     * @param {json} content -  база данных в json формате
     */
    createLikes(content) {
      let id = [];
      //Берем id элементов wall
      for (let i in content.wall) {
        id.push(content.wall[i].id);
      }

      for (let i = 0; i < content.wall.length; i++) {
        //Если нет по i модели лайков
        if (content.likes[i] == undefined) {
          //Создаем модель лайков
          let defaultLike = {
            modelId: id[i],
            likeFire: 0,
            likeHeartEyes: 0,
            likeRocket: 0,
            likeLike: 0,
            likeBomb: 0,
            id: id[i],
          };
          //Отправляем на сервер
          NetworkService.postDataLikes(defaultLike);
          //Добавляем в массив
          content.likes[i] = defaultLike;
        }
      }
    }
    /**
     * Создает модель для отображения данных
     * @param {json} content -  база данных в json формате
     * @param {Array} comments - отсортированный массив комментариев
     */
    createModel(content, comments) {
      let arr = [];
      for (let i = 0; i < content.wall.length; i++) {
        arr.push({
          id: content.wall[i].id,
          userName: content.wall[i].userName,
          userUrlImage: content.wall[i].userUrlImage,
          time: content.wall[i].time,
          postText: content.wall[i].postText,
          postUrlImage: content.wall[i].postUrlImage,
          likes: content.likes[i],
          comments: comments[i],
          //TODO: Заменить в будущем
          user: content.users[0],
        });
      }
      this.state.item = arr.reverse();
      this.update();
    }

    beforeUpdate() {
      this.getContainer().innerHTML = "";

      this.options.view = this.childrens.create(Wall, this.state);
      this.options.view.mount(this.getContainer());
    }

    render() {
      return `<div class="main-wall">
                ${this.options.view || ""}
              </div>`;
    }
  }

  class Wall extends Component {
    constructor({ item }) {
      super();
      this.state.item = item;
    }

    render(options, { item }) {
      return `<div class="wall">
                ${item.map(this.renderPost.bind(this)).join("\n")}
              </div>`;
    }

    renderPost(item) {
      return `<div class="module">
                ${this.childrens.create(Post, { item })} 
              </div>`;
    }
  }
  return FetcherManager;
});
