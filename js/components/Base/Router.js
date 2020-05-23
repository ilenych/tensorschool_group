define([
], function () {

    //маршрутизатор
    class Router {

        constructor() {
            //маршруты и путь до компонента, который будет загружен
            this.routes = {
                'page': 'Page/Page',
                'authorization': 'Page/Authorization',
                'creation': 'Page/Creation',
                '404': 'Page/404Page'
            };
        }

        //попытаться загрузить страницу
        tryLoadPage(urlParams, options) {
            for (let key of urlParams.keys()) {
                //если есть маршрут с ключем url
                if (this.routes[key]) {
                    //загружаем компонент
                    this.loadComponent({ component: this.routes[key], id: urlParams.get(key) || '', options });
                    return true;
                }
            }

            return false;
        }

        //перейти на странцу с urlSearchParams
        loadPage(urlSearchParamsValue, options) {
            const urlSearchParams = new URLSearchParams(urlSearchParamsValue);

            window.history.replaceState({}, '', `${location.pathname}${urlSearchParamsValue}`);

            //попытаться загрузить страницу
            if (!this.tryLoadPage(urlSearchParams, options)) {
                //загрузить страницу 404
                this.tryLoadPage(new URLSearchParams('?404'))
            }
        }

        //загрузить компонент
        loadComponent({ component, id, options }) {
            require([
                component
            ], function (component) {
                'use strict';
                //передать аргументы из urlSearch
                const comp = factory.create(component, { id, options });
                //смотироавть на страницу
                comp.mount(document.body);
            });
        }

    }

    const router = new Router();
    return router;
});