define([
    'Base/Component',
    'ProfileInfo/Requestor',
    'ProfileInfo/ProfileInfoPersonModel',
    'css!Adressee/css/Addressee.css'
], function (Component, Requestor, ProfileInfoPersonModel) {

    'use strict';
    class Addressee extends Component {
        constructor(options) {
            super(options);
            this.addressees = null;

            this.loadData();
        }

        async loadData() {
            let response = await Requestor.getMessageAddresseList();
            let addresseeList = await response.json();

            this.addressees = addresseeList.messages.sort((a, b) => {
                return a.id - b.id;
            });

            this.update();
        }

        renderAdressee(addressee) {

            let author;

            try {
                author = new ProfileInfoPersonModel({ ...addressee.data, ...addressee.computed_data, id: addressee.id });
            } catch (ex) {
                return '';
            }

            return `<div class="addressee__addressee">
            <a href="${location.pathname}?page=${author.id}">
            <img onerror="this.src='img/nophoto.jpg'" style="cursor: pointer" class="addressee__user-image" src="https://tensor-school.herokuapp.com/user/photo/${author.id}">
            </a>
            <a href="${location.pathname}?page=${author.id}" class="addressee__linkName">
                <div class="addressee__user-name">
                    ${author.getName()}
                </div>
            </a>
            </div>`;
        }

        renderContent() {
            return `<div class="addressee__title">Список адресатов</div>
            <div class="addressee__content">
            ${this.addressees.map(addressee => {
                return this.renderAdressee(addressee);
            }).join('') || 'Нет адресатов'}
            </div>`;
        }

        update() {
            this.getContainer().innerHTML = this.renderContent();
        }

        render(options, state) {
            return `<div class="module addressee">
                Загрузка..
            </div>`
        }
    }

    return Addressee;
});