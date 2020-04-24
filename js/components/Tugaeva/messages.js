define([
    'Base/Component',
    'css!Messages/css/style.css'
], function(Component) {
    class Messages extends Component {
        render() {
            return `
        <div class="messages" title="Сообщения">
            <p class="messages__title">Сообщения</p>
            <div class="message clear">
                <div class="message__picture">
                    <img class="picture picture_userpic" src="./js/components/Tugaeva/messages/img/miranda.jpg" alt="User Name">
                </div>
                <div class="message__body">
                    <p class="message__sender">User Name</p>
                    <p class="message__time">14:39</p>
                    <p class="message__content">Милый, я соскучилась! Когда на охоту? Не забудь покормить собачек</p>
                </div>                                
            </div>
            <div class="message clear">
                <div class="message__picture">
                    <img class="picture picture_userpic" src="./js/components/Tugaeva/messages/img/jon_snow.jpg" alt="User Name">
                </div>
                <div class="message__body">
                    <p class="message__sender">User Name</p>
                    <p class="message__time">14:36</p>
                    <p class="message__content">Верни мне Север, жалкий бастард!!!!! Мои предки жили в этом замке веками, а ты убил моих родных и опорочил мою сестру!!! Моё войско уже на подходе, живым ты оттуда не уйдешь...</p>
                </div>                                
            </div>
            <div class="message clear">
                <div class="message__picture">
                    <img class="picture picture_userpic" src="./js/components/Tugaeva/messages/img/miranda.jpg" alt="User Name">
                </div>
                <div class="message__body">
                    <p class="message__sender">User Name</p>
                    <p class="message__time">10:00</p>
                    <p class="message__content">Милый, я соскучилась! Когда на охоту? Не забудь покормить собачек</p>
                </div>                                
            </div>
        </div>
            `;
        }
    }

    return Messages;
});