define({
  /**
   * Возвращает данные с http://localhost:3000/db
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
   * Пушит данные с комментами в http://localhost:3000/comments
   */
  postData: async function (comment) {
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
   * Удаляет данный пост с http://localhost:3000/model/id
   * id
   */
  deleteData: async function (id) {
    try {
      await fetch("https://tensorschool.herokuapp.com/wall/" + id, {
        method: "DELETE",
      });
      await fetch("https://tensorschool.herokuapp.com/wall/" + id + "/comments", {
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
   * Заменяет данные лайков в http://localhost:3000/like/id
   */
  putData: async function (id, likes) {
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

  // getDataUser: async function () {
  //   try {
  //     let responce = await fetch("http://localhost:3000/users/1");
  //     let content = await responce.json();
  //     return content;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },
});
