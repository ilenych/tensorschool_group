define({
  /**
   * Возвращает данные с http://localhost:3000/model
   */
   fetchData: async function () {
    try {
      let responce = await fetch("http://localhost:3000/model");
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
/**
   * Получает данные лайков с http://localhost:3000/like/id 
   */
  getData: async function (id) {
    try {
        let responce = await fetch("http://localhost:3000/likes/" + id);
        let content = await responce.json();
        console.log(content)
        return content;
      } catch (err) {
        console.error(err);
      }
  },
});

//----------------------------------- ?? -------------------------------------------
//   var urlencoded = new URLSearchParams();
//   urlencoded.append('login', 'vasya');
//   urlencoded.append('password', 'vasya123');

//   var requestOptions = {
//     method: 'POST',
//     headers: {"Content-Type": "application/x-www-form-urlencoded"},
//     body: urlencoded,
//     "credentials": "include"
//   };

//   fetch("https://tensor-school.herokuapp.com/user/login", requestOptions)
//   .then((res) => {
//     console.log(res.text())
//   }).then(rel => console.log(rel))

//   fetch("https://tensor-school.herokuapp.com/user/current", {'credentials': 'include'})
//   .then((res) => {
//     console.log(res.text())
//   });
