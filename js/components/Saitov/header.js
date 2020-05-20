define([
    'Base/Component',
    'Header/HeaderPersonModel',
    'css!Header/css/header.css'
], function (Component, HeaderPersonModel) {
    'use strict';

    class Header extends Component {

        constructor({ item }) {
            super({ item });
            this.state.item = item;
        }

        beforeMount() {
            if (this.state.item === undefined) {
                this.state.item = new HeaderPersonModel({
                    online: true,
                    lastActivity: new Date(2020, 3, 17, 16, 30),
                    photoUrl: 'img/post/newUser.png',
                });
            }
        }

        afterMount() {
            this.subscribeTo(this.getContainer().querySelector(".header__profile-edit"), 'click', this.onClickHandler);
            this.subscribeTo(this.getContainer().querySelector(".header__profile-button"), 'click', this.onLClickButton);
        }

        /* 
         * Обработчик нажатия кнопки в шапке
         * Будет передавать родителю информацию о срабатывании события
         */
        onClickHandler() {

        }

        render(options, { item }) {
            return `
                <header class="header">
                    <nav class="header__nav">
                        <p class="header__activity">
                            ${this.state.item.getActivity()}
                        </p>
                        <a class="header__profile-menu" href="#">
                            <img class="header__profile-avatar header__profile-avatar_mini" src="${this.state.item.getPhotoUrl()}" alt="avatar">
                            <span class="header__profile-button">&#8942;</span>
                        </a>

                        <a style="cursor: pointer;color: #ccc;" onclick="fetch('https://tensor-school.herokuapp.com/user/logout', {credentials: 'include'}).then(response => {console.log(response.text()); response.ok?location.reload():alert(response.text())});">ВЫЙТИ</a>
                    </nav>
                </header>
            `;
        }

    }

    return Header;
});