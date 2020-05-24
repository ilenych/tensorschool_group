define([
    'Base/Component',
    'css!Friends/css/FriendsList.css'
], function (Component) {

    'use strict';
    class FriendsList extends Component {

        constructor(options) {
            super(options);
            this.friendList = options.friendList;
        }

        renderUser(title, data) {

            return `<div class="friendsList__title">${title}</div>
            <div class="friendsList__friends">
            ${data.map(user => {
                return `<a class="friendsList__linkImage" href="${location.pathname}?page=${user.id}">
                            <img class="page__image friendsList__image" onerror="this.src='img/nophoto.jpg'" src="https://tensor-school.herokuapp.com/user/photo/${user.id}">
                        </a>
                        <div class="friendsList__name">
                            <a class="friendsList__link" href="${location.pathname}?page=${user.id}">
                                ${user.data.name || 'Неизвестно'}
                            </a>
                        </div>`;
            }).join('')}
                
            </div>
        `;
        }

        renderFriends() {
            let requests = [];
            let friends = [];
            let subscribers = [];

            for (let friendData of this.friendList) {
                if (friendData.user_link.type == "friendship_request")
                    requests.push(friendData);

                if (friendData.user_link.type == "friend")
                    friends.push(friendData);

                if (friendData.user_link.type == "subscriber")
                    subscribers.push(friendData);
            }

            return `${(requests.length != 0) ? this.renderUser(`Заявки в друзья <span class="friends__count">${requests.length}</span>`, requests) : ''}
                ${(friends.length != 0) ? this.renderUser(`Друзей <span class="friends__count">${friends.length}</span>`, friends) : ''}
                ${(subscribers.length != 0) ? this.renderUser(`Подписчики <span class="friends__count">${subscribers.length}</span>`, subscribers) : ''}           
            `;
        }

        render(options, state) {
            return `<div class="friendsList">
                ${this.renderFriends()}
            </div>`
        }
    }

    return FriendsList;
});