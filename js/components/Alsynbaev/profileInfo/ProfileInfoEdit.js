define([
    'Base/Component',
    'ProfileInfo/ProfileInfoPersonModel',
    'ProfileInfo/Requestor',
    'css!ProfileInfo/css/ProfileInfoEdit.css'
], function (Component, ProfileInfoPersonModel, Requestor) {
    'use strict';

    class ProfileInfoEdit extends Component {

        constructor({ item }) {
            super();
            this.state.items = item;
        }

        renderGenderInput(num) {
            if (num == 1) {
                return `<div><input name="gender" type="radio" value="1" checked>Мужской
                <input name="gender" type="radio" value="2">Женский</div>`;
            } else if (num == 2) {
                return `<div><input name="gender" type="radio" value="1">Мужской
                <input name="gender" type="radio" value="2" checked>Женский</div>`;
            } else {
                return `<div><input name="gender" type="radio" value="1">Мужской
                <input name="gender" type="radio" value="2">Женский</div>`;
            }
        }

        renderRelationInput(num) {
            const relationStr = ["Не указан", "Не женат/Не замужем", "Есть подруга/Есть друг", "Влюблен/Влюблена", "Женат/Замужем", "В гражданском браке", "Все сложно"];
            let strOptions;

            for (let i = 0; i < relationStr.length; i++) {
                strOptions += `<option value="${i}" ${i == num ? 'selected' : ''}>${relationStr[i]}</option>`
            }
            return `<select name="relation">${strOptions}</select>`;
        }

        beforeMount() {
            this.setState({
                categories: [{
                    title: 'Основная информация',
                    fields: [{
                        title: 'Имя',
                        value: `<input name="first_name" value="${this.state.items.first_name || ''}">`
                    }, {
                        title: 'Фамилия',
                        value: `<input name="last_name" value="${this.state.items.last_name || ''}">`
                    }, {
                        title: 'Статус',
                        value: `<input name="status" value="${this.state.items.status || ''}">`
                    }, {
                        title: 'День рождения',
                        value: `<input name="bdate" type="date" value="${this.state.items.bdate || ''}">`
                    }, {
                        title: 'Пол',
                        value: this.renderGenderInput(this.state.items.gender || 0)
                    }, {
                        title: 'Город',
                        value: `<input name="city" value="${this.state.items.city || ''}">`
                    }, {
                        title: 'Страна',
                        value: `<input name="country" value="${this.state.items.country || ''}">`
                    }, {
                        title: 'Семейное положение',
                        value: this.renderRelationInput(this.state.items.relation || 0)
                    }
                    ]
                }, {
                    //Заголовок категории
                    title: 'Личная информация',
                    //Поля
                    fields: [
                        {
                            title: 'Курение',
                            value: `<input name="smoking" value="${this.state.items.smoking || ''}">`
                        }, {
                            title: 'Алкоголь',
                            value: `<input name="alcohol" value="${this.state.items.alcohol || ''}">`
                        }
                    ]
                }, {
                    title: 'Образование',
                    fields: [
                        {
                            title: 'Образование',
                            value: `<input name="education" value="${this.state.items.education || ''}">`
                        }
                    ]
                }, {
                    title: 'Работа',
                    fields: [
                        {
                            title: 'Место работы',
                            value: `<input name="work" value="${this.state.items.work || ''}">`
                        }
                    ]
                }, {
                    title: 'Деятельность',
                    fields: [
                        {
                            title: 'Деятельность',
                            value: `<textarea name="activities">${this.state.items.activities || ''}</textarea>`
                        }
                    ]
                }, {
                    title: 'Интересы',
                    fields: [
                        {
                            title: 'Интересы',
                            value: `<textarea name="interests">${this.state.items.interests || ''}</textarea>`
                        }, {
                            title: 'Любимая музыка',
                            value: `<textarea name="music">${this.state.items.music || ''}</textarea>`
                        }, {
                            title: 'Любимые телешоу',
                            value: `<textarea name="tv">${this.state.items.tv || ''}</textarea>`
                        }, {
                            title: 'Любимые книги',
                            value: `<textarea name="books">${this.state.items.books || ''}</textarea>`
                        }, {
                            title: 'Любимые игры',
                            value: `<textarea name="games">${this.state.items.games || ''}</textarea>`
                        }, {
                            title: 'Любимые фильмы',
                            value: `<textarea name="movies">${this.state.items.movies || ''}</textarea>`
                        }, {
                            title: 'Любимые цитаты',
                            value: `<textarea name="quotes">${this.state.items.quotes || ''}</textarea>`
                        }
                    ]
                }, {
                    title: 'О себе',
                    fields: [
                        {
                            title: 'О себе',
                            value: `<textarea name="about">${this.state.items.about || ''}</textarea>`
                        }
                    ]
                }, {
                    title: 'Контакты',
                    fields: [
                        {
                            title: 'Телефон',
                            value: `<input name="phone" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value="${this.state.items.phone || ''}">`
                        }, {
                            title: 'Почта',
                            value: `<input name="email" type="email" value="${this.state.items.email || ''}">`
                        }
                    ]
                }]
            });
        }

        afterMount() {
            this.subscribeTo(this.getContainer().querySelector(".profile-info-edit__saveBtn"), 'click', this.saveInfo.bind(this));
        }

        saveInfo() {
            const form = document.forms.profileInfoEditForm;

            const formModel = new ProfileInfoPersonModel({
                first_name: form.first_name.value,
                last_name: form.last_name.value,
                status: form.status.value,
                gender: form.gender.value,
                bdate: form.bdate.value,
                city: form.city.value,
                country: form.country.value,
                phone: form.phone.value,
                email: form.email.value,
                relation: form.relation.value,
                education: form.education.value,
                work: form.work.value,
                alcohol: form.alcohol.value,
                smoking: form.smoking.value,
                interests: form.interests.value,
                music: form.music.value,
                activities: form.activities.value,
                movies: form.movies.value,
                tv: form.tv.value,
                books: form.books.value,
                games: form.games.value,
                about: form.about.value,
                quotes: form.quotes.value,
            });

            Requestor.updateUser(formModel)
                .then(function (response) {
                    if (!response.ok) {

                    } else {
                        return response.text()
                    }
                }).then(function (result) {
                    location.reload();
                })
                .catch(error => console.log("error", error));

        }

        render(options, { categories }) {
            let infoRender = categories.map((item) => this.childrens.create(ProfileInfoCategoryEdit, item)).join('');

            return `<div class="profile-info-edit">
                                    <form name="profileInfoEditForm">
                                        ${infoRender}
                                        <input class="profile-info-edit__saveBtn" type="button" value="Сохранить">
                                    </form>
                </div>`;
        }
    }


    /**
     * Подмодуль для рендера катеогрий
     */
    class ProfileInfoCategoryEdit extends Component {
        /**
         * Рендер подмодуля
         * @param {*} - title - заголовок поля, fiels - массив с полями {title- заголовок поля, value - значение поля}
         */
        render({ title, fields }) {
            const fieldsRender = fields.map(this.renderInfoEditField).join('');

            if (fieldsRender) {
                return `<div class="profile-info-category-edit">
                                        <div class="profile-info-category-edit__title">${title}</div>

                                        <div class="profile-info-category-edit__fields">
                                            ${fieldsRender}
                                        </div>
                                    </div>`;
            } else {
                return '';
            }
        }

        /**
         * Рендер поля категории
         * @param {*} title - заголовок поля, value - значение поля
         */
        renderInfoEditField({ title = '', value = '' }) {
            if (value == '') {
                return '';
            } else
                return `<div class="profile-info__title" title="${title}">${title}</div>
                                    ${value}`;
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

    return ProfileInfoEdit;
});
