define([
    'Base/Component',
    'Friends/FriendsList',
    'ProfileInfo/Window',
    'ProfileInfo/Requestor',
    'css!Friends/css/Friends.css'
], function (Component, FriendsList, Window, Requestor) {

    'use strict';
    class Friends extends Component {
        constructor(options) {
            super(options);
            this.loadData();
        }

        async loadData() {
            let response = await Requestor.getUserLinks();
            let user_links = await response.json();

            this.friendList = [];

            for (let link of user_links.user_links) {
                let response = await Requestor.readUser(link.user_from);
                let info = await response.json();
                this.friendList.push({ ...info, user_link: link });
            }

            this.update();
        }

        renderFriends() {
            let freiendsRender = '';
            let i = 0;

            for (let friendData of this.friendList) {
                if (i >= 6)
                    break;

                if (friendData.user_link.type == "friend") {

                    let name = (friendData.data.first_name || '') + " " + (friendData.data.last_name || '');

                    if (name == " ")
                        name = friendData.data.name || 'Неизвестно';

                    freiendsRender +=
                        `<a class="friends__friend" href="${location.pathname}?page=${friendData.id}">
                        <img class="page__image friends__image" onerror="this.src='img/nophoto.jpg'" src="https://tensor-school.herokuapp.com/user/photo/${friendData.id}">
                        <p class="friends__name">${name}</p>
                    </a>`;
                    i++;
                }
            }

            if (!freiendsRender)
                freiendsRender = "Нет друзей";

            return `<div class="friends">
            <div class="friends__title">Друзья <span class="friends__count">${this.friendList.length}</span></div>
            <div class="friends__friends">
                ${freiendsRender}
            </div>
        </div>`;
        }
        update() {
            this.getContainer().innerHTML = this.renderFriends();
            this.afterUpdate();
        }

        createFriendsListWindow() {
            const window = this.childrens.create(Window, {
                title: 'Друзья',
                content: this.childrens.create(FriendsList, {
                    friendList: this.friendList
                })
            });
            window.mount(document.body);
        }

        afterUpdate() {
            const friendsTitle = document.querySelector('.friends__title');
            this.subscribeTo(friendsTitle, 'click', this.createFriendsListWindow.bind(this));
        }

        render(options, state) {
            return `<div class="module">
                Загрузка..
            </div>`
        }
    }

    return Friends;
});