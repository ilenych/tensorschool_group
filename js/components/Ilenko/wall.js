define([
  "Base/Component",
  "Wall/post",
  "Wall/View",
  "Wall/PostModel",
  "Wall/DataSet"
], function (Component, Post, View, PostModel, DataSet) {
  "use strict";

  class FetcherManager extends Component {
    render() {
      //создаем View
      this.view = this.childrens.create(View, {
        dataSet: factory.create(DataSet, {
          model: PostModel,
        }),
        comp: Wall,
      });

      return `<div class="wall basis">
                  ${this.view}
              </div>`;
    }
  }

  class Wall extends Component {
    constructor({ item }) {
      super();
      this.state.item = item;
      console.log(item)
    }

    render(options, { item }) {
      console.log(item)

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
