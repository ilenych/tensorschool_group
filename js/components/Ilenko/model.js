/**
 * Модели обеспечивают доступ к данным и поведению объектов предметной области (сущностям).
 * Такими сущностями могут быть, например, товары, пользователи, документы — и другие предметы окружающего мира,
 * которые вы моделируете в своем приложении.
 *
 * Базовая модель
 */
class Model {
  constructor(data) {
    for (let k in data) {
      this[k] = data[k];
    }
  }
}

//Correct model for post content
class ContentModel extends Model {
  //render time
  get renderTime() {
    return this.timeToPost(this.time || null);
  }

  //change time to sting - ["сегодня", "вчера", "позавчера"] в HH:MM
  timeToPost(time) {
    let out = "неизвестно";
    let date = new Date(
      time.year,
      time.month,
      time.day,
      time.hour,
      time.minute
    );
    const now = new Date();
    let days = Math.floor((date - now) / 86400000);
    if (days != 0) {
      days *= -1;
    }
    const daysStr = ["сегодня", "вчера", "позавчера"];
    if (date) {
      out = `${
        daysStr[days] || date.toLocaleDateString()
      } в ${date.toTimeString().replace(/:[0-9]{2,2} .*/, "")}`;
    }

    return out;
  }
}

// MODEL
const model = new ContentModel({
  userName: "Джилл Валентайн",
  userUrlImage: "img/post/ava.png",
  time: {
    year: 2020,
    month: 3,
    day: 14,
    hour: 14,
    minute: 39,
  },
  postText:
    "Сыграем в RE3 remake? 3 апреля 2020 года Capcom выпустила Resident Evil 3 Remake — обновленную версию популярной игры Resident Evil 3: Nemesis 1999 года.",
  postUrlImage: "img/post/postImage.jpg",
  likeFire: "1",
  likeHeartEyes: "24",
  likeRocket: "26",
  likeLike: "68",
  likeBomb: "87",
  commentLenght: "2",
  newUserUrlImage: "img/post/newUser.png",
  newUserName: "Леон Скотт Кеннеди",
  commentText: "Нашу встречу вырезалии с тобой (",
  commentTime: "yesterday 16:45",
});
