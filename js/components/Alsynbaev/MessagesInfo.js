define([
    'Base/Component',
    'ProfileInfo/Requestor',
    'ProfileInfo/ProfileInfoPersonModel',
    'css!MessagesInfo/css/MessagesInfo.css'
], function (Component, Requestor, ProfileInfoPersonModel) {

    'use strict';
    class MessagesInfo extends Component {
        constructor(options) {
            super(options);
            this.state.id = options.id;
            this.state.curUserId = options.curUserId;
            this.messages = null;

            this.loadData();
        }

        async loadData() {
            let response = await Requestor.getMessageList(this.state.id);
            let messageList = await response.json();
            this.messages = messageList.messages.sort((a, b) => {
                return a.id - b.id;
            });
            this.update();
        }

        renderMessage(message) {
            String.prototype.replaceAll = function (search, replacement) {
                var target = this;
                return target.split(search).join(replacement);
            };

            let author;

            try {
                author = JSON.parse(message.author.replaceAll(`'`, `"`));
                author = new ProfileInfoPersonModel({ ...author.data, ...author.computed_data, id: author.id });
            } catch (ex) {
                return '';
            }

            return `<div class="messages__message">
            <a href="${location.pathname}?page=${author.id}">
            <img onerror="this.src='img/nophoto.jpg'" style="cursor: pointer" class="messages__user-image" src="https://tensor-school.herokuapp.com/user/photo/${author.id}">
            </a>
            <a href="${location.pathname}?page=${author.id}" class="messages__linkName">
                <div class="messages__user-name">
                    ${author.getName()}

                    <!--<div class="messages__message-time">
                        вчера 21:22
                    </div>-->
                </div>
            </a>
                <div class="messages__message-text">
                    ${message.message}
                </div>
            </div>`;
        }

        renderContent() {
            return `<div class="messages__title">Сообщения</div>
            <div class="messages__content">
            ${this.messages.map(message => {
                return this.renderMessage(message);
            }).join('') || 'Нет сообщений'}
            </div>
            <div class="messages__send">
                <textarea class="messages__input"></textarea> <div class="messages__sendBtn">Отправить</div>
            </div>`;
        }

        update() {
            this.canClick = true;
            this.getContainer().innerHTML = this.renderContent();
            this.afterUpdate();
        }

        afterUpdate() {
            const messagesSendBtn = document.querySelector('.messages__sendBtn');
            this.subscribeTo(messagesSendBtn, 'click', this.sendMessage.bind(this));

            const messagesMessage = document.querySelector('.messages__content');
            messagesMessage.scrollTop = messagesMessage.scrollHeight;
        }

        async sendMessage() {
            if (this.canClick) {
                this.canClick = false;
                const messagesInput = document.querySelector('.messages__input');
                let response = await Requestor.createMessage(0, this.state.curUserId, this.state.id, messagesInput.value, '');
                let message = await response.json();

                await this.loadData();
            }

        }

        render(options, state) {
            return `<div class="module messages">
                Загрузка..
            </div>`
        }
    }

    return MessagesInfo;
});