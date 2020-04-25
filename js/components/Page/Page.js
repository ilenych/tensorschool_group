define([
    'Base/Component',
    'Header',
    'ProfileInfo',
    'Wall',
    'ProfilePic',
    'Messages',
    'css!Page/css/Page.css'
], function (Component, Header, ProfileInfo, Wall, ProfilePic, Messages) {
    'use strict';

    class Page extends Component {

        constructor(options) {
            super(options);
        }

        render() {
            return `<div class="page">
                        ${this.childrens.create(Header)}
                        <div class="content">
                            <div class="content__main-column">
                                ${this.childrens.create(ProfileInfo, { object: 'user/read', id: '22' })}
                                <div class="module">
                                    <div class="gallery">
                                        <div class="gallery__photo">
                                            <img src="img/1.jpg" alt="" class="page__image page__image__rounded">
                                        </div>
                                        <div class="gallery__photo">
                                            <img src="img/3.jpg" alt="" class="page__image page__image__rounded">
                                        </div>
                                        <div class="gallery__photo">
                                            <img src="img/5.jpg" alt="" class="page__image page__image__rounded">
                                        </div>
                                        <div class="gallery__photo">
                                            <img src="img/4.jpg" alt="" class="page__image page__image__rounded">
                                        </div>
                                    </div>
                                </div>
                                ${this.childrens.create(Wall)}
                            </div>

                            <div class="content__secondary-column">
                                <div class="module">
                                    <div class="profile-photo">
                                        <img class="page__image page__image__rounded" src="img/1.jpg">
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    </div>`;
        }
    }

    return Page;
});
