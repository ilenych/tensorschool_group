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
    'MessagesInfo',
    'Base/Theme',
    'Adressee',
    'css!Page/css/Page.css'
], function (Component, Header, ProfileInfo, Wall, CreatePost, ProfilePic, Messages, Gallery, Friends, FriendsAction, PhotoInfo, MessagesInfo, Theme, Adressee) {

    'use strict';

    class Page extends Component {

        constructor(options) {
            super(options);
            this.state.id = options.id || options.options.curUserId;
            this.state.curUserId = options.options.curUserId;
            Theme.changeTheme(options.options.themeIndex || 0);
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
                                ${(this.state.curUserId == this.state.id) ? this.childrens.create(PhotoInfo, { id: this.state.id }) : ''}
                                ${(this.state.curUserId == this.state.id) ? this.childrens.create(Friends, { curUserId: this.state.curUserId }) : ''}
                                ${this.childrens.create(MessagesInfo, { id: this.state.id, curUserId: this.state.curUserId })}
                                ${(this.state.curUserId == this.state.id) ? this.childrens.create(Adressee) : ''}
                            </div>
                        </div>
                    </div>`;
        }
    }

    return Page;
});
