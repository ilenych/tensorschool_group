define([
    'Base/Component',
    'ProfileInfo/Requestor',
    'css!Page/css/Authorization.css'
], function (Component, Requestor) {

    class Authorization extends Component {

        constructor(options) {
            super(options);
        }

        //авторизация 
        async authorize() {
            //получение логина и пароля из формы
            const login = document.forms.authorizationForm.login.value;
            const password = document.forms.authorizationForm.password.value;

            //запрос на сервер для авторизации по логину и паролю
            await Requestor.login({ login, password })
                .then(result => console.log(result))
                .catch(error => console.log("error", error));

            //перезагружем страницу
            location.reload();
        }

        //создание аккаунта пользователя
        async create() {
            //получение логина и пароля из формы
            const login = document.forms.authorizationForm.login.value;
            const password = document.forms.authorizationForm.password.value;

            //запрос на сервер на создание аккааунта
            await Requestor.createUser({ login, password })
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log("error", error));

            // перезагружем страницу
            location.reload();
        }

        //после монитироавния
        afterMount() {

            //подписываемя на событие клика кнопки "войти"
            this.subscribeTo(this.getContainer().querySelector(".authorization__enterBtn"), 'click', this.authorize.bind(this));
            //подписываемя на событие клика кнопки "создать"
            this.subscribeTo(this.getContainer().querySelector(".authorization__createBtn"), 'click', this.create.bind(this));
        }

        render() {
            return `
                <div class="module authorization">
                    <div class="authorization__title">Авторизация</div>
                    <form name="authorizationForm" class="authorization__form">
                        Логин:
                            <input name="login" maxlength="25">
                        Пароль:
                            <input name="password" type="password" maxlength="25" >
                        <input class="authorization__enterBtn" type="button" value="Войти">
                        Нет аккаунта?
                        <input class="authorization__createBtn" type="button" value="Создать">
                    </form>
            </div>`;
        }
    }

    return Authorization;
});