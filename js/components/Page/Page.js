define([
    'Base/Component',
    'Header',
    'ProfileInfo',
    'Wall',
    'CreatePost',
    'ProfilePic',
    'Messages',
    'Gallery',
    'Friends',
    'Friends/FriendsAction',
    'PhotoInfo',
    'css!Page/css/Page.css'
], function (Component, Header, ProfileInfo, Wall, CreatePost, ProfilePic, Messages, Gallery, Friends, FriendsAction, PhotoInfo) {
    'use strict';

    class Page extends Component {

        constructor(options) {
            super(options);
            this.state.id = options.id || options.options.curUserId;
            this.state.curUserId = options.options.curUserId;
        }

        render() {
            return `<div class="page">
                        ${this.childrens.create(Header, { id: this.state.curUserId })}
                        <div class="content">
                            <div class="content__main-column">
                                ${this.childrens.create(ProfileInfo, { id: this.state.id })}
                                ${this.childrens.create(Gallery, { id: this.state.id })}
                                ${this.childrens.create(CreatePost, { id: this.state.curUserId })}
                                ${this.childrens.create(Wall, { id: this.state.id, curId: this.state.curUserId })}
                            </div>

                            <div class="content__secondary-column">
                                <div class="module">
                                    ${this.childrens.create(ProfilePic, { id: this.state.id })}
                                </div>
                                ${(this.state.curUserId != this.state.id) ? this.childrens.create(FriendsAction, { id: this.state.id, curUserId: this.state.curUserId }) : ''}
                                ${this.childrens.create(PhotoInfo, { id: this.state.id })}
                                <div class="module">
                                    <!--Модуль ссылок-->
                                    <div class="page-links">
                                        <div class="page-links__link">
                                            <div class="page-links__image-link">
                                                <img src="img/ui/link1.png" alt="" class="page-links__image">
                                            </div>
                                            <div class="page-links__title">
                                                Поклонники
                                            </div>
                                        </div>
                                        <div class="page-links__link">
                                            <div class="page-links__image-link">
                                                <img src="img/ui/link2.png" alt="" class="page-links__image">
                                            </div>
                                            <div class="page-links__title">
                                                Интересное
                                            </div>
                                        </div>
                                        <div class="page-links__link">
                                            <div class="page-links__image-link">
                                                <img src="img/ui/link3.png" alt="" class="page-links__image">
                                            </div>
                                            <div class="page-links__title">
                                                Друзья
                                            </div>
                                        </div>
                                        <div class="page-links__link">
                                            <div class="page-links__image-link">
                                                <img src="img/ui/link4.png" alt="" class="page-links__image">
                                            </div>
                                            <div class="page-links__title">
                                                Видосы
                                            </div>
                                        </div>
                                        <div class="page-links__link">
                                            <div class="page-links__image-link">
                                                <img src="img/ui/link5.png" alt="" class="page-links__image">
                                            </div>
                                            <div class="page-links__title">
                                                Фотки
                                            </div>
                    
                                        </div>
                                        <div class="page-links__link">
                                            <div class="page-links__image-link">
                                                <img src="img/ui/link6.png" alt="" class="page-links__image">
                                            </div>
                                            <div class="page-links__title">
                                                Музыка
                                            </div>
                                        </div>
                                    </div>
                                </div>
                
                                ${(this.state.curUserId == this.state.id) ? this.childrens.create(Friends, { curUserId: this.state.curUserId }) : ''}
                                <div class="module">
                                    ${this.childrens.create(Messages)}
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    }

    return Page;
});
