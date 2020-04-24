// define(["Base/Model"], function (Model) {
//   //Correct model for post content
//   class ContentModel extends Model {
//     //render time
//     get renderTime() {
//       return this.timeToPost(this.time || null);
//     }

//     //change time to sting - ["сегодня", "вчера", "позавчера"] в HH:MM
//     timeToPost(time) {
//       let out = "неизвестно";
//       let date = new Date(
//         time.year,
//         time.month,
//         time.day,
//         time.hour,
//         time.minute
//       );
//       const now = new Date();
//       let days = Math.floor((date - now) / 86400000);
//       if (days != 0) {
//         days *= -1;
//       }
//       const daysStr = ["сегодня", "вчера", "позавчера"];
//       if (date) {
//         out = `${
//           daysStr[days] || date.toLocaleDateString()
//         } в ${date.toTimeString().replace(/:[0-9]{2,2} .*/, "")}`;
//       }

//       return out;
//     }
//   }
  
//   return ContentModel;
// });
