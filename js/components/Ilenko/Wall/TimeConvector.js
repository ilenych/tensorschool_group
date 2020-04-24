define({
  //change time to sting - ["сегодня", "вчера", "позавчера"] в HH:MM
  convert: function (time) {
    let out = "неизвестно";
    let date = new Date(time);
    const now = new Date();
    let days = Math.floor((date - now) / 86400000) * -1;
    const daysStr = ["сегодня", "вчера", "позавчера"];
    if (date) {
      out = `${
        daysStr[days - 1] || date.toLocaleDateString()
      } в ${date.toTimeString().replace(/:[0-9]{2,2} .*/, "")}`;
    }

    return out;
  },
});
