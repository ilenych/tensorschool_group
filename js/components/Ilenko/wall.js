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

    /**
     * Сортирует массив комментариев по постам
     * @param {json} content - база данных в json формате
     */
    sortArray(content) {
      let arr = [];
      for (let i in content.comments) {
        for (let n = 0; n < content.wall.length; n++) {
          let number = n + 1;
          if (content.comments[i].wallId == number) {
            if (arr[n] == undefined) {
              arr[n] = new Array(content.comments[i]);
            } else {
              arr[n].push(content.comments[i]);
            }
          }
        }
      }
      this.createModel(content, arr);
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
        });
      }
      this.state.item = arr;
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
