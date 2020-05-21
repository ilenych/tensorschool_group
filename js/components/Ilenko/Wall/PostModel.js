define(["Base/Model", "components/Ilenko/Service/NetworkService"], function (Model, NetworkService) {
    class PostModel extends Model {

      getContent() {
        console.log("model")
        return this.sortArray();
      }

      sortArray() {
        let arr = [];
        let id = [];
        //Проверка массива на пустоту
        if (this.comments.length == 0) {
          this.comments = [{}];
        }
        //Берем id элементов wall
        for (let i in this.wall) {
          id.push(this.wall[i].id);
        }
        //Бурем значения из массива
        for (let i in this.comments) {
          //Цикл по количеству постов
          for (let n = 0; n < this.wall.length; n++) {
            //Если wallId равен числу
            if (this.comments[i].wallId == id[n]) {
              //Если массив от числа еще не создан и равен undefind
              if (arr[n] == undefined) {
                //То создаем новый массив
                arr[n] = new Array(this.comments[i]);
                //А если есть массив уже
              } else {
                //То добавляем в существуюший
                arr[n].push(this.comments[i]);
              }
            }
            //Если постов нет
            if (arr[n] == undefined) {
              //Создаем пустой массив
              arr[n] = new Array();
            }
          }
        }
        console.log(arr)
        this.createLikes();
        return this.createModel(arr);
      }
  
      /**
       * Создает модель для likes и пушит на сервер
       * @param {json} this -  база данных в json формате
       */
      createLikes() {
        let id = [];
        //Берем id элементов wall
        for (let i in this.wall) {
          id.push(this.wall[i].id);
        }
  
        for (let i = 0; i < this.wall.length; i++) {
          //Если нет по i модели лайков
          if (this.likes[i] == undefined) {
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
            this.likes[i] = defaultLike;
          }
        }
      }
      /**
       * Создает модель для отображения данных
       * @param {json} this -  база данных в json формате
       * @param {Array} comments - отсортированный массив комментариев
       */
      createModel(comments) {
        let arr = [];
        for (let i = 0; i < this.wall.length; i++) {
          arr.push({
            id: this.wall[i].id,
            userName: this.wall[i].userName,
            userUrlImage: this.wall[i].userUrlImage,
            time: this.wall[i].time,
            postText: this.wall[i].postText,
            postUrlImage: this.wall[i].postUrlImage,
            likes: this.likes[i],
            comments: comments[i],
            //TODO: Заменить в будущем
            user: this.users[0],
          });
        }
        return arr.reverse();
      }
  

    }
  
    return PostModel;
  });
  