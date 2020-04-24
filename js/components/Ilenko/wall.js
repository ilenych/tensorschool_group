define(["Base/Component", "Wall/model", "Wall/post"], function (
  Component,
  model,
  Post
) {
  "use strict";

  class Wall extends Component {
    constructor({ item }) {
      super();
      this.state.item = item;
    }
    //TODO: Заменить модель на модель с сервера
    //Впорос: Если fetch отрабатывает в конце загрузки страницы, а для отображения нужны данные с сервера, как тогда быть?
    beforeMount() {
      if (this.state.item === undefined) {
        //Стандартная модель если не передали ничего в конструктор
        this.state.item = {
          wall: [
            {
              id: 1,
              userName: "Джилл Валентайн",
              userUrlImage: "img/post/ava.png",
              time: "2020-04-21T15:59:40.007Z",
              postText:
                "Сыграем в RE3 remake? 3 апреля 2020 года Capcom выпустила Resident Evil 3 Remake — обновленную версию популярной игры Resident Evil 3: Nemesis 1999 года.",
              postUrlImage: "img/post/postImage.jpg",
              likeFire: 132,
              likeHeartEyes: 24,
              likeRocket: 26,
              likeLike: 68,
              likeBomb: 87,
              comments: [
                {
                  userUrlImage: "img/post/newUser.png",
                  userName: "Леон Скотт Кеннеди",
                  commentText: "Нашу встречу вырезалии с тобой (",
                  commentTime: "2020-04-22T15:59:40.007Z",
                },
                {
                  userUrlImage: "img/post/ava.png",
                  userName: "Фэйк Джилл",
                  commentText: "Так может быть ты...",
                  commentTime: "2020-04-22T15:59:40.007Z",
                },
                {
                  userUrlImage: "img/post/ava.png",
                  userName: "Фэйк Джилл",
                  commentText: "Так может быть ты...",
                  commentTime: "2020-04-22T15:59:40.007Z",
                },
                {
                  userUrlImage: "img/post/ava.png",
                  userName: "Фэйк Джилл",
                  commentText: "Так может быть ты...",
                  commentTime: "2020-04-22T15:59:40.007Z",
                },
              ],
            },
            {
              id: 2,
              userName: "Джилл Валентайн",
              userUrlImage: "img/post/ava.png",
              time: "2020-04-21T15:59:40.007Z",
              postText:
                "Сыграем в RE3 remake? 3 апреля 2020 года Capcom выпустила Resident Evil 3 Remake — обновленную версию популярной игры Resident Evil 3: Nemesis 1999 года.",
              postUrlImage: "img/post/postImage.jpg",
              likeFire: 132,
              likeHeartEyes: 24,
              likeRocket: 26,
              likeLike: 68,
              likeBomb: 87,
              comments: [
                {
                  userUrlImage: "img/post/newUser.png",
                  userName: "Леон Скотт Кеннеди",
                  commentText: "Нашу встречу вырезалии с тобой (",
                  commentTime: "2020-04-22T15:59:40.007Z",
                },
                {
                  userUrlImage: "img/post/ava.png",
                  userName: "Фэйк Джилл",
                  commentText: "Так может быть ты...",
                  commentTime: "2020-04-22T15:59:40.007Z",
                },
              ],
            },
          ],
        };
      }
    }

    render(options, { item }) {
      return `<div class="wall">
                ${item.wall.map(this.renderPost.bind(this)).join("\n")}
                </div>`;
    }

    renderPost(item) {
      return `<div class="module">
                    ${this.childrens.create(Post, { item })} 
                </div>`;
    }
  }
  return Wall;
});
