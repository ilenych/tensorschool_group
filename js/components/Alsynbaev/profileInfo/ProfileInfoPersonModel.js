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
        //семейное положение
        relationStr = [["Не женат", "Есть подруга", "Влюблен", "Женат", "В гражданском браке", "Все сложно"], ["Не замужем", "Есть друг", "Влюблена", "Замужем", "В гражданском браке", "Все сложно"]];

        /**
         * Возвращает строку с семейным положением с учетом пола пользователя
         */
        getRelationStr() {
            if (this.gender >= 1 && this.relation >= 1) {
                return this.relationStr[this.gender - 1][this.relation - 1];
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

            return datetime.toLocaleString("ru", options) + ", " + this.getAge() + " лет";
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
    }

    return ProfileInfoPersonModel;
});