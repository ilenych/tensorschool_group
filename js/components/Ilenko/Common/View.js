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
        this.options.dataSet.read(this.options.id).then((item) => {
          this.setItems(item.getContent());
        });
      }
  
      setItems(item) {
        //если приходит массив закидываем current useer id
        if(Array.isArray(item)) {
          for(let i in item){
            item[i].userId = this.options.curId
          }
        }
        this.setState({ item });
        this.update();
      }
      update() {
        super.update();
        this.unmountChildren(); //размонитруем дочерние модули
  
        this.getContainer().innerHTML = "";
        //монтируем модуль и передаем данные
        if(typeof this.state.item === 'string' || this.state.item instanceof String){
          //Это для sender block
          const view = this.childrens.create(this.options.comp, {
            item: this.state.item,
            items: this.options.items
          });
          view.mount(this.getContainer())
        }else{
          //Это для всех
          const view = this.childrens.create(this.options.comp, {
            item: this.state.item,
            object: this.options.object,
          });
          view.mount(this.getContainer());
        }
       
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