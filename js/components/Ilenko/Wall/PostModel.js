define(["Base/Model", "components/Ilenko/Service/NetworkService"], function (
  Model,
  NetworkService
) {
  class PostModel extends Model {
    getContent() {
      return this.sortArray();
    }

    sortArray() {
      //вспомогательый массив
      let arr = [];
      //модель
      let content = {
        posts: [],
        comments: [],
        likes: [],
      };
      //Закидываем данные в вспомогательный массив
      for (let i in this) {
        arr.push(this[i]);
      }
      //Сортируем массив по модели content
      for (let i in arr) {
        if (arr[i].postText != undefined) {
          content.posts.push(arr[i]);
        } else if (arr[i].modelId != undefined) {
          content.likes.push(arr[i]);
        } else content.comments.push(arr[i]);
      }
      //Проверка на налиичие постов
      for(let i in content.comments){
         // Если постов нет
         if (!Array.isArray(content.comments[i])) {
          //Создаем пустой массив
          content.comments[i] = new Array();
        }
      }
      return this.createLikes(content);
    }

    /**
     * Создает модель для likes и пушит на сервер
     * * @param {Array} content - [posts: [...], comments: [...], likes: [...]]
     */
    createLikes(content) {
      let id = [];
      //Берем id элементов wall
      for (let i in content.posts) {
        id.push(content.posts[i].id);
      }

      for (let i = 0; i < content.posts.length; i++) {
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
      return this.createModel(content);
    }
    /**
     * Создает модель для отображения данных
     * @param {Array} content - [posts: [...], comments: [...], likes: [...]]
     */
    createModel(content) {
      let arr = [];
      for (let i = 0; i < content.posts.length; i++) {
        arr.push({
          id: content.posts[i].id,
          userName: content.posts[i].userName,
          userUrlImage: content.posts[i].userUrlImage,
          time: content.posts[i].time,
          postText: content.posts[i].postText,
          postUrlImage: content.posts[i].postUrlImage,
          likes: content.likes[i],
          comments: content.comments[i],
        });
      }
      return arr.reverse();
    }
  }

  return PostModel;
});
