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
        // this.setItems(item);
        this.sortArray(item)
        // this.setItems(item);
      });
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
      this.setItems(arr.reverse());
    }

    setItems(item) {
      console.log(item);
      
      this.setState({item});
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
