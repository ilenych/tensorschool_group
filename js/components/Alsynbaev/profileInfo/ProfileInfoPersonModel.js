define(['Base/Model'], function (Model) {

    /**
     * Модель с данными о пользователе
     *
     * Пример данных:
     * new ProfileInfoPersonModel({
                        first_name: Имя,
                        last_name: Фамилия,
                        status: Статус,
                        gender: 0 - не указан, 1 - мужской, 2 - женский
                        bdate: Дата рождения / Пример: '1997-06-01',
                        city: Город,
                        country: Страна,
                        phone: Телефон / Пример: '8 (800) 555-35-35',
                        email: почта / Пример: 'milo@milo.ru',
                        relation: 2, 0 - не указан, .........
                        education: Образование,
                        work: Работа,
                        alcohol: Алкоголь,
                        smoking: Курение,
                        interests: Интересы,
                        music: Любимая музыка,
                        activities: Деятельность,
                        movies: Любимые фильмы,
                        tv: Любимые телешоу,
                        books: Любимые книги,
                        games: Любимые игры,
                        quotes: Любимые цитаты,
                        about: О себе,
                    });
     */

    class ProfileInfoPersonModel extends Model {

        /**
         * Возвращает строку с семейным положением с учетом пола пользователя
         */
        getRelationStr() {
            //семейное положение
            const relationStr = [["Не женат", "Есть подруга", "Влюблен", "Женат", "В гражданском браке", "Все сложно"], ["Не замужем", "Есть друг", "Влюблена", "Замужем", "В гражданском браке", "Все сложно"]];

            if (this.gender >= 1 && this.relation >= 1) {
                return relationStr[this.gender - 1][this.relation - 1];
            }
            return '';
        }

        /**
         * Возвращет возраст пользователя
         */
        getAge() {
            return Math.floor((new Date().getTime() - new Date(this.bdate)) / (24 * 3600 * 365.25 * 1000));
        }

        /**
         * Возвращает строку с днем рождения "день месяц возраст"
         */

        getBdStr() {
            const datetime = new Date(this.bdate);
            const options = {
                month: "long",
                day: "numeric",
            };
            const bday = datetime.toLocaleString("ru", options);
            const age = this.getAge();
            if (bday && age)
                return bday + ", " + age + " лет";

            return '';
        }

        /**
         * Возвращает строку с полом пользователя
         */
        getSexStr() {
            if (this.gender == 1) {
                return "Мужской";
            } else if (this.gender == 2) {
                return "Женский";
            }
            return '';
        }

        /**
         * Возвращает строку с городом и страной пользователя в формате "Город, Страна"
         */
        getCityCountryStr() {
            if (this.country == null || this.country == '')
                return (this.city || '');
            else
                return (this.city || '') + ", " + (this.country);
        }

        textDate(date, now) {
            let out = 'неизвестно';
            const days = Math.floor((date - now) / 86400000) * -1;
            const daysStr = ['сегодня', 'вчера', 'позавчера'];
            if (date) {
                out = `${daysStr[days - 1] || date.toLocaleDateString()} в ${date.toTimeString().replace(/:[0-9]{2,2} .*/, '')}`;
            }

            return `Был${this.gender == 2 ? 'а' : ''} в сети ` + out;
        }

        getName() {
            let name = (this.first_name || '') + " " + (this.last_name || '');

            if (name == " ")
                name = this.name || 'Неизвестно';

            return name;
        }

        getLastActivity() {
            const curTime = new Date();
            const last_activity = new Date(this.last_activity);
            last_activity.setMinutes(last_activity.getMinutes() - curTime.getTimezoneOffset());
            const offset = (curTime.getMinutes() * 60 + curTime.getSeconds()) - (last_activity.getMinutes() * 60 + last_activity.getSeconds());
            if (Math.abs(offset) > 5 * 60) {
                return this.textDate(last_activity, curTime);
            } else {
                return "online";
            }
        }
    }

    return ProfileInfoPersonModel;
});