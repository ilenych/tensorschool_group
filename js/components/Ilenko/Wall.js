define([
  "Base/Component",
  "Wall/post",
  "Wall/PostModel",
  "components/Ilenko/Common/View",
  "components/Ilenko/Common/DataSet",
], function (Component, Post, PostModel, View, DataSet) {
  "use strict";

  class FetcherManager extends Component {
    constructor(options) {
      super(options);
      this.id = options.id
      this.curId = options.curId
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
          console.log(this)
          this.view = this.childrens.create(View, {
            dataSet: factory.create(DataSet, {
              object: `wall`,
              model: PostModel,
            }),
            comp: Wall,
            id: this.id,
            curId: this.curId
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
          object: `wall`,
          model: PostModel,
        }),
        comp: Wall,
        id: this.id,
        curId: this.curId
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
