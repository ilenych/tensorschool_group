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
        this.state.item = res;
        this.update();
      });
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
