
define([
    'Base/Component',
    'ProfileInfo/ProfileInfoPersonModel',
    'css!ProfileInfo/css/profileInfo.css'
], function (Component, ProfileInfoPersonModel) {
    'use strict';

    /**
     * Основной модуль с информацией о пользователе
     */
    class ProfileInfo extends Component {
        /**
         * Коструктор модуля
         * @param {ProfileInfoPersonModel} модель 
         */
        constructor({ item }) {
            super({ item });
            this.state.item = item;
        }
        /**
         * Выполняется до рендера
         */
        beforeMount() {
            if (this.state.item === undefined) {
                //Стандартная модель если не передали ничего в конструктор
                this.state.item = new ProfileInfoPersonModel({
                    first_name: 'Рональд',
                    last_name: 'Уизли',
                    status: 'Статус статусов',
                    gender: 1,
                    bdate: '1997-06-01',
                    city: 'Уфа',
                    country: 'Россия',
                    phone: '8 (800) 555-35-35',
                    email: 'milo@milo.ru',
                    relation: 2,
                    education: 'Тензоррр',
                    interests: "Family, Friends, Dancing, Music",
                    music: "David Garrett, Bond, Barrage, Michael Jackson, electronic, etc. I like songs from all types and genres of uplifting music except 'country western' and 'heavy metal.'",
                    activities: "Music, touring, scrapbooking, camping, eating cereal, service for Church of Jesus Christ of Latter day Saints, public speaking, watching movies",
                    movies: "Anne of Green Gables, That's Dancing",
                    tv: "The Ellen Degeneres Show",
                    books: "Harry Potter series, The Book of Mormon",
                    games: "Village Idiot, Hearts, Who What When Where Why How (I love board games/card games)",
                    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
                    quotes: "If we did all the things we are capable of, we would literally astound ourselves.-Thomas Edison",
                });
            }
        }

        /**
         * Выполнятеся после рендера
         */
        afterMount() {
            //Вешает на кнопку Показать/Скрыть подробности метод toggleFullInfo при клике 
            this.subscribeTo(this.getContainer().querySelector(".profile-main-info__more-info"), 'click', this.toggleFullInfo.bind(this));
        }

        /**
         * Показывать или скрывать информацию при нажатии на кнопку Показать/Скрыть подробности
         */
        toggleFullInfo() {
            //получение блока содержащий полную информацию о пользователе
            const profileInfoFull = document.querySelector(".profile-info__full");
            //метка "" 
            const profileMainInfoMoreLabel = document.querySelector(".profile-main-info__more-label");
            const profileMainInfoLessLabel = document.querySelector(".profile-main-info__less-label");

            if (profileInfoFull.style.display == 'none') {
                profileInfoFull.style.display = 'grid';
                profileMainInfoMoreLabel.style.display = 'none';
                profileMainInfoLessLabel.style.display = 'block';
            } else {
                profileInfoFull.style.display = 'none';
                profileMainInfoMoreLabel.style.display = 'block';
                profileMainInfoLessLabel.style.display = 'none';
            }
        }

        /**
         * рендер имени и фамилии пользователя
         * @param {ProfileInfoPersonModel} необходимые поля first_name - имя, last_name - фамимлия 
         */
        renderFullName({ item }) {
            return `<div class="profile-main-info__name" title = "${item.first_name} ${item.last_name}">
                ${item.first_name} ${item.last_name}
            </div>`;
        }

        /**
         * рендер статус пользователя
         * @param {ProfileInfoPersonModel} рекомендуемые поля status - статус
         */

        renderStatus({ item }) {
            return `<div class="profile-main-info__current-info" title = "${item.status || ''}">
                ${item.status || ''}
            </div>`;
        }

        /**
         * рендер кнопки Показать подробности/Скрыть подробности
         */
        renderFullInfoButton() {
            return `<div class="profile-main-info__more-info">
                <a class="profile-main-info__more-info-link">
                    <span class="profile-main-info__more-label">Показать подробности</span>
                    <span class="profile-main-info__less-label">Скрыть подробности</span>
                </a>
            </div>`;
        }

        /**
         * Рендер модуля
         * @param {*} options 
         * @param {ProfileInfoPersonModel} модель с информацией
         */
        render(options, { item }) {
            return `<div class="profile-main-info">
                    ${this.renderFullName({ item })}
                    ${this.renderStatus({ item })}
                    ${this.childrens.create(ProfileInfoShort, { item })}
                    ${this.renderFullInfoButton()}
                    ${this.childrens.create(ProfileInfoFull, { item })}
                    </div>`;
        }
    }

    /**
     * Подмодуль отвечающий за короткую информацию о пользователе
     */
    class ProfileInfoShort extends Component {
        constructor({ item }) {
            super({ item });
            this.state.item = item;
        }

        /**
         * Выполняется до рендера
         */
        beforeMount() {
            //Создаем объект с категориями
            this.setState({
                categories: [{
                    fields: [
                        {
                            title: 'День рождения',
                            value: this.state.item.getBdStr()
                        }, {
                            title: 'Пол',
                            value: this.state.item.getSexStr()
                        }, {
                            title: 'Город',
                            value: this.state.item.getCityCountryStr()
                        }, {
                            title: 'Семейное положение',
                            value: this.state.item.getRelationStr()
                        }
                    ]
                }]
            });
        }

        /**
         * Рендер модуля
         * @param {*} options 
         * @param {*} катеогрии 
         */
        render(options, { categories }) {
            return `<div class="profile-info profile-info__short">
                ${categories.map((item) => this.childrens.create(ProfileInfoCategory, item)).join('\n')}
                </div>`;
        }
    }

    /**
     * Подмодуль отвечающий за полную информацию о пользователе
     */

    class ProfileInfoFull extends Component {
        constructor({ item }) {
            super({ item });
            this.state.item = item;
        }

        beforeMount() {
            //Создаем объект с категориями
            this.setState({
                categories: [{
                    //Заголовок категории
                    title: 'Контакты',
                    //Поля
                    fields: [
                        {
                            title: 'Телефон',
                            value: this.state.item.phone
                        }, {
                            title: 'Почта',
                            value: this.state.item.email
                        }
                    ]
                }, {
                    title: 'Образование',
                    fields: [
                        {
                            title: 'Образование',
                            value: this.state.item.education
                        }
                    ]
                }, {
                    title: 'Деятельность',
                    fields: [
                        {
                            title: 'Деятельность',
                            value: this.state.item.activities
                        }
                    ]
                }, {
                    title: 'Интересы',
                    fields: [
                        {
                            title: 'Интересы',
                            value: this.state.item.interests
                        }, {
                            title: 'Любимая музыка',
                            value: this.state.item.music
                        }, {
                            title: 'Любимые телешоу',
                            value: this.state.item.tv
                        }, {
                            title: 'Любимые книги',
                            value: this.state.item.books
                        }, {
                            title: 'Любимые игры',
                            value: this.state.item.games
                        }, {
                            title: 'Любимые фильмы',
                            value: this.state.item.movies
                        }, {
                            title: 'Любимые цитаты',
                            value: this.state.item.quotes
                        }
                    ]
                }, {
                    title: 'О себе',
                    fields: [
                        {
                            title: 'О себе',
                            value: this.state.item.about
                        }
                    ]
                }]
            });
        }

        /**
         * Рендер модуля
         * @param {*} options 
         * @param {*} категории 
         */
        render(options, { categories }) {
            return `<div class="profile-info profile-info__full" style="display: none;">
                ${categories.map((item) => this.childrens.create(ProfileInfoCategory, item)).join('\n')}
                </div>`;
        }
    }

    /**
     * Подмодуль для рендера катеогрий
     */
    class ProfileInfoCategory extends Component {

        /**
         * Рендер подмодуля
         * @param {*} - title - заголовок поля, fiels - массив с полями {title- заголовок поля, value - значение поля}
         */
        render({ title, fields }) {
            return `<div class="profile-info-category">
                        <div class="profile-info-category__title">${title}</div>
                        <div class="profile-info-category__fields">
                            ${fields.map(this.renderInfoField).join('\n')}
                        </div>
                    </div>`;
        }

        /**
         * Рендер поля категории
         * @param {*} title - заголовок поля, value - значение поля
         */
        renderInfoField({ title = '', value = '' }) {
            return `<div class="profile-info__title" title = "${title}">${title}</div>
                        <div class="profile-info__value" title = "${value}">${value}</div>`;
        }

        /**
         * Опции по умолчанию 
         */
        getDefaultOptions() {
            return {
                title: '',
                fields: []
            }
        }
    }

    return ProfileInfo;
});
