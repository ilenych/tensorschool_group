define([
    'Page/Header',
    'Base/Component',
    'ProfileInfo',
    'Post',
    'ProfilePic',
    'Messages',
    'css!Page/css/Page.css'
], function (Header, Component, ProfileInfo, Post, ProfilePic, Messages) {
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
                                <div class="module">gallery</div>
                                <div class="module">
                                    ${this.childrens.create(Post)}
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
