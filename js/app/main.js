define([
    'ProfileInfo/Requestor',
], function (Requestor) {
    'use strict';

    //запрос на червер на получение данных текущего авторизованного пользователя
    Requestor.currentUser()
        .then(function (response) {
            //если авторизован
            if (response.ok) {
                //возврщаем полученные данные
                return response.json();
            } else {
                //если нет, загружаем страницу авторизации
                require([
                    'Page/Authorization'
                ], function (Authorization) {
                    'use strict';
                    const autorization = factory.create(Authorization);
                    autorization.mount(document.body);
                });
            }
        }).then(function (result) {
            if (result) {
                //загружаем основную страницу
                require([
                    'Page/Page'
                ], function (Page) {
                    'use strict';
                    const page = factory.create(Page, {
                        id: result.id // id авторизованного подльзователя
                    });
                    page.mount(document.body);
                });
            }
        }).catch(error => console.log("error", error));

});
