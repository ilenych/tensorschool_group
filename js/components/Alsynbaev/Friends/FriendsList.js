define([
    'Base/Component',
    'css!Friends/css/FriendsList.css'
], function (Component) {

    'use strict';
    class FriendsList extends Component {

        constructor(options) {
            super(options);
            this.state.curUserId = options.curUserId;
            this.friendList = options.friendList;
            this.sendRequests = options.sendRequests;
            this.requests = options.requests;
            this.friends = options.friends;
            this.subscribers = options.subscribers;
        }

        renderUser(title, data) {
            return `<div class="friendsList__title">${title}</div>
            <div class="friendsList__friends">
            ${data.map(user => {

                let name = (user.data.first_name || '') + " " + (user.data.last_name || '');

                if (name == " ")
                    name = user.data.name || 'Неизвестно';

                return `<a class="friendsList__linkImage" href="${location.pathname}?page=${user.id}">
                            <img class="page__image friendsList__image" onerror="this.src='img/nophoto.jpg'" src="https://tensor-school.herokuapp.com/user/photo/${user.id}">
                        </a>
                        <div class="friendsList__name">
                            <a class="friendsList__linkName" href="${location.pathname}?page=${user.id}">
                                ${name}
                            </a>
                        </div>`;
            }).join('')}
                
            </div>
        `;
        }

        renderFriends() {
            return `${(this.sendRequests.length != 0) ? this.renderUser(`Отправленные заявки в друзья <span class="friends__count">${this.sendRequests.length}</span>`, this.sendRequests) : ''}
            ${(this.requests.length != 0) ? this.renderUser(`Заявки в друзья <span class="friends__count">${this.requests.length}</span>`, this.requests) : ''}
                ${(this.friends.length != 0) ? this.renderUser(`Друзья <span class="friends__count">${this.friends.length}</span>`, this.friends) : ''}
                ${(this.subscribers.length != 0) ? this.renderUser(`Подписчики <span class="friends__count">${this.subscribers.length}</span>`, this.subscribers) : ''}           
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