define({
  /**
   * Возвращает данные с http://localhost:3000/db
   */
  fetchData: async function () {
    try {
      let responce = await fetch("http://localhost:3000/db"); 
      let content = await responce.json();
      return this.sortArray(content);
    } catch (err) {
      console.error(err);
    }
  },
/**
 * Сортирует массив комментариев по постам
 * @param {json} content - база данных в json формате
 */
  sortArray: function (content) {
    let arr = [];
    for (let i in content.comments) {
      for (let n = 0; n < content.wall.length; n++) {
        let number = n + 1;
        if (content.comments[i].wallId == number) {
          if (arr[n] == undefined) {
            arr[n] = new Array(content.comments[i]);
          } else {
            arr[n].push(content.comments[i]);
          }
        }
      }
    }
    return this.createModel(content, arr);
  },
/**
 * Создает модель для отображения данных
 * @param {json} content -  база данных в json формате
 * @param {Array} comments - отсортированный массив комментариев 
 */
  createModel: function (content, comments) {
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
      });
    }
    return arr;
  },
  /**
   * Пушит данные с комментами в http://localhost:3000/comments
   */
  postData: async function (comment) {
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
   * Удаляет данный пост с http://localhost:3000/model/id
   * id
   */
  deleteData: async function (id) {
    try {
      await fetch("http://localhost:3000/model" + "/" + id, {
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

  getDataUser: async function () {
    try {
        let responce = await fetch("http://localhost:3000/users/1");
        let content = await responce.json();
        return content;
      } catch (err) {
        console.error(err);
      }
  }
});

//----------------------------------- ?? -------------------------------------------
  // var urlencoded = new URLSearchParams();
  // urlencoded.append('login', 'vasya');
  // urlencoded.append('password', 'vasya123');

  // var requestOptions = {
  //   method: 'POST',
  //   headers: {"Content-Type": "application/x-www-form-urlencoded"},
  //   body: urlencoded,
  //   "credentials": "include"
  // };

  // fetch("https://tensor-school.herokuapp.com/user/login", requestOptions)
  // .then((res) => {
  //   console.log(res.text())
  // }).then(rel => console.log(rel))

  // fetch("https://tensor-school.herokuapp.com/user/current", {'credentials': 'include'})
  // .then((res) => {
  //   console.log(res.text())
  // });
