define([
    'Base/Component',
    'css!ProfilePic/css/style.css'
], function (Component) {
    class ProfilePic extends Component {
        render () {
            return `
                <img class="picture picture_profile" src="./js/components/Tugaeva/profilepic/img/ygritte.jpg" alt="Name Surname">
            `;
        }
    }

    return ProfilePic;
});