define([
    'Base/Component',
    'css!ProfilePic/css/style.css'
], function (Component) {
    class ProfilePic extends Component {

        constructor(options) {
            super(options);
            this.state.id = options.id;
        }

        afterMount() {
            const image = this.getContainer().querySelector(".picture_profile");
            this.subscribeTo(image, "error", this.onErrorLoadImage.bind(this, image));
        }

        onErrorLoadImage(image) {
            image.src = "img/nophoto.jpg";
        }

        render(options, state) {
            return `<div>
                    <img class="picture picture_profile" src="https://tensor-school.herokuapp.com/user/photo/${state.id}" title="Name Surname" alt="Name Surname">
                </div>
            `;
        }
    }

    return ProfilePic;
});