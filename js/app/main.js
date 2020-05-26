define([
    'ProfileInfo/Requestor',
    'Router'
], function (Requestor, Router) {
    'use strict';

    const url = new URL(window.location.href);

    //запрос на червер на получение данных текущего авторизованного пользователя
    Requestor.currentUser()
        .then(function (response) {
            //если авторизован
            if (response.ok) {
                //возврщаем полученные данные
                return response.json();
            } else {
                if (url.searchParams.has('authorization') || url.searchParams.has('creation')) {
                    Router.loadPage(url.search);
                } else {
                    Router.loadPage('?authorization');
                }
            }
        }).then(function (result) {
            if (result) {
                if (!url.search) {
                    Router.loadPage(`?page=${result.id}`, { curUserId: result.id, themeIndex: result.data.themeIndex });
                } else {
                    Router.loadPage(url.search, { curUserId: result.id, themeIndex: result.data.themeIndex });
                }
            }
        }).catch(error => console.log("error", error));

});
