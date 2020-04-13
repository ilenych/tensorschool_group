
define([
    'components/Alsynbaev/base'
], function (basic) {
    'use strict';
    alert('Loaded module Profile Info');

    class ProfileInfoPersonModel extends Model {
        relationStr = [["Не женат", "Есть подруга", "Влюблен", "Женат", "В гражданском браке", "Все сложно"], ["Не замужем", "Есть друг", "Влюблена", "Замужем", "В гражданском браке", "Все сложно"]];

        getRelationStr() {
            if (this.gender >= 1 && this.relation >= 1) {
                return this.relationStr[this.gender - 1][this.relation - 1];
            }
            return '';
        }

        getAge() {
            return Math.floor((new Date().getTime() - new Date(this.bdate)) / (24 * 3600 * 365.25 * 1000));
        }

        getBdStr() {
            const datetime = new Date(this.bdate);
            const options = {
                month: "long",
                day: "numeric",
            };

            return datetime.toLocaleString("ru", options) + ", " + this.getAge() + " лет";
        }

        getSexStr() {
            if (this.gender == 1) {
                return "Мужской";
            } else if (this.gender == 2) {
                return "Женский";
            }
            return '';
        }

        getCityCountryStr() {
            if (this.country == null || this.country == '')
                return (this.city || '');
            else
                return (this.city || '') + ", " + (this.country);
        }
    }

    class ProfileInfo extends Component {
        constructor({ item }) {
            super();
            this.state.item = item;
        }

        afterMount() {
            this.subscribeTo(this.getContainer().querySelector(".profile-main-info__more-info"), 'click', this.toggleFullInfo.bind(this));
        }

        toggleFullInfo() {
            const profileInfoFull = document.querySelector(".profile-info__full");
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

        renderFullName({ item }) {
            return `<div class="profile-main-info__name" title = "${item.first_name} ${item.last_name}">
                ${item.first_name} ${item.last_name}
            </div>`;
        }

        renderStatus({ item }) {
            return `<div class="profile-main-info__current-info" title = "${item.status || ''}">
                ${item.status || ''}
            </div>`;
        }

        renderInfoField(title, value) {
            if (value == '' || value == null)
                return '';
            else
                return `<div class="profile-info__title" title = "${title}">${title}</div>
                        <div class="profile-info__value" title = "${value}">${value}</div>`;
        }

        renderFullInfoButton() {
            return `<div class="profile-main-info__more-info">
                <a class="profile-main-info__more-info-link">
                    <span class="profile-main-info__more-label">Показать подробности</span>
                    <span class="profile-main-info__less-label">Скрыть подробности</span>
                </a>
            </div>`;
        }

        render(options, { item }) {
            return `<div class="page-block profile-main-info">
                    ${this.renderFullName({ item })}
                    ${this.renderStatus({ item })}
                    ${this.childrens.create(ProfileInfoShort, { item })}
                    ${this.renderFullInfoButton()}
                    ${this.childrens.create(ProfileInfoFull, { item })}
                    </div>`;
        }
    }

    class ProfileInfoShort extends Component {
        constructor({ item }) {
            super();
            this.state.item = item;
        }

        beforeMount() {
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

        render(options, { categories }) {
            return `<div class="profile-info profile-info__short">
                ${categories.map((item) => this.childrens.create(ProfileInfoCategory, item)).join('\n')}
                </div>`;
        }
    }

    class ProfileInfoFull extends Component {
        constructor({ item }) {
            super();
            this.state.item = item;
        }

        beforeMount() {
            this.setState({
                categories: [{
                    title: 'Контакты',
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

        render(options, { categories }) {
            return `<div class="profile-info profile-info__full" style="display: none;">
                ${categories.map((item) => this.childrens.create(ProfileInfoCategory, item)).join('\n')}
                </div>`;
        }
    }

    class ProfileInfoCategory extends Component {
        render({ title, fields }) {
            return `<div class="profile-info-category">
                        <div class="profile-info-category__title">${title}</div>
                        <div class="profile-info-category__fields">
                            ${fields.map(this.renderInfoField).join('\n')}
                        </div>
                    </div>`;
        }

        renderInfoField({ title = '', value = '' }) {
            return `<div class="profile-info__title" title = "${title}">${title}</div>
                        <div class="profile-info__value" title = "${value}">${value}</div>`;
        }

        getDefaultOptions() {
            return {
                title: '',
                fields: []
            }
        }
    }
    loadCss('css/profileInfo.css');
    const model = new ProfileInfoPersonModel({
        first_name: 'Рональд',
        last_name: 'Уизли',
        status: 'Статус статусов',
        gender: 1,
        bdate: '1917-06-01',
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

    const profileMainInfo = factory.create(ProfileInfo, { item: model });
    profileMainInfo.mount(document.body);

});