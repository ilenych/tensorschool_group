define(["Base/Component"], function (Component) {

  class PostComment extends Component {
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

    render({ item }) {
      return item.comments.map(this.renderComment.bind(this)).join("\n");
    }

    renderComment({ userUrlImage, userName, commentText, commentTime }) {
      return `<div class="post_comments">
                <img class="post_comments__ava" src="${userUrlImage}" alt="Аватар" title=${userName}>
                 <p class="post_comments__name" title="${userName}">${userName}</p>
                 <span class="post_comments__text" title="Комментарий">${commentText}</span>
                <p class="post_comments__time text_lightgray" title="Время">${this.timeToPost(
                  commentTime
                )}</p>
            </div>`;
    }
  }
  
  return PostComment;
});
