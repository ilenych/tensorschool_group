define(["Base/Component"], function (Component) {
    "use strict";
  
    class View extends Component {
      constructor(options) {
        super(options);
      }
  
      // до монитроавния
      beforeMount() {
        if (this.options.dataSet) {
          // загружаем данные
          this.loadData();
        }
      }
  
      //загружаем данные из сервера
      loadData() {
        this.options.dataSet.read().then((item) => {
          this.setItems(item.getContent());
        });
      }
  
      setItems(item) {
        this.setState({ item });
        this.update();
      }
      update() {
        super.update();
        this.unmountChildren(); //размонитруем дочерние модули
  
        this.getContainer().innerHTML = "";
  
        //монтируем модуль и передаем данные
        const view = this.childrens.create(this.options.comp, {
          item: this.state.item,
        });
        view.mount(this.getContainer());
      }
  
      //пока данные не загружены, будет надпись "Загрузка..."
      render() {
        return `<div class="view">
                  Загрузка...
              </div>`;
      }
    }
  
    return View;
  });