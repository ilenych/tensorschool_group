define([], function () {
  "use strict";

  class NetworkService {
    constructor(options) {
      this.options = {
        ...{
          host: "tensorschool.herokuapp.com/", //хост сервера //"http://localhost:3000/"
        },
        ...options,
      };
    }
    /**
     * Запрос на сервер
     * @param {String} path - конец url строки
     */
    async request(path) {
      try {
        let responce = await fetch(this.options.host + path);
        let content = await responce.json();
        return content;
      } catch (err) {
        console.error(err);
      }
    }
    /**
     * Пуш на сервер
     * @param {String} path - конец url строки
     * @param {*} model - модель, для передачи на сервер
     */
    async post(path, model) {
      try {
        await fetch(this.options.host + path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(model),
        });
      } catch (err) {
        console.error(err);
      }
    }
    /**
     * Удаление данных с сервера
     * @param {String} path - конец url строки
     */
    async delete(path) {
      try {
        await fetch(this.options.host + path, {
          method: "DELETE",
        });
      } catch (err) {
        console.error(err);
      }
    }
    /**
     * Заменяет данные на сервере
     * @param {String} path - конец url строки
     * @param {{*} model - модель, для передачи на сервер
     */
    async put(path, model) {
      try {
        await fetch(this.options.host + path, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(model),
        });
      } catch (err) {
        console.error(err);
      }
    }
    /**
     * Получение комментариев по id
     * @param {String} id - id пользователся
     */
    async getDataComments(id) {
      const path = "wall/" + id + "/comments";
      this.request(path);
    }
    /**
     * Получение фотографий по id
     * @param {String} id - id пользователся
     */
    async getDataGallery(id) {
      const path = "gallery/" + id;
      return this.request(path).then((result) => {
        return result;
      })
    }
    /**
     * Полуяение всех данных по id
     * @param {String} id - id пользователся
     */
    async fetchData(id) {
      try {
        let arr = [];
        let responce = await fetch(
          this.options.host + "users/" + id + "/wall"
        );
        let content = await responce.json();
        arr = content;
        for (let i in content) {
          let responceLikes = await fetch(
            this.options.host + "likes/" + content[i].id
          );
          let contentLikes = await responceLikes.json();

          let responceComments = await fetch(
            this.options.host + "wall/" + content[i].id + "/comments"
          );
          let contentComments = await responceComments.json();
          arr.push(contentLikes, contentComments);
        }
        // console.log(content)
        return arr;
      } catch (err) {
        console.error(err);
      }
    }
    /**
     * Пуш комментариев
     * @param {Object} comment - модель комментариев
     */
    async postDataComment(comment) {
      const path = "comments";
      this.post(path, comment);
    }
    /**
     * Пуш поста
     * @param {Object} post
     */
    async postData(post) {
      const path = "wall";
      this.post(path, post);
    }
    /**
     * Пуш пользователя
     * @param {Object} user
     */
    async postDataUser(user) {
      const path = "users";
      this.post(path, user);
    }
    /**
     * Пуш фото
     * @param {Object} gallery
     */
    async postDataGallery(gallery) {
      const path = "gallery";
      this.post(path, gallery);
    }
    /**
     * Пуш лайков
     * @param {Object} likes
     */
    async postDataLikes(likes) {
      const path = "likes";
      this.post(path, likes);
    }
    /**
     * Удалениие поста
     * @param {String} id - id пользователся
     */
    async deleteDataPost(id) {
      const path = "wall/" + id;
      this.delete(path);
    }
    /**
     * Удаление лайков
     * @param {String} id - id пользователся
     */
    async deleteDataLikes(id) {
      const path = "likes/" + id;
      this.delete(path);
    }
    /**
     * Удаление комментарий с сервера по wallId
     * @param {Number} id - id элемента
     */
    async deleteDataComment(id) {
      const path = "comments/" + id;
      this.delete(path);
    }
    /**
     * Заменяет данные лайков на сервера в зависиимости от id
     */
    async putDataLikes(id, likes) {
      const path = "likes/" + id;
      this.put(path, likes)
    }
     /**
     * Заменяет данные фотографий на сервера в зависиимости от id
     */
    async putDataGallery(id, Gallery) {
      const path = "gallery/" + id;
      this.put(path, Gallery)
    }
  }

  const networService = factory.create(NetworkService);

  return networService;
});
