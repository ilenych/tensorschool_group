define([
    'Base/Component',
    'Header/HeaderPersonModel',
    'ProfileInfo/ProfileInfoEdit',
    'ProfileInfo/Window',
    'ProfileInfo/Requestor',
    'ProfileInfo/View',
    'ProfileInfo/DataSet',
    'ProfileInfo/ProfileInfoPersonModel',
    'css!Header/css/header.css'
], function (Component, HeaderPersonModel, ProfileInfoEdit, Window, Requestor, View, DataSet, ProfileInfoPersonModel) {
    'use strict';

    class Header extends Component {

        constructor(options) {
            super(options);
            this.state.id = options.id;
            this.state.item = options.item;
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
            this.subscribeTo(this.getContainer().querySelector(".header__profile-edit"), 'click', this.createWindow.bind(this));
            this.subscribeTo(this.getContainer().querySelector(".header__profile-exit"), 'click', this.logout.bind(this));

            const image = this.getContainer().querySelector(".header__profile-avatar");
            this.subscribeTo(image, "error", this.onErrorLoadImage.bind(this, image));
        }

        onErrorLoadImage(image) {
            image.src = "img/nophoto.jpg";
        }

        logout() {
            Requestor.logout().then(
                response => {
                    response.ok ? location.reload() : alert(response.text())
                });
        }

        //создать окно редактирования
        createWindow() {

            Requestor.currentUser().then(response => response.text()).then(result => {
                console.log(result);
            });

            const window = this.childrens.create(Window, {
                title: 'Редактировать',
                content: this.childrens.create(View, {
                    dataSet: this.childrens.create(DataSet, {
                        object: 'user',
                        model: ProfileInfoPersonModel
                    }),
                    comp: ProfileInfoEdit,
                    id: 'current'
                })
            });
            window.mount(document.body);
        }

        render(options, state) {
            return `
                <header class="header">
                    <nav class="header__nav">
                        <p class="header__activity">
                            ${state.item.getActivity()}
                        </p>
                        <a class="header__profile-edit">Редактировать</a>
                        <a class="header__profile-menu" href="${location.pathname}">
                            <img class="header__profile-avatar header__profile-avatar_mini" src="https://tensor-school.herokuapp.com/user/photo/${state.id}" alt="avatar">
                            <span class="header__profile-button">&#8942;</span>
                        </a>

                        <a class="header__profile-exit" style="cursor: pointer;color: #ccc;">ВЫЙТИ</a>
                    </nav>
                </header>
            `;
        }

    }

    return Header;
});