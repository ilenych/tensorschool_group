define([
    'Base/Component',
    'css!ProfilePic/css/style.css'
], function (Component) {
    class ProfilePic extends Component {
        render () {
            return `
                <img class="picture picture_profile" src="img/post/newUser.png" title="Name Surname" alt="Name Surname">
            `;
        }
    }

    return ProfilePic;
});