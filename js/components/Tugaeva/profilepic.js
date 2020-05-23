define([
    'Base/Component',
    'ProfileInfo/Window',
    'css!ProfilePic/css/style.css'
], function (Component, Window) {
    class ProfilePic extends Component {

        constructor(options) {
            super(options);
            this.state.id = options.id;
        }

        afterMount() {
            const image = this.getContainer().querySelector(".picture_profile");
            this.subscribeTo(image, "click", this.onPhotoClick.bind(this));
        }

        renderPhoto() {
            return `<img onerror="this.src='img/nophoto.jpg'" style="cursor: pointer" class="picture picture_profile" src="https://tensor-school.herokuapp.com/user/photo/${this.state.id}" alt="Фото профиля">`;
        }

        onPhotoClick() {
            const window = this.childrens.create(Window, { title: '', content: this.renderPhoto() });
            window.mount(document.body);
        }

        render(options, state) {
            return `<div>
                    ${this.renderPhoto()}
                </div>
            `;
        }
    }

    return ProfilePic;
});