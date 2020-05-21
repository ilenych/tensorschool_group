define({
  /**
   * Возвращает все данные с сервера
   */
  fetchData: async function () {
    try {
      let responce = await fetch("http://localhost:3000/db");
      let content = await responce.json();
      return content;
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * Получение комментариев по id
   * @param {Number} id - id элемента
   */
  getDataComments: async function (id) {
    try {
      let responce = await fetch(
        "http://localhost:3000/wall/" + id + "/comments"
      );
      let content = await responce.json();
      return content;
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * Пушит данные с комментами в https://tensorschool.herokuapp.com/comments
   */
  postDataComment: async function (comment) {
    try {
      await fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(comment),
      });
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * Удаляет данные с сервера по id
   * @param {Number} id - id элемента
   */
  deleteDataPost: async function (id) {
    try {
      await fetch("http://localhost:3000/wall/" + id, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  },
 /**
   * Удаляет данные с сервера по id
   * @param {Number} id - id элемента
   */
  deleteDataLikes: async function (id) {
    try {
      await fetch("http://localhost:3000/likes/" + id, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * Удаляет комментарии с сервера по wallId
   * @param {Number} id - id элемента
   */
  deleteDataComment: async function (id) {
    try {
      await fetch("http://localhost:3000/comments/" + id, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * Заменяет данные лайков на сервера в зависиимости от id
   */
  putDataLikes: async function (id, likes) {
    try {
      await fetch("http://localhost:3000/likes/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(likes),
      });
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * Пушит модель данных лайков на сервер
   * @param {Object} likes - модель лайков
   */
  postDataLikes: async function (likes) {
    try {
      await fetch("http://localhost:3000/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(likes),
      });
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * Пущит модель данный нового поста на сервер
   * @param {Object} post
   */
  postData: async function (post) {
    try {
      await fetch("http://localhost:3000/wall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(post),
      });
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * Получение данных о пользователе
   */
  getDataUser: async function () {
    try {
      let responce = await fetch("http://localhost:3000/users/1");
      let content = await responce.json();
      return content;
    } catch (err) {
      console.error(err);
    }
  },
});
