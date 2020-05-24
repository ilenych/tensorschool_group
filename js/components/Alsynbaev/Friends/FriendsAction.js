define([
    'Base/Component',
    'ProfileInfo/Requestor',
    'css!Friends/css/Friends.css'
], function (Component, Requestor) {

    'use strict';
    class FriendsAction extends Component {
        constructor(options) {
            super(options);
            this.state.id = options.id;
            this.state.curUserId = options.curUserId;
            this.user_link = null;
            this.loadData();
        }

        async loadData() {
            let response = await Requestor.getUserLinks();
            let user_links = await response.json();

            for (let i = 0; i < user_links.user_links.length; i++) {
                const link = user_links.user_links[i];

                if (link.user_from == this.state.id || link.user_to == this.state.id) {
                    this.user_link = link;
                    break;
                }
            }

            this.update();
        }

        renderContent() {
            let renderAction = '';

            if (!this.user_link) {
                renderAction = `
                <div class=" friendsAction__button friendsAction__button--add">
                    Добавить в друзья
                </div>`;
            } else {
                if (this.user_link.type == "friend") {
                    renderAction = `
                    <div class="friendsAction__title">У вас в друзьях</div>
                    <div class="friendsAction__button friendsAction__button--remove">
                        Убрать из друзей
                    </div>`;
                }

                if (this.user_link.type == "subscriber" && this.user_link.user_from == this.state.id && this.user_link.user_to == this.state.curUserId) {
                    renderAction = `
                    <div class="friendsAction__title">У вас в подписчиках</div>
                    <div class=" friendsAction__button friendsAction__button--add">
                        Добавить в друзья
                    </div>`;
                }

                if ((this.user_link.type == "subscriber" || this.user_link.type == "friendship_request") && this.user_link.user_from == this.state.curUserId && this.user_link.user_to == this.state.id) {
                    renderAction = `
                    <div class="friendsAction__title">Заявка отправлена</div>
                    <div class="friendsAction__button friendsAction__button--remove">
                        Отменить
                    </div>`;
                }

                if (this.user_link.type == "friendship_request" && this.user_link.user_from == this.state.id && this.user_link.user_to == this.state.curUserId) {
                    renderAction = `
                    <div class="friendsAction__title">В заявках в друзья</div>
                    <div class="friendsAction__button friendsAction__button--add">
                        Добавить в друзья
                    </div>
                    <div class="friendsAction__button friendsAction__button--remove">
                        Оставить в подписчиках
                    </div>
                `;
                }
            }

            return `<div class="friendsAction">
                ${renderAction}
            </div>`
        }

        update() {
            this.getContainer().innerHTML = this.renderContent();
            this.afterUpdate();
        }

        afterUpdate() {
            const buttonAdd = document.querySelector('.friendsAction__button--add');

            if (buttonAdd)
                this.subscribeTo(buttonAdd, 'click', this.addFriend.bind(this));

            const buttonRemove = document.querySelector('.friendsAction__button--remove');

            if (buttonRemove)
                this.subscribeTo(buttonRemove, 'click', this.removeFriend.bind(this));
        }

        async addFriend() {
            if (!this.user_link) {

                const UserLinkType = [
                    'friend',
                    'subscriber',
                    'friendship_request'
                ]

                let response = await Requestor.createUserLink(parseInt(this.state.id), UserLinkType[2]);
                let user_link = await response.json();
                this.user_link = user_link;
            } else {
                if (this.user_link.type == "subscriber" || this.user_link.type == "friendship_request") {
                    let response = await Requestor.updateUserLink(this.user_link.id, this.user_link.user_to, 'friend');
                    let user_link = await response.json();
                    this.user_link = user_link;
                }
            }

            this.update();
        }

        async removeFriend() {
            if (this.user_link.type == "friend" || (this.user_link.type == "friendship_request" && this.user_link.user_from == this.state.id)) {
                let response = await Requestor.updateUserLink(this.user_link.id, this.user_link.user_to, 'subscriber');
                let user_link = await response.json();
                this.user_link = user_link;
            }

            if ((this.user_link.type == "friendship_request" || this.user_link.type == "subscriber") && this.user_link.user_from == this.state.curUserId) {
                let response = await Requestor.deleteUserLink(this.user_link.user_to);
                if (response.ok)
                    this.user_link = null;
            }

            this.update();
        }

        render(options, state) {
            return `<div class="module">
                Загрузка..
            </div>`
        }
    }

    return FriendsAction;
});