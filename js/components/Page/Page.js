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
        render() {
            return `<div class="page">
                        ${this.childrens.create(Header)}
                        <div class="content">
                            <div class="content__main-column">
                                <div class="module">
                                    ${this.childrens.create(ProfileInfo)}
                                </div>
                                    ${this.childrens.create(Wall)}
                                <div class="module">
                                    //модуль в 1 колонке
                                </div>
                            </div>

                            <div class="content__secondary-column">
                                <div class="module">
                                    ${this.childrens.create(ProfilePic)}
                                </div>
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
