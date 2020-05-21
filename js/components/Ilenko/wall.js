define([
  "Base/Component",
  "Wall/post",
  "Wall/View",
  "Wall/PostModel",
  "Wall/DataSet"
], function (Component, Post, View, PostModel, DataSet) {
  "use strict";

  class FetcherManager extends Component {
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
        3000
      );
    }

    onClickButtonPublish() {
      this._wallBasis = document.querySelector(
        ".wallBasis"
      );

       setTimeout(
        function () {
          this._wallBasis.innerHTML = "";

          this.view = this.childrens.create(View, {
            dataSet: factory.create(DataSet, {
              model: PostModel,
            }),
            comp: Wall,
          });
          this._wallBasis.innerHTML = this.view;
        }.bind(this),
        2000
      );
    }

    render() {
      //создаем View
      this.view = this.childrens.create(View, {
        dataSet: factory.create(DataSet, {
          model: PostModel,
        }),
        comp: Wall,
      });

      return `<div class="wallBasis">
                  ${this.view}
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
              </div>`
            
    }
    renderPost(item) {
      return `<div class="module">
                ${this.childrens.create(Post, { item })} 
              </div>`;
    }
  }
  return FetcherManager;
});
