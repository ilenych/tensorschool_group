define([
    'Base/Component',
    'ProfileInfo/Requestor',
    'ProfileInfo/ProfileInfoPersonModel',
    'css!Page/css/Authorization.css'
], function (Component, Requestor, ProfileInfoPersonModel) {

    class Creation extends Component {

        constructor(options) {
            super(options);
        }

        //создание аккаунта пользователя
        async create() {

            const form = document.forms.authorizationForm;

            //получение логина и пароля из формы
            const login = form.login.value;
            const password = form.password.value

            //формируем модель данных
            const formModel = new ProfileInfoPersonModel({
                first_name: form.first_name.value,
                last_name: form.last_name.value,
                gender: form.gender.value,
            });

            //запрос на сервер на создание аккааунта
            await Requestor.createUser({ login, password })
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log("error", error));

            //передаем модель на сервер
            await Requestor.updateUser(formModel)
                .then(function (response) {
                    if (!response.ok) {

                    } else {
                        return response.text()
                    }
                })
                .catch(error => console.log("error", error));

            location.search = "";
        }

        //после монитироавния
        afterMount() {
            //подписываемя на событие клика кнопки "создать"
            this.subscribeTo(this.getContainer().querySelector(".authorization__enterBtn"), 'click', this.create.bind(this));
        }

        render() {
            return `
                <div class="module authorization">
                    <div class="authorization__title">Создание аккаунта</div>
                    <form name="authorizationForm" class="authorization__form">
                        Логин:
                            <input name="login" maxlength="25">
                        Пароль:
                            <input name="password" type="password" maxlength="25" >
                        Имя:
                            <input name="first_name" maxlength="25">
                        Фамилия:
                            <input name="last_name" maxlength="25">
                        Пол:
                        <div><input name="gender" type="radio" value="1">Мужской
                            <input name="gender" type="radio" value="2">Женский</div>

                        <input class="authorization__enterBtn" type="button" value="Создать">

                        <a href="/?authorization" class="authorization__backLink" >Вернуться к странице авторизации</a>
                    </form>
            </div>`;
        }
    }

    return Creation;
});