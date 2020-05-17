define({
  /**
   * Возвращает все данные с сервера
   */
  fetchData: async function () {
    try {
      let responce = await fetch("https://tensorschool.herokuapp.com/db");
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
        "https://tensorschool.herokuapp.com/wall/" + id + "/comments"
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
      await fetch("https://tensorschool.herokuapp.com/comments", {
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
  deleteData: async function (id) {
    try {
      await fetch("https://tensorschool.herokuapp.com/wall/" + id, {
        method: "DELETE",
      });
      await fetch("https://tensorschool.herokuapp.com/likes/" + id, {
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
      await fetch("https://tensorschool.herokuapp.com/comments/" + id, {
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
      await fetch("https://tensorschool.herokuapp.com/likes/" + id, {
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
      await fetch("https://tensorschool.herokuapp.com/likes", {
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
      await fetch("https://tensorschool.herokuapp.com/wall", {
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
      let responce = await fetch("https://tensorschool.herokuapp.com/users/1");
      let content = await responce.json();
      return content;
    } catch (err) {
      console.error(err);
    }
  },
});
